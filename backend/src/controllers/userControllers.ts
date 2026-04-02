import { User } from "../models/userModel";
import { Request, Response } from "express";
import { sendEmail } from "../utils/sendEmail";
import crypto from 'crypto';
import jwt from "jsonwebtoken";
import { CustomRequest } from "../types/customRequest";
// Register User -- User
export const registerUser = async(req: Request, res: Response)=>{
    try {
        const {name, email, password} = req.body;
        const find = await User.findOne({
            email: email
        })
        if(find){
            return res.status(401).json({
                success:false,
                message:"User already registered"
            });
        }
        const user = await User.create({
            name,
            email,
            password
        });
        const token = await user.getJWTToken();
        res.cookie("token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        });
        res.status(201).json({
            success: true,
            message:"Registered Successfully",
            user,
            token,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error,
            status:false,
            message:"Internal Server error"
        })
    }
}
// Login User -- User
export const loginUser = async(req: Request, res: Response)=>{
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                status: false,
                message:"Enter email or password",
            })
        }
        const user = await User.findOne({email:email}).select("+password");
        if(!user){
            return res.status(400).json({
                status: false,
                message:"No user found",
            })
        }
        const isPasswordMatch = await user.comparePassword(password);

        if(!isPasswordMatch){
            return res.status(401).json({
                status:false,
                message:"Invalid credentials",
            })
        }
        const token = await user.getJWTToken();

        // 👇 send token in cookie
        res.cookie("token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        });
        return res.status(200).json({
            status: true,
            message:"Logged in successfully",
            user,
            token,
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message:"Internal server error",
            error
        })
    }
}
// Logout User -- User
export const logoutUser = async(req: Request, res: Response)=>{
    try {
        res.cookie('token', null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        });
        return res.status(200).json({
            success: true,
            message: "Logout successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message:"Internal Server error",
            error
        })
    }
}
// Forgot Password -- User
export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }
    const resetToken = await user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });
    const resetPasswordUrl = `http://localhost:3000/shopfusion/password/reset/${resetToken}`;
    const message = `Your password reset token is:\n\n${resetPasswordUrl}\n\nIf you did not request this, please ignore it.`;
    try {
      await sendEmail({ email: user.email, subject: `E Commerce Password Recovery`, message });
      res.status(200).json({
        success: true,
        message: `Email sent to ${user.email} successfully.`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false }); 
      console.log(error);
      return res.status(500).json({ success: false, message: "Email could not be sent" }); 
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" }); 
  }
};
// Reset Password -- User
export const resetPassword = async function(req: Request, res: Response){
    try {
        const token = req.params.token as string;
        const {password, confirmPassword} = req.body;
        console.log(token);
        const resetPasswordToken = crypto.createHash('sha256').update(token).digest("hex");
        console.log(resetPasswordToken);
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire : {$gt: new Date()},
        })
        console.log(user);
        if(!user){
            return res.status(400).json({
                status:false,
                message:"Reset Password token is invalid or not found",
            })
        }
        if(password !== confirmPassword){
            return res.status(400).json({
                status: false,
                message:"Password and confirm password doesn't match"
            })
        }
        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();
        return res.status(200).json({
            status: true,
            message:"Password updated successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message:"Internal server error",
            error
        })
    }
}
// Get user details -- User
export const getUserDetails = async(req: CustomRequest, res: Response)=>{
    try {
        const user = req.user;
        if(!user){
            return res.status(400).json({
                success:false,
                message:"No user found",
            })
        }
        res.status(200).json({
            success: true,
            user
        })   
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Internal server error",
            error
        })
    }
}
// Update Password --- User
export const updatePassword = async(req:Request, res:Response)=>{
    try {
        const {oldPassword, newPassword} = req.body;
        const token = req.cookies.token as string; 
        const secret = process.env.JWT_SECRET as string;
        const decodedData = jwt.verify(token, secret) as jwt.JwtPayload;
        const user = await User.findById(decodedData.id).select("+password");
        const isPasswordMatch = await user?.comparePassword(oldPassword);
        if(!isPasswordMatch){
            return res.status(400).json({
                success:false,
                message:"Old Password does not match"
            })
        }
        if(!user){
            return res.status(400).json({
                success:false,
                message:"user not found"
            })
        }
        user.password = newPassword;
        await user.save();
        return res.status(200).json({
            success:true,
            message:"Password updated successfully",
            user
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message:"Internal server error",
            error
        })
    }
}
// Update Profile
export const updateProfile = async(req: Request, res: Response)=>{
    try {
        const newUserData = {
            name: req.body.name,
            email: req.body.email
        }
        const token = req.cookies.token as string; 
        const secret = process.env.JWT_SECRET as string;
        const decodedData = jwt.verify(token, secret) as jwt.JwtPayload;
        const user = await User.findByIdAndUpdate(decodedData.id, newUserData);
        res.status(200).json({
            success:true,
            user,
            message:"Profile updated"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal server error",
            error
        })
    }
}
// Get all users --- Admin
export const getAllUser = async(req: Request, res: Response)=>{
    try {
        const users = await User.find();
        return res.status(200).json({
            success:true,
            users
        })        
    } catch (error) {
        res.status(500).json({
            success: false,
            message:"Internal server error",
            error
        })
    }
}
// Get Single User -- Admin
export const getSingleUser = async(req: Request, res: Response)=>{
    try {
        const user = await User.findById(req.params.id);
        if(!user){
            return res.status(400).json({
                success: false,
                message :"No user found",
            })
        }
        return res.status(200).json({
            success:true,
            user,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message:"Internal server error",
            error
        })
    }
}
// Delete User -- Admin
export const deleteUser = async(req: Request, res: Response)=>{
    try {
        const user = User.findById(req.params.id);
        if(!user){
            return res.status(400).json({
            success: false,
            message:"User does not exists.",
            });
        }
        await User.deleteOne();
        return res.status(200).json({
            success: true,
            message:"Deleted user successfully",
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message:"Internal server error",
            error
        })
    }
}

// Update User role -- Admin
export const updateUserRole = async(req: Request, res: Response)=>{
    try {
        const {role} = req.body;
        const user = await User.findById(req.params.id);
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not found",
            });
        }
        const {name, email} = user;
        const newUserRole = {name,email,role};
        await User.findByIdAndDelete(req.params.id, newUserRole);
        return res.status(200).json({
            success:true,
            message:"Role Updated successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message:"Internal server error",
            error
        })
    }
}
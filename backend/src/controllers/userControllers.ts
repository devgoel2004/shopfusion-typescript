import { resolveSoa } from "dns";
import { User } from "../models/userModel";
import { Request, Response } from "express";
// Register User
export const registerUser = async(req: Request, res: Response)=>{
    try {
        const {name, email, password} = req.body;
        console.log(name);
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
// Login User
export const loginUser = async(req: Request, res: Response)=>{
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                status: false,
                message:"Enter email or password",
            })
        }
        const user = await User.findOne({email:email}).select("password");
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
        return res.status(200).json({
            status: true,
            message:"Successfully login",
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message:"Internal server error",
            error
        })
    }
}
// Logout User
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
// Forgot Password
export const forgotPassword = async(req: Request, res: Response)=>{
    try {
        const {email} = req.body;
        const user = await User.findOne({email: email});
        if(!user){
            return res.status(400).json({
                status: false,
                message:"User not found"
            });
        }
        const resetToken =  await user.getResetPasswordToken();
        console.log(resetToken);
        await user.save({ validateBeforeSave: false });
        const resetPasswordUrl = `http://localhost:3000/shopfusion/password/reset/${resetToken}`;
        const message = `Your password reset token is: -\n\n ${resetPasswordUrl} \n\n If you have not requested this email kindly ignore it`;
        
    } catch (error) {
        
    }
}
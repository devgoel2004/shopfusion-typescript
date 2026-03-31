import { User } from "../models/userModel";
import { Request, Response } from "express";
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
        res.status(200).json({
            success: true,
            message:"Registered Successfully",
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        })
    }
}

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
            return res.status(400).json({
                status: false,
                message:"Invalid credentials",
            })
        }
        return res.status(200).json({
            status: true,
            message:"Successfully login",
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message:"Internal server error",
        })
    }
}
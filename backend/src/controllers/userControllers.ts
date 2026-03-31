import {User} from "../models/userModel";
import { Request, Response, NextFunction } from "express";
export const registerUser = async(req: Request,res:Response, next: NextFunction)=>{
    try {
        const {name, email, password} = req.body;
        const find = await User.findOne({email: email});
        if(find){
            return res.status(409).send({
                "message":"User exists",
                }
            );
        }
        const user = await User.create({
            name,
            email,
            password
        })
        const jwt_secret = process.env.JWT_SECRET;
        const expire = process.env.JWT_EXPIRE;
        const token = user.getJWTToken();
        res.status(201).json({
            success: true,
            user,
            token,
        });
    } catch (error) {
        res.status(500).json({
            message:"Something went wrong",
            error
        })
    }
}
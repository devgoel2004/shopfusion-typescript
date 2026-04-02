import { Request } from "express";
import { IUser } from "../models/userModel";
export interface CustomRequest extends Request{
    user?:{
        id: string,
        role: string,
        name: string,
        email: string,
        password: string,
    }
}
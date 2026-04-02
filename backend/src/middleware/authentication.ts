import jwt from 'jsonwebtoken';
import { User } from '../models/userModel';
import { NextFunction, Request, Response } from 'express';
import { CustomRequest } from '../types/customRequest';
export const isAuthenticatedUser = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Please login to access this resource."
            });
        }
        const secret = process.env.JWT_SECRET as string;
        const decodedData = jwt.verify(token, secret) as jwt.JwtPayload;
        const user = await User.findById(decodedData.id).select("+password");
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found."
            });
        }
        req.user = {
            id: user._id.toString(),
            password: user.password,
            name: user.name,
            email: user.email,
            role: user.role,
        }
        next();
    } catch (error) {
        // console.log(error);
        return res.status(500).json({
            success: false,
            message: "Invalid or expired token."
        });
    }
};
// Check if user has required role
export const authorizeRole = (...roles: string[]) => {
    return (req: CustomRequest, res: Response, next: NextFunction): void => {
        if (!req.user) {
            
             res.status(401).json({
                success:false,
                message: "Please login to access this resource."
            });
            return;
        }

        if (!roles.includes(req.user.role)) {
            res.status(403).json({
                success: false,
                message: `Role '${req.user.role}' is not allowed to access this resource.`
            });
            return;
        }
        next();
    };
};


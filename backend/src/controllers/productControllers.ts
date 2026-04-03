import { Product } from "../models/productModel";
import { Request, Response } from "express";
export const getAllProducts = async(req: Request, res:Response)=>{
    try {
        const products = await Product.find();
        console.log(products);
        res.status(200).json({
            success:true,
            products,
        })        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal server error",
            error
        })
    }
}
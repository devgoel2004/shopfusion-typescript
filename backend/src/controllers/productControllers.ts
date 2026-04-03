import { Product } from "../models/productModel";
import { Request, Response } from "express";
import APIFeatures from "../utils/apiFeatures";
export const getAllProducts = async(req: Request, res:Response)=>{
    try {
        const resultPerPage = 8;
        const productCount = await Product.countDocuments();
        let apiFeature = new APIFeatures(Product.find(),req.query).search().filter();
        let product = await apiFeature.query;
        let filterProductCount = product.length;
        apiFeature = new APIFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage);
        product = await apiFeature.query;
        if(!product){
            return res.status(404).json({
                success:false,
                message:"Product not found",
            })
        }
        res.status(200).json({
            success:true,
            product,
            productCount,
            resultPerPage,
            filterProductCount
        })        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal server error",
            error
        })
    }
}
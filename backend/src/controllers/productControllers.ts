import { Product } from "../models/productModel";
import {  Response } from "express";
import APIFeatures from "../utils/apiFeatures";
import { CustomRequest } from "../types/customRequest";
export const getAllProducts = async(req: CustomRequest, res:Response)=>{

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

export const createProduct = async(req:CustomRequest,res:Response)=>{
    try {
        req.body.user = req.user?.id;
        const product = await Product.create(req.body);
        return res.status(200).json({
            success:true,
            message:"Product created successfully",
            product
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal server error",
            error
        })        
    }
}

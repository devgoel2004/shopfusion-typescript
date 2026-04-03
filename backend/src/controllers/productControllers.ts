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
// Update Product
export const updateProduct = async(req:CustomRequest, res:Response)=>{
    try {
        let product = await Product.findById(req.params.id);
        if(!product){
            return res.status(400).json({
                success:false,
                message:"Product not found",
            })
        }   
        product = await Product.findByIdAndUpdate(req.params.id, {$set: req.body}, {
            new: true,
            runValidators: true,
        });
        return res.status(200).json({
            success:true,
            message:"Updated successfully",
            product,
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Internal server error",
            error
        })
    }
}
// Delete Product
export const deleteProduct = async(req: CustomRequest, res: Response)=>{
    try {
        const product = await Product.findById(req.params.id);
        if(!product){
            return res.status(400).json({
                success:false,
                message:"Product not found"
            });
        }
        await Product.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            success:true,
            message:"Product deleted"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message:"Internal server error",
            error            
        })
    }
}
// Get single product and product details
export const getProductDetails = async(req: CustomRequest, res:Response)=>{
    try {
        const product = await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({
                success:false,
                message:"No product found"
            })
        }
        return res.status(200).json({
            success:true,
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

// Review Functionality
export const createProductReview = async(req: CustomRequest, res: Response)=>{
    try {
        const productId = req.params.id;
        const {rating, comment} = req.body;
        const review = {
            user: req.user!.id,
            name: req.user!.name,
            rating: Number(rating),
            comment
        };
        const product = await Product.findById(productId);
        if(!product){
            return res.status(404).json({
                success:false,
                message:"Product not found"
            })
        }
        const isReviewed = product?.reviews.find(
            (rev)=> rev.user.toString()===req.user?.id.toString()
        );
        if(isReviewed){
            product.reviews.forEach((rev)=>{
                if(rev.user.toString()===req.user?.id.toString()){
                    (rev.rating = rating), (rev.comment = comment);
                }
            });
        }else{
            product.reviews.push(review);
            product.numOfReviews = product.reviews.length;
        }
        let avg = 0;
        product.reviews.forEach((rev)=>{
            avg += rev.rating;
        })
        product.ratings = avg/product.reviews.length;
        // product.user = req.user!.id;
        await product.save();
        res.status(200).json({
            success:true,
            product
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })        
    }
}
export const getProductReviews = async(req: CustomRequest, res:Response)=>{
    try {
        const product = await Product.findById(req.params.id);
        if(!product){
            return res.status(400).json({
                success:false,
                message:"No product found"
            })
        }
        return res.status(200).json({
            success:true,
            reviews: product.reviews
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal server error",
            error
        })
    }
}
export const deleteProductReview = async(req: CustomRequest, res: Response)=>{
    try { 
        const product = await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({
                success:false,
                message:"Product not found",
            })
        }
        if(product.reviews.length===0){
            return res.status(404).json({
                success:false,
                message:"No review exists",
            })
        }
        const ids = product.reviews.forEach((rev)=>{
            console.log(rev._id.toString());
        })
        const reviews = product.reviews.filter((rev)=>{
            rev.user.toString()!== req.user?.id;
        })
        let avg = 0;
        reviews.forEach((rev)=>{
            avg += rev.rating;
        })
        let ratings = 0;
        if(reviews.length === 0){
            ratings = 0;
        }else{
            ratings = avg/reviews.length;
        }
        const numOfReviews = reviews.length;
        await Product.findByIdAndUpdate(
            req.params.id,
            {reviews,
                ratings,
                numOfReviews
            }
        )
        res.status(200).json({
            success:true,
            message:"Review deleted successfully",
            product
        })   
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error",
            error
        })
    }
}
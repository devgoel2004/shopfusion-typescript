import { Order } from "../models/orderModel";
import { Product } from "../models/productModel";
import { CustomRequest } from "../types/customRequest";
import { Response } from "express";
import mongoose from "mongoose";
export const newOrder = async(req:CustomRequest, res:Response)=>{
    try {
        const {shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice} = req.body;
        const order = await Order.create({
            shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice, paidAt: Date.now(), user: new mongoose.Types.ObjectId(req.user?.id), 
        })
        return res.status(200).json({
            success:true,
            message:"Order created successfully",
            order
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"Internal server error",
            error
        })
    }
}
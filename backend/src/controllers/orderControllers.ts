import { CustomInspectFunction } from "util";
import { Order } from "../models/orderModel";
import { Product } from "../models/productModel";
import { CustomRequest } from "../types/customRequest";
import { Response, NextFunction } from "express";
import mongoose, { overwriteMiddlewareResult } from "mongoose";
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

export const getSingleOrder = 
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    console.log(req.params.id);
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (!order) {
        return res.status(404).json({
            message:"Order not found with this ID",
            succes:false,
        })
    }

    res.status(200).json({
      success: true,
      order,
    });
  };

// Get logged in User - Order
export const myOrders = async(req: CustomRequest, res: Response, next: NextFunction)=>{
    try {
        const order = await Order.find({
            user: new mongoose.Types.ObjectId(req.user?.id)
        });
        if(order.length===0){
            return res.status(404).json({
                success:false,
                message:"No order found"
            })
        }
        return res.status(200).json({
            success:true,
            order
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal server error",
            error
        })
    }
    // console.log(req.user.id);
    // 
}

export const getAllOrders = async(req: CustomRequest, res:Response, next: NextFunction)=>{
    try {
        const orders = await Order.find();
        let totalAmount = 0;
        orders.forEach((order)=>{
            totalAmount += order.totalPrice;
        })
        res.status(200).json({
            success:true,
            orders,
            totalAmount
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal server error",
            error
        })
    }
}

// Update Order status -- Admin 
async function updateStock(id: string, quantity: number) {
    const product = await Product.findById(id);
    if (!product) throw new Error(`Product not found: ${id}`);
    let stocks = product.stock;
    if (quantity && stocks >= quantity) {
        stocks = stocks - quantity;
    }
    await Product.findByIdAndUpdate(id,{
        stock: stocks
    });
}

export const updateOrder = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found with this id",
            });
        }

        if (order.orderStatus === "Delivered") {
            return res.status(400).json({
                success: false,
                message: "You have already received this order"
            });
        }

        if (req.body.status === "Shipped") {
            for (const item of order.orderItems) {   // ✅ for...of, not forEach
                await updateStock(item.product.toString(), item.quantity);
            }
        }

        order.orderStatus = req.body.status;

        if (req.body.status === "Delivered") {
            order.deliveredAt = new Date(Date.now());
        }

        await order.save();   // ✅ just save the document directly

        res.status(200).json({
            success: true,
            message: "Order updated successfully",
            order
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error
        });
    }
};

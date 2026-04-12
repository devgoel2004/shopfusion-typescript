import crypto from 'crypto';
import Razorpay from 'razorpay';
import { Response } from 'express';
import { CustomRequest } from '../types/customRequest';

export const checkOut = async (req: CustomRequest, res: Response) => {
    try {
        const key_id = process.env.RAZORPAY_KEY_ID;
        const key_secret = process.env.RAZORPAY_KEY_SECRET;
        if (!key_id || !key_secret) {
            return res.status(500).json({ 
                success: false, 
                message: "Razorpay credentials missing" 
            });
        }
        const amount = parseFloat(req.body.amount);
        if (isNaN(amount)) {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid amount" 
            });
        }
        const instance = new Razorpay({ key_id, key_secret });
        const options = {
            amount: Math.round(amount * 100), // convert to paise
            currency: "INR",
            receipt: "order_rcptid_l1",
        };
        const order = await instance.orders.create(options);
        return res.status(200).json({
            success: true,
            order
        });
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            message: "Order creation failed",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
};
import mongoose, { Schema, Types } from "mongoose";
import { Document } from "mongoose";
interface IOrderItems extends Document{
    name: string,
    price: number,
    quantity: number,
    image: string,
    product: Types.ObjectId,
};
interface IShippingInfo extends Document{
    address: string,
    city: string,
    state: string,
    country: string,
    pincode: number,
    phoneno: number,
};
interface IPayment extends Document{
    id: string,
    status: string,
}
interface IOrder extends Document{
    shippingInfo: IShippingInfo,
    orderItems: IOrderItems[],
    user: Types.ObjectId,
    paymentInfo: IPayment,
    paidAt: Date,
    itemPrice: number,
    taxPrice: number,
    shippingPrice: number,
    totalPrice: number,
    orderStatus: string,
    deliveredAt: Date,
    createdAt: Date,
}

const orderSchema = new Schema<IOrder>({
    shippingInfo: {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    pinCode: {
      type: Number,
      required: true,
    },
    phoneNo: {
      type: Number,
      required: true,
    },
  },
  orderItems: [
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  paymentInfo: {
    id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  paidAt: {
    type: Date,
    required: true,
  },
  itemPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  taxPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  orderStatus: {
    type: String,
    required: true,
    default: "Processing",
  },
  deliveredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Order = mongoose.model("Order",orderSchema);
export {Order};
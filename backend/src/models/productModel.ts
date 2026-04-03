import { Document, Types} from "mongoose";
import mongoose from "mongoose";
// import Array from 
interface Image extends Document{
    publicId: string,
    url: string,
};
export interface Review{
  _id?:Types.ObjectId,
    user: Types.ObjectId,
    name: string,
    rating: number,
    comment: string,

};
export interface IProduct extends Document{
    name: string,
    description: string,
    price: number,
    ratings: number,
    images: Image[],
    category: string,
    Stock: number,
    numOfReviews: number,
    reviews: Types.DocumentArray<Review & Document>;  // 👈 DocumentArray for subdocuments
    user: Types.ObjectId,
    createdAt: Date
};
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Product Name"],
  },
  description: {
    type: String,
    required: [true, "Please enter decription of product"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter product Price"],
    maxLength: [8, "Price cannot excceed  8 characters"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      publicId: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please Enter Product Category"],
  },
  stock: {
    type: Number,
    required: [true, "Stock cannot excced 4 characters"],
    default: 1,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
const Product = mongoose.model<IProduct>("Product", productSchema);
export {Product};
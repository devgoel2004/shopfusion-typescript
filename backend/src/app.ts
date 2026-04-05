import express from 'express';
import type{Application, Response, Request} from "express";
import {config} from "dotenv";
import { connect_db } from './config/db';
import userRoute from './routes/userRoute';
import productRoute from './routes/productRoute';
import orderRoute from './routes/orderRoute';
import cookieParser from "cookie-parser";
config();

const url = process.env.DB_URL;
if(url){
    connect_db(url);
}
const app: Application = express();
app.use(express.json());
app.use(cookieParser());
app.get('/',(req:Request, res: Response)=>{
    res.send('Hello world');
})
app.use('/api/v1', userRoute);
app.use('/api/v1',productRoute);
app.use('/api/v1',orderRoute);
// app.get('/products',(req:Request, res: Response)=>{
//     res.send("Product");
// })
export {app};
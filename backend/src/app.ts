import express from 'express';
import type{Application, Response, Request} from "express";
import {config} from "dotenv";
import { connect_db } from './config/db';
config();
const url = process.env.DB_URL;
if(url){
    connect_db(url);
}
const app: Application = express();
app.use(express.json());
app.get('/', (req: Request, res: Response)=>{
    res.send("Hello world")
})

app.get('/products',(req:Request, res: Response)=>{
    res.send("Product")
})
export {app};
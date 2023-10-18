import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import router from "./router";

require('dotenv').config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api', router)

const start = async () => {
    try { 
        if (process.env.DB) {
           await mongoose.connect(process.env.DB); 
        } 
        app.listen(PORT, () => console.log(`listening on port ${PORT}`))
    } catch (error) {
        console.error(error);
    }
}

start();
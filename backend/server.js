import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "../backend/routes/authRoutes.js";
import productRoutes from "../backend/routes/productRoutes.js";
import cartRoutes from "../backend/routes/cartRoute.js";
import addressRoute from "../backend/routes/addressRoute.js"
import orderRoute from "../backend/routes/orderRoute.js"

const app = express();
app.use(cors());

app.use(express.json());
dotenv.config();
connectDB();

app.use('/api/auth',authRoutes);
app.use('/api/products',productRoutes);
app.use('/api/cart',cartRoutes);
app.use('/api/address',addressRoute);
app.use('/api/order', orderRoute);

app.listen(process.env.PORT || 5173,()=>{
    console.log(`Server is running on port ${process.env.PORT || 5173 }`)
});

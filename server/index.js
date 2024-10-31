import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js"
dotenv.config();

const app = express(); 
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000",
	credentials: true,
}))
app.use("/api/v1/auth",authRoutes); 

app.listen(PORT,()=>{ 
    console.log(`Server running on port ${PORT}`);
    connectDB(); 
})
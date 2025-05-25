import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
import organizationRoutes from "./routes/organizationRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();

connectDB();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/", authRoutes);
app.use("/api/create-organization", organizationRoutes);
app.use("/api/user", userRoutes);

export default app;
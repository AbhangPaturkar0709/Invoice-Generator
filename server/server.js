import express, { json } from "express";
import { config } from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import billRoutes from "./routes/billRoutes.js";

config();
connectDB();

const app = express();
app.use(json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/bills", billRoutes);

// Example Protected Route
import {authMiddleware} from "./middleware/authMiddleware.js";
app.get("/api/profile", authMiddleware, (req, res) => {
  res.json({ msg: "Welcome to your profile", user: req.
    user });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);

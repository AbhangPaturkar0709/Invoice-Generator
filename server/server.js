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

const allowedOrigins = [
  "http://localhost:5173",
  "https://invoice-generator-8lfq.onrender.com"
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (e.g. mobile apps, curl, Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/bills", billRoutes);

// Example Protected Route
import { authMiddleware } from "./middleware/authMiddleware.js";
app.get("/api/profile", authMiddleware, (req, res) => {
  res.json({ msg: "Welcome to your profile", user: req.user });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);

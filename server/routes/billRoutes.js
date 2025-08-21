import express from "express";
import { generateBill } from "../controllers/billController.js";
import { authMiddleware } from '../middleware/authMiddleware.js'

const router = express.Router();

// POST /api/bills/generate

router.post("/generate", authMiddleware, generateBill);

export default router;

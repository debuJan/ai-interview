import express from "express";
import {
  getQuestions,
  addQuestion,
  getQuestionsByUser, // 👈 include this import
} from "../controllers/questionController.js";

const router = express.Router();

// GET /api/questions?category=hr
router.get("/", getQuestions);

// POST /api/questions
router.post("/", addQuestion);

// ✅ NEW: GET /api/questions/user/:userId?roundType=HR
router.get("/user/:userId", getQuestionsByUser);

export default router;

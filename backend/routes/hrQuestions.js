// routes/hrQuestions.js
import express from "express";
import HRQuestion from "../models/HRQuestion.js";  // ✅ use the model

const router = express.Router();

// ✅ Get all HR questions from MongoDB
router.get("/", async (req, res) => {
  try {
    const questions = await HRQuestion.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching HR questions", error });
  }
});

export default router;

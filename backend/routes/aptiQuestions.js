import express from "express";
import Aptitude from "../models/Aptitude.js";  // ✅ Import DB model

const router = express.Router();

// ✅ Route: GET all aptitude questions from DB
router.get("/", async (req, res) => {
  try {
    const questions = await Aptitude.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch aptitude questions" });
  }
});
// ✅ Route: POST submit aptitude answer
router.post("/submit", async (req, res) => {
  try {
    const { questionId, answer } = req.body;
    console.log("Received answer:", questionId, answer);

    // DB me save karo
    const newAnswer = await Aptitude.create({ questionId, answer });

    res.status(200).json({ message: "Answer saved successfully!", data: newAnswer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save answer" });
  }
});


export default router;

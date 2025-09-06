import Question from "../models/questionModel.js";

// Add a new question
export const addQuestion = async (req, res) => {
  try {
    const { category, roundType, questionText, expectedAnswer, userId } = req.body;
    console.log("📥 Received:", req.body);

    if (!category || !questionText || !userId) {
      return res.status(400).json({ message: "Category, questionText, and userId are required" });
    }

    const newQuestion = new Question({
      category,
      roundType,
      questionText,
      expectedAnswer,
      userId
    });

    await newQuestion.save();

    res.status(201).json({ success: true, data: newQuestion });
  } catch (error) {
    console.error("❌ Error in addQuestion:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get all questions (optional filter by category or roundType)
export const getQuestions = async (req, res) => {
  try {
    const { category, roundType } = req.query;

    const query = {};
    if (category) query.category = category;
    if (roundType) query.roundType = roundType;

    const questions = await Question.find(query).sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: questions });
  } catch (error) {
    console.error("❌ Error in getQuestions:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get questions by userId (optional filter by roundType)
export const getQuestionsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { roundType } = req.query;

    const query = { userId };
    if (roundType) {
      query.roundType = roundType;
    }

    const questions = await Question.find(query).sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: questions });
  } catch (error) {
    console.error("❌ Error in getQuestionsByUser:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch questions", error: error.message });
  }
};

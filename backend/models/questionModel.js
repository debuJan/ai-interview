import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["HR", "Technical", "Behavioral", "General"],
    default: "General",
  },
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    default: "Medium",
  },
  options: {
    type: [String], // Optional, for MCQ-type questions
    default: [],
  },
  answer: {
    type: String, // Optional for subjective/HR questions
  },
  tags: {
    type: [String],
    default: [],
  },
}, { timestamps: true });

const Question = mongoose.model("Question", questionSchema);
export default Question;

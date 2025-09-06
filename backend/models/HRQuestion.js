// models/HRQuestion.js
import mongoose from "mongoose";

const HRQuestionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  tips: [{ type: String }],
  sampleAnswer: { type: String },
});

const HRQuestion = mongoose.model("HRQuestion", HRQuestionSchema);

export default HRQuestion;

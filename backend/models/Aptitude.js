// backend/models/Aptitude.js
import mongoose from "mongoose";

const AptitudeSchema = new mongoose.Schema({
  question: String,
  options: [String],
  answer: String
});

export default mongoose.model("Aptitude", AptitudeSchema);

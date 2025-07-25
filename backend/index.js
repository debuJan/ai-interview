// Load environment variables
import dotenv from "dotenv";
dotenv.config();

// Import required packages
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { createClient } from "@supabase/supabase-js";

// ✅ Initialize Express app
const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ Connect to Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// ✅ Health check route
app.get("/", (req, res) => {
  res.send("✅ Backend is working!");
});

// ✅ Save answer route
app.post("/save-answer", async (req, res) => {
  const { question, answer } = req.body;

  try {
    const { data, error } = await supabase
      .from("interview_answers")
      .insert([{ question, answer }])
      .select();

    if (error) {
      console.error("❌ Supabase Insert Error:", error.message);
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ message: "Answer saved successfully", data });
  } catch (err) {
    res.status(500).json({ error: "Unexpected server error" });
  }
});

// ✅ NEW: Get all answers
app.get("/answers", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("interview_answers")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ message: "Answers fetched successfully", data });
  } catch (err) {
    res.status(500).json({ error: "Unexpected server error" });
  }
});

// ✅ Start the server
app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});
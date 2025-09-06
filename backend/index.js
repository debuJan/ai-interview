import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// routes
import authRoutes from "./routes/auth.js";
import questionRoutes from "./routes/question.js";
import aptiQuestionsRouter from "./routes/aptiQuestions.js";
import hrQuestionsRouter from "./routes/hrQuestions.js";
import interviewTipsRouter from "./routes/interviewTips.js";
import lldQuestionsRouter from "./routes/lldQuestions.js";
import oaQuestionsRouter from "./routes/oaQuestions.js";

dotenv.config();
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// routes
app.use("/api/auth", authRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/hr", hrQuestionsRouter);
app.use("/api/aptitude", aptiQuestionsRouter);
app.use("/api/interviewtips", interviewTipsRouter);
app.use("/api/lld", lldQuestionsRouter);
app.use("/api/oa", oaQuestionsRouter);

// health check
app.get("/", (req, res) => {
  res.send("✅ Backend working with MongoDB, Auth, and Question routes!");
});

// global error handler
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// connect DB + start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(`🚀 Server running at http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
  });

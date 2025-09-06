// routes/interviewTips.js
import express from "express";

const router = express.Router();

const interviewTips = [
  {
    id: 1,
    category: "Before the Interview",
    tips: [
      "Research the company, mission, and culture.",
      "Understand the job description and required skills.",
      "Practice common interview questions in HR, LLD, and DSA.",
      "Keep resume and portfolio projects ready."
    ]
  },
  {
    id: 2,
    category: "HR Round Tips",
    tips: [
      "Use the STAR method to answer behavioral questions.",
      "Show personality, motivation, and honesty.",
      "Be ready to talk about strengths, weaknesses, and goals."
    ]
  },
  {
    id: 3,
    category: "Technical Round Tips",
    tips: [
      "Explain your thought process while solving problems.",
      "Know your projects and architecture in detail.",
      "Practice LLD questions like designing Chat App, Parking Lot.",
      "Cover system design basics if applying for SDE-1 or above."
    ]
  },
  {
    id: 4,
    category: "On the Interview Day",
    tips: [
      "Arrive at least 10–15 minutes early.",
      "Carry extra copies of your resume and any required documents.",
      "Keep your phone on silent mode.",
      "Maintain good body language (eye contact, posture, handshake)."
    ]
  },
  {
    id: 5,
    category: "Final Tips",
    tips: [
      "Stay calm and confident even if you don’t know something.",
      "Always ask for clarification if the question is unclear.",
      "Prepare a few good questions to ask the interviewer.",
      "Send a thank-you email within 24 hours."
    ]
  }
];

// ✅ API endpoint
router.get("/", (req, res) => {
  res.json(interviewTips);
});

export default router;

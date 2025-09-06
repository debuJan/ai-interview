// seedHRQuestions.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import HRQuestion from "./models/HRQuestion.js";

dotenv.config(); // so it loads MONGO_URI from .env

const hrQuestions = [
  {
    title: "Tell me about yourself",
    tips: [
      "Don’t ask the interviewer what they want to know.",
      "Don’t repeat what’s already on your resume.",
      "Introduce yourself using adjectives like problem-solving, innovative, tech-savvy.",
      "Highlight career achievements relevant to the role.",
      "Explain why you want this role and why it’s a good fit for you."
    ],
    sampleAnswer: `I am an energetic person, an effective communicator, and a quick learner...`
  },
  {
    title: "Why do you want to work for our company?",
    tips: [
      "Show that you understand the job requirements.",
      "Highlight how your skills align with the company’s goals.",
      "Express excitement about joining the company culture or projects."
    ],
    sampleAnswer: null
  },
  {
    title: "What are your greatest strengths and weaknesses?",
    tips: [
      "Be honest and highlight strengths relevant to the job.",
      "Back up your strengths with examples.",
      "Choose weaknesses that don’t affect your job candidacy.",
      "Never use clichés like 'I’m a perfectionist'."
    ],
    sampleAnswer: `I think one of my greatest strengths is that I am a great team player...`
  },
  {
    title: "Why are you looking for a change?",
    sampleAnswer: `The reason I am looking for change is that I feel like now is the time to expand my horizon...`
  },
  {
    title: "Tell me about the gap in your resume.",
    sampleAnswer: `After the completion of my bachelor's degree, I started working continuously for 8 years without taking any break...`
  },
  {
    title: "What is your biggest achievement so far?",
    sampleAnswer: `I have achieved several milestones to date in my career as a software developer. The most recent one is...`
  },
  {
    title: "Where do you see yourself in 5 years?",
    sampleAnswer: `Over 5 years, I would love to utilize all the opportunities that this company provides...`
  },
  {
    title: "Why should we hire you?",
    sampleAnswer: `I am a self-motivated and open-minded person who can learn quickly. My experience in web development...`
  },
  {
    title: "How do you deal with criticism?",
    sampleAnswer: `I am always enthusiastic about learning new things, and during the process, I might tend to make mistakes. I am open to constructive feedback...`
  }
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    await HRQuestion.deleteMany(); // clear old data
    await HRQuestion.insertMany(hrQuestions);

    console.log("✅ HR Questions inserted successfully!");
    process.exit(); // exit after done
  } catch (error) {
    console.error("❌ Error inserting HR Questions:", error);
    process.exit(1);
  }
};

seedData();

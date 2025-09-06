import mongoose from "mongoose";
import dotenv from "dotenv";
import Aptitude from "./models/Aptitude.js";

dotenv.config();

const aptitudeQuestions = [
  {
    question: "What is 15% of 200?",
    options: ["25", "30", "35", "40"],
    answer: "30"
  },
  {
    question: "A train 150 meters long is running at 45 km/h. How much time will it take to cross a pole?",
    options: ["10s", "12s", "15s", "18s"],
    answer: "12s"
  },
  {
    question: "Find the next number in the series: 2, 6, 12, 20, 30, ?",
    options: ["36", "38", "40", "42"],
    answer: "42"
  }, // ✅ Added missing comma
  {
    title: "4. Two persons can do a piece of work in 12 and 8 days. How long will they take together?",
    question: "Work done in one day = 1/12 + 1/8 = 5/24",
    explanation: "Time = 24/5 = 4.8 days",
    answer: "4.8 days"
  },
  {
    title: "5. What is the value of √81 + √16 - √25?",
    question: "Calculate square roots individually",
    explanation: "√81 = 9, √16 = 4, √25 = 5 ⇒ 9 + 4 - 5 = 8",
    answer: "8"
  },
  {
    title: "6. A number when divided by 5 leaves remainder 2, by 7 remainder 3. What’s the number?",
    question: "Find number satisfying: x % 5 = 2 and x % 7 = 3",
    explanation: "Try numbers ⇒ 17 works.",
    answer: "17"
  },
  {
    title: "7. Find the average of: 5, 10, 15, 20, 25",
    question: "Average formula = Sum ÷ Count",
    explanation: "(5+10+15+20+25) / 5 = 75 / 5",
    answer: "15"
  },
  {
    title: "8. A shopkeeper sells a product for ₹120 with a profit of 20%. What is the cost price?",
    question: "Cost Price = SP × 100 / (100 + Profit%)",
    explanation: "Cost Price = 120 × 100 / 120 = 100",
    answer: "100"
  },
  {
    title: "9. A car travels at 60 km/h for 2 hours and 80 km/h for 1 hour. What is the average speed?",
    question: "Total Distance = (60×2 + 80×1) = 200 km",
    explanation: "Average speed = Total Distance / Total Time = 200 / 3",
    answer: "66.67 km/h"
  },
  {
    title: "10. What is the compound interest on ₹5000 at 10% p.a. for 2 years?",
    question: "CI formula = P[(1 + R/100)^T - 1]",
    explanation: "CI = 5000[(1+0.1)² - 1] = 5000(1.21 - 1) = 1050",
    answer: "₹1050"
  }
];

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("MongoDB connected!");

    await Aptitude.deleteMany(); // Clear old data
    await Aptitude.insertMany(aptitudeQuestions);

    console.log("✅ Aptitude questions seeded!");
    process.exit();
  })
  .catch(err => console.error(err));

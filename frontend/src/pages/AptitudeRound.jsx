import React, { useState } from "react";
import "../styles/aptituderound.css";
import VoiceInput from "./VoiceInput";

const aptitudeQuestions = [
  {
    title: "1. What is 15% of 200?",
    content: (
      <>
        <p>What is 15 percent of 200?</p>
        <h4>Explanation:</h4>
        <p>15% = 15/100. ⇒ (15/100) × 200 = 30</p>
        <h4>Answer:</h4>
        <p><b>30</b></p>
      </>
    ),
  },
  {
    title: "2. A train 150 meters long is running at 45 km/h. How much time will it take to cross a pole?",
    content: (
      <>
        <p>Speed = 45 km/h ⇒ (45 × 1000) / 3600 = 12.5 m/s</p>
        <h4>Explanation:</h4>
        <p>Time = Distance / Speed = 150 / 12.5 = 12 seconds</p>
        <h4>Answer:</h4>
        <p><b>12 seconds</b></p>
      </>
    ),
  },
  {
    title: "3. Find the next number in the series: 2, 6, 12, 20, 30, ?",
    content: (
      <>
        <p>Number series following n² + n pattern.</p>
        <h4>Explanation:</h4>
        <p>1²+1=2, 2²+2=6, 3²+3=12... next is 6²+6 = 42</p>
        <h4>Answer:</h4>
        <p><b>42</b></p>
      </>
    ),
  },
  {
    title: "4. What is the value of √81 + √16 - √25?",
    content: (
      <>
        <p>Calculate square roots individually:</p>
        <h4>Explanation:</h4>
        <p>√81 = 9, √16 = 4, √25 = 5 ⇒ 9 + 4 - 5 = 8</p>
        <h4>Answer:</h4>
        <p><b>8</b></p>
      </>
    ),
  },
  {
    title: "5. Two persons can do a piece of work in 12 and 8 days. How long will they take together?",
    content: (
      <>
        <p>Work done in one day = 1/12 + 1/8 = (2+3)/24 = 5/24</p>
        <h4>Explanation:</h4>
        <p>Time = 24/5 = 4.8 days</p>
        <h4>Answer:</h4>
        <p><b>4.8 days</b></p>
      </>
    ),
  },
  {
    title: "6. A number when divided by 5 leaves remainder 2, by 7 remainder 3. What’s the number?",
    content: (
      <>
        <p>Find number satisfying: x % 5 = 2 and x % 7 = 3</p>
        <h4>Explanation:</h4>
        <p>Try numbers ⇒ 17 works.</p>
        <h4>Answer:</h4>
        <p><b>17</b></p>
      </>
    ),
  },
  {
    title: "7. Find the average of: 5, 10, 15, 20, 25",
    content: (
      <>
        <p>Average = Sum / Count = (5+10+15+20+25) / 5</p>
        <h4>Answer:</h4>
        <p><b>15</b></p>
      </>
    ),
  },
  {
    title: "8. A shopkeeper sells a product for ₹120 with a profit of 20%. What is the cost price?",
    content: (
      <>
        <p>Cost Price = SP × 100 / (100 + Profit%)</p>
        <h4>Explanation:</h4>
        <p>Cost Price = 120 × 100 / 120 = ₹100</p>
        <h4>Answer:</h4>
        <p><b>₹100</b></p>
      </>
    ),
  },
  {
    title: "9. A car travels at 60 km/h for 2 hours and 80 km/h for 1 hour. What is the average speed?",
    content: (
      <>
        <p>Total Distance = (60×2 + 80×1) = 200 km</p>
        <h4>Explanation:</h4>
        <p>Average speed = Total Distance / Total Time = 200 / 3 = 66.67 km/h</p>
        <h4>Answer:</h4>
        <p><b>66.67 km/h</b></p>
      </>
    ),
  },
  {
    title: "10. What is the compound interest on ₹5000 at 10% p.a. for 2 years?",
    content: (
      <>
        <p>CI = P[(1 + R/100)^T - 1]</p>
        <h4>Explanation:</h4>
        <p>CI = 5000[(1+0.1)² - 1] = 5000(1.21 - 1) = 5000×0.21 = ₹1050</p>
        <h4>Answer:</h4>
        <p><b>₹1050</b></p>
      </>
    ),
  },
];


 export default function AptitudeRound() {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [currentMockQuestion, setCurrentMockQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [answerInput, setAnswerInput] = useState("");

  const startMockInterview = () => {
    setInterviewStarted(true);
    setCurrentMockQuestion(0);
    setAnswers({});
    setAnswerInput("");
  };

  const handleNext = () => {
    setAnswers((prev) => ({
      ...prev,
      [aptitudeQuestions[currentMockQuestion].title]: answerInput, // ✅ FIXED here
    }));
    setAnswerInput("");

    if (currentMockQuestion + 1 < aptitudeQuestions.length) {
      setCurrentMockQuestion((prev) => prev + 1);
    } else {
      alert("✅ Mock interview completed!\nCheck your answers in console.");
      console.log("Your Answers:", answers);
      setInterviewStarted(false);
    }
  };

  return (
    <div className="hrround-layout">
      <aside className="sidebar">
        <h2>Aptitude Questions</h2>
        <ul>
          {aptitudeQuestions.map((q, index) => (
            <li
              key={index}
              className={selectedQuestion === index ? "active" : ""}
              onClick={() => {
                setSelectedQuestion(index);
                setInterviewStarted(false);
              }}
            >
              {q.title}
            </li>
          ))}
        </ul>
        <button className="start-btn" onClick={startMockInterview}>
          🎤 Start Live Mock Interview
        </button>
      </aside>

      <main className="main-content">
        {!interviewStarted ? (
          selectedQuestion !== null ? (
            <div className="question-display">
              <h2>{aptitudeQuestions[selectedQuestion].title}</h2>
              <div className="question-content">{aptitudeQuestions[selectedQuestion].content}</div>
            </div>
          ) : (
            <p className="placeholder">Select a question to view its details.</p>
          )
        ) : (
          <div className="mock-interview">
            <h2>{aptitudeQuestions[currentMockQuestion].title}</h2>
            <div className="question">{aptitudeQuestions[currentMockQuestion].content}</div>

            <VoiceInput setText={setAnswerInput} />

            <textarea
              rows={4}
              value={answerInput}
              onChange={(e) => setAnswerInput(e.target.value)}
              placeholder="Type or speak your answer here..."
            />

            <button className="next-btn" onClick={handleNext}>
              {currentMockQuestion + 1 === aptitudeQuestions.length ? "Finish" : "Next"}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
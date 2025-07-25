import React, { useState } from "react";
import "../styles/hrround.css";

const mockQuestions = [
  "Tell me about yourself.",
  "Why do you want to work at our company?",
  "What are your greatest strengths?",
  "What are your weaknesses?",
  "Where do you see yourself in 5 years?",
  "Describe a challenging situation you faced and how you handled it.",
  "Why should we hire you?",
  "How do you handle criticism?",
  "What motivates you in your work?",
  "Do you prefer working in a team or individually, and why?",
];

const LiveMockHR = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(mockQuestions.length).fill(""));
  const [showSummary, setShowSummary] = useState(false);

  const handleAnswerChange = (e) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = e.target.value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowSummary(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers(Array(mockQuestions.length).fill(""));
    setShowSummary(false);
  };

  return (
    <div className="mock-hr-container">
      <h2 className="mock-hr-heading">🎙️ Live Mock HR Interview</h2>

      {showSummary ? (
        <div className="summary-section">
          <h3>Your Responses:</h3>
          <ul>
            {mockQuestions.map((q, i) => (
              <li key={i}>
                <strong>{q}</strong>
                <p>{answers[i] || "No Answer"}</p>
              </li>
            ))}
          </ul>
          <button onClick={handleRestart} className="btn-restart">Restart Interview</button>
        </div>
      ) : (
        <>
          <div className="question-box">
            <h3>Question {currentQuestion + 1} of {mockQuestions.length}:</h3>
            <p>{mockQuestions[currentQuestion]}</p>
          </div>

          <textarea
            value={answers[currentQuestion]}
            onChange={handleAnswerChange}
            className="answer-input"
            placeholder="Type your answer here..."
            rows={4}
          />

          <button onClick={handleNext} className="btn-next">
            {currentQuestion === mockQuestions.length - 1 ? "Finish" : "Next Question"}
          </button>
        </>
      )}
    </div>
  );
};

export default LiveMockHR;


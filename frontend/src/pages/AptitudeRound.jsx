import React, { useState, useEffect } from "react";
import "../styles/aptituderound.css";
import VoiceInput from "./VoiceInput";
import axios from "axios"; // ✅ Import axios

export default function AptitudeRound() {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [currentMockQuestion, setCurrentMockQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [answerInput, setAnswerInput] = useState("");

  // ✅ Fetch questions from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/aptitude")
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.error("Error fetching questions:", err));
  }, []);

  const startMockInterview = () => {
    setInterviewStarted(true);
    setCurrentMockQuestion(0);
    setAnswers({});
    setAnswerInput("");
  };

  // ✅ Updated handleNext with POST to backend
  const handleNext = async () => {
    if (!questions[currentMockQuestion]) return;

    const currentQuestion = questions[currentMockQuestion];
    const updatedAnswers = {
      ...answers,
      [currentQuestion.question]: answerInput,
    };

    setAnswers(updatedAnswers);
    setAnswerInput("");

    try {
      // ✅ Send current answer to backend
      await axios.post("http://localhost:5000/api/aptitude/submit", {
        question: currentQuestion.question,
        answer: answerInput,
      });
      console.log("Answer saved to backend!");
    } catch (err) {
      console.error("Error saving answer:", err);
    }

    if (currentMockQuestion + 1 < questions.length) {
      setCurrentMockQuestion((prev) => prev + 1);
    } else {
      alert("✅ Mock interview completed!");
      console.log("Your Answers:", updatedAnswers);
      setInterviewStarted(false);
    }
  };

  return (
    <div className="hrround-layout">
      <aside className="sidebar">
        <h2>Aptitude Questions</h2>
        <ul>
          {questions.map((q, index) => (
            <li
              key={q._id}
              className={selectedQuestion === index ? "active" : ""}
              onClick={() => {
                setSelectedQuestion(index);
                setInterviewStarted(false);
              }}
            >
              {q.question.length > 30 ? q.question.slice(0, 30) + "..." : q.question}
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
              <h2>Question {selectedQuestion + 1}</h2>
              <p>{questions[selectedQuestion].question}</p>

              {questions[selectedQuestion].options.length > 0 && (
                <>
                  <h4>Options:</h4>
                  <ul>
                    {questions[selectedQuestion].options.map((opt, i) => (
                      <li key={i}>{opt}</li>
                    ))}
                  </ul>
                </>
              )}

              <h4>Answer:</h4>
              <p><b>{questions[selectedQuestion].answer}</b></p>
            </div>
          ) : (
            <p className="placeholder">Select a question to view its details.</p>
          )
        ) : (
          <div className="mock-interview">
            <h2>Question {currentMockQuestion + 1}</h2>
            <p>{questions[currentMockQuestion].question}</p>

            {questions[currentMockQuestion].options.length > 0 && (
              <ul>
                {questions[currentMockQuestion].options.map((opt, i) => (
                  <li key={i}>{opt}</li>
                ))}
              </ul>
            )}

            <VoiceInput setText={setAnswerInput} />

            <textarea
              rows={4}
              value={answerInput}
              onChange={(e) => setAnswerInput(e.target.value)}
              placeholder="Type or speak your answer here..."
            />

            <button className="next-btn" onClick={handleNext}>
              {currentMockQuestion + 1 === questions.length ? "Finish" : "Next"}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

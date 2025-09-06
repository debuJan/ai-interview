import React, { useState, useEffect } from "react";
import "../styles/hrround.css";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

export default function HRRound() {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [currentMockQuestion, setCurrentMockQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    fetch("http://localhost:5000/api/hr")
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.error("❌ Error fetching HR questions:", err));
  }, []);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <p>❌ Browser does not support Speech Recognition.</p>;
  }

  const speakQuestion = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.cancel(); // prevent overlap
    speechSynthesis.speak(utterance);
  };

  const startMockInterview = () => {
    setInterviewStarted(true);
    setCurrentMockQuestion(0);
    setAnswers({});
    resetTranscript();
    if (questions.length > 0) {
      speakQuestion(questions[0].title);
    }
  };

  const saveAnswerToBackend = async (question, answer) => {
    try {
      const res = await fetch("http://localhost:5000/api/hr/save-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, answer }),
      });
      const result = await res.json();
      console.log("📤 Saved to backend:", result);
    } catch (err) {
      console.error("❌ Error saving to backend:", err);
    }
  };

  const handleNext = () => {
    const currentTitle = questions[currentMockQuestion].title;

    if (transcript.trim()) {
      saveAnswerToBackend(currentTitle, transcript);
      setAnswers((prev) => ({ ...prev, [currentTitle]: transcript }));
    }
    resetTranscript();

    if (currentMockQuestion + 1 < questions.length) {
      const next = currentMockQuestion + 1;
      setCurrentMockQuestion(next);
      speakQuestion(questions[next].title);
    } else {
      alert("✅ Mock Interview Completed!");
      console.log("All Answers:", answers);
      setAnswers({});
      setInterviewStarted(false);
    }
  };

  return (
    <div className="hrround-layout">
      <aside className="sidebar">
        <h2>HR Questions</h2>
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
              <h2>{questions[selectedQuestion].title}</h2>
              {questions[selectedQuestion].tips?.length > 0 && (
                <ul>
                  {questions[selectedQuestion].tips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              )}
              {questions[selectedQuestion].sampleAnswer && (
                <blockquote>{questions[selectedQuestion].sampleAnswer}</blockquote>
              )}
            </div>
          ) : (
            <p className="placeholder">Select a question to view its details.</p>
          )
        ) : (
          <div className="mock-interview">
            <h2>{questions[currentMockQuestion]?.title}</h2>

            <p>🎙 Listening: {listening ? "ON" : "OFF"}</p>
            <div className="mic-controls">
              <button onClick={SpeechRecognition.startListening}>🎙 Start Speaking</button>
              <button onClick={SpeechRecognition.stopListening}>⏹ Stop</button>
              <button onClick={resetTranscript}>🔁 Reset</button>
            </div>

            <textarea rows={4} value={transcript} readOnly />

            <button className="next-btn" onClick={handleNext}>
              {currentMockQuestion + 1 === questions.length ? "Finish" : "Next"}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

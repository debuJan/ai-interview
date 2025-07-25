import React, { useState } from "react";
import "../styles/technicalround.css";
import VoiceInput from "./VoiceInput";

const technicalQuestions = [
  {
    title: "1. What is the difference between var, let, and const in JavaScript?",
    content: (
      <>
        <h4>Answer:</h4>
        <ul>
          <li><b>var:</b> Function scoped, can be redeclared and updated.</li>
          <li><b>let:</b> Block scoped, can be updated but not redeclared.</li>
          <li><b>const:</b> Block scoped, cannot be updated or redeclared.</li>
        </ul>
      </>
    ),
  },
  {
    title: "2. Explain REST API.",
    content: (
      <>
        <p>REST (Representational State Transfer) is an architectural style for designing networked applications. It uses HTTP requests to perform CRUD operations (Create, Read, Update, Delete).</p>
      </>
    ),
  },
  {
    title: "3. Difference between SQL and NoSQL databases?",
    content: (
      <>
        <ul>
          <li><b>SQL:</b> Structured, table-based, relational databases (e.g., MySQL, PostgreSQL).</li>
          <li><b>NoSQL:</b> Unstructured or semi-structured, document/key-value/graph-based (e.g., MongoDB, Firebase).</li>
        </ul>
      </>
    ),
  },
  {
    title: "4. What is React Virtual DOM?",
    content: (
      <>
        <p>Virtual DOM is a lightweight representation of the real DOM. React compares the Virtual DOM with the actual DOM (diffing) and updates only the changed parts (reconciliation), improving performance.</p>
      </>
    ),
  },
  {
    title: "5. Explain promises and async/await in JavaScript.",
    content: (
      <>
        <ul>
          <li><b>Promise:</b> Represents a value which may be available now, or in the future, or never.</li>
          <li><b>async/await:</b> Syntax to handle asynchronous code in a synchronous-like way, built on top of promises.</li>
        </ul>
      </>
    ),
  },
  {
    title: "6. What is closure in JavaScript?",
    content: (
      <>
        <p>A closure is a function that has access to its own scope, the outer function’s scope, and the global scope.</p>
      </>
    ),
  },
  {
    title: "7. Difference between HTTP and HTTPS?",
    content: (
      <>
        <ul>
          <li><b>HTTP:</b> HyperText Transfer Protocol (not secure).</li>
          <li><b>HTTPS:</b> Secure HTTP using SSL/TLS encryption for secure communication.</li>
        </ul>
      </>
    ),
  },
  {
    title: "8. What are hooks in React?",
    content: (
      <>
        <p>Hooks are functions that let you use React features like state and lifecycle without writing a class. Example: <code>useState()</code>, <code>useEffect()</code>.</p>
      </>
    ),
  },
  {
    title: "9. What is CORS?",
    content: (
      <>
        <p>CORS (Cross-Origin Resource Sharing) is a mechanism that allows restricted resources on a web page to be requested from another domain outside the domain from which the resource originated.</p>
      </>
    ),
  },
  {
    title: "10. Explain Big O notation.",
    content: (
      <>
        <p>Big O notation describes the performance or complexity of an algorithm. It tells how the runtime or space requirements grow relative to input size (e.g., O(1), O(n), O(n²)).</p>
      </>
    ),
  },
];

export default function TechnicalRound() {
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
      [technicalQuestions[currentMockQuestion].title]: answerInput,
    }));
    setAnswerInput("");

    if (currentMockQuestion + 1 < technicalQuestions.length) {
      setCurrentMockQuestion((prev) => prev + 1);
    } else {
      alert("✅ Mock interview completed!\nCheck your answers in console.");
      console.log("Your Answers:", answers);
      setInterviewStarted(false);
    }
  };

  return (
    <div className="technical-layout">
      <aside className="sidebar">
        <h2>Technical Questions</h2>
        <ul>
          {technicalQuestions.map((q, index) => (
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
              <h2>{technicalQuestions[selectedQuestion].title}</h2>
              <div className="question-content">{technicalQuestions[selectedQuestion].content}</div>
            </div>
          ) : (
            <p className="placeholder">Select a question to view its details.</p>
          )
        ) : (
          <div className="mock-interview">
            <h2>{technicalQuestions[currentMockQuestion].title}</h2>
            <div className="question">{technicalQuestions[currentMockQuestion].content}</div>
            <VoiceInput setText={setAnswerInput} />
            <textarea
              rows={4}
              value={answerInput}
              onChange={(e) => setAnswerInput(e.target.value)}
              placeholder="Type or speak your answer here..."
            />
            <button className="next-btn" onClick={handleNext}>
              {currentMockQuestion + 1 === technicalQuestions.length ? "Finish" : "Next"}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

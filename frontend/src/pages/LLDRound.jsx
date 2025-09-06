import React, { useState, useEffect } from "react";

export default function LLD() {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/lld")
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>LLD Questions</h1>
      <ul>
        {questions.map((q) => (
          <li key={q.id} onClick={() => setSelectedQuestion(q)}>
            {q.title}
          </li>
        ))}
      </ul>
      {selectedQuestion && (
        <div>
          <h2>{selectedQuestion.title}</h2>
          <pre>{JSON.stringify(selectedQuestion.content, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

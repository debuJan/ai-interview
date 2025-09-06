import React, { useState, useEffect } from "react";

function OAQuestions() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/oa")
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Online Assessment Questions</h2>
      {questions.map((q) => (
        <div key={q.id} className="question-card">
          <h3>{q.title}</h3>
          <p>{q.content}</p>
          <p><strong>Approach:</strong> {q.approach}</p>
          <p><strong>Logic:</strong> {q.logic}</p>
        </div>
      ))}
    </div>
  );
}

export default OAQuestions;

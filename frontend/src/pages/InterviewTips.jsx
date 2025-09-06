import React, { useEffect, useState } from "react";
import "../styles/interviewtips.css";

export default function InterviewTips() {
  const [tipsData, setTipsData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/interviewtips")
      .then((res) => res.json())
      .then((data) => setTipsData(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="interview-tips">
      <h1>💡 Interview Preparation Tips</h1>

      {tipsData.map((section) => (
        <section key={section.id}>
          <h2>{section.category}</h2>
          <ul>
            {section.tips.map((tip, idx) => (
              <li key={idx}>{tip}</li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

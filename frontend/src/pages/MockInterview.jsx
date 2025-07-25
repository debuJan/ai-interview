import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/mockinterview.css";  // ✅ correct path

const MockInterview = () => {
  const navigate = useNavigate();

  return (
    <div className="mock-interview-container">
      <h1>🚀 SDE Mock Interview</h1>
      
      <div className="rounds-list">
        <button onClick={() => navigate("/dashboard/oa")}>🧠 SDE OA Round</button>
        <button onClick={() => navigate("/dashboard/technical")}>💻 SDE Coding Round</button>
        <button onClick={() => navigate("/dashboard/hr")}>🎙️ SDE HR Round</button>
      </div>

      <p style={{ marginTop: "20px", color: "gray" }}>
        Complete each round within the given time. Instant feedback after each.
      </p>
    </div>
  );
};

export default MockInterview;

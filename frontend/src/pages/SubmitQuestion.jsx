import React, { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const SubmitQuestion = () => {
  const [question, setQuestion] = useState("");
  const [roundType, setRoundType] = useState("HR");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("User not logged in. Please log in again.");
      return;
    }

    if (!question.trim()) {
      alert("Please enter a valid question.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/questions", {
        question,
        roundType,
        userId,
      });

      console.log("✅ Question submitted:", response.data);
      navigate("/dashboard");
    } catch (error) {
      console.error("❌ Failed to submit question", error);
      alert("Failed to submit question. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Your Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        required
      />
      <select value={roundType} onChange={(e) => setRoundType(e.target.value)}>
        <option value="HR">HR</option>
        <option value="Technical">Technical</option>
        <option value="Aptitude">Aptitude</option>
      </select>
      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default SubmitQuestion;

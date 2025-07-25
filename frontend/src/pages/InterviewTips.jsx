import React from "react";
import "../styles/interviewtips.css"; // Create this file for styles

export default function InterviewTips() {
  return (
    <div className="interview-tips">
      <h1>💡 Interview Preparation Tips</h1>

      <section>
        <h2>📌 Before the Interview</h2>
        <ul>
          <li>Research the company, mission, and culture.</li>
          <li>Understand the job description and required skills.</li>
          <li>Practice common interview questions in HR, LLD, and DSA.</li>
          <li>Keep resume and portfolio projects ready.</li>
        </ul>
      </section>

      <section>
        <h2>👥 HR Round Tips</h2>
        <ul>
          <li>Use the <b>STAR method</b> to answer behavioral questions.</li>
          <li>Show personality, motivation, and honesty.</li>
          <li>Be ready to talk about strengths, weaknesses, and goals.</li>
        </ul>
      </section>

      <section>
        <h2>⚙️ Technical Round Tips</h2>
        <ul>
          <li>Explain your thought process while solving problems.</li>
          <li>Know your projects and architecture in detail.</li>
          <li>Practice LLD questions like designing Chat App, Parking Lot.</li>
          <li>Cover system design basics if applying for SDE-1 or above.</li>
        </ul>
      </section>

      <section>
        <h2>🧠 Final Tips</h2>
        <ul>
          <li>Stay calm and confident even if you don’t know something.</li>
          <li>Always ask for clarification if the question is unclear.</li>
          <li>Prepare a few good questions to ask the interviewer.</li>
        </ul>
      </section>
    </div>
  );
}

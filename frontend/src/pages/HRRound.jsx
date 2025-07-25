import React, { useState } from "react";
import "../styles/hrround.css";
import VoiceInput from "./VoiceInput";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";



const questions = [
  {
    
    title: "1. Tell me about yourself",
    content: (
      <>
        <p>This is the universal question asked at the very first of any interview. It sounds easy, right? But it’s one of the most important questions where candidates often fail to create an impression.</p>
        <h4>Tips to answer:</h4>
        <ul>
          <li>Don’t ask the interviewer what they want to know. It can sound rude.</li>
          <li>Don’t repeat what’s already on your resume.</li>
          <li>Introduce yourself using adjectives like <b>problem-solving</b>, <b>innovative</b>, <b>tech-savvy</b>, etc.</li>
          <li>Highlight career achievements relevant to the role.</li>
          <li>Explain why you want this role and why it’s a good fit for you.</li>
        </ul>
        <h4>Sample Answer:</h4>
        <blockquote>
          I am an energetic person, an effective communicator, and a quick learner. I was one of the top students in my B.E. degree in XYZ. I have worked on various software projects that exposed me to enterprise web applications and client satisfaction. I believe I’m a good fit for technology-centric roles in your company.
        </blockquote>
      </>
    ),
  },
  {
    title: "2. Why do you want to work for our company?",
    content: (
      <>
        <p>This question ensures that you have researched the company and genuinely wish to join. Tailor your answer to fit the role and company values.</p>
        <h4>Tips to answer:</h4>
        <ul>
          <li>Show that you understand the job requirements.</li>
          <li>Highlight how your skills align with the company’s goals.</li>
          <li>Express excitement about joining the company culture or projects.</li>
        </ul>
      </>
    ),
  },
  {
    title: "3. What are your greatest strengths and weaknesses?",
    content: (
      <>
        <p>HR asks this to understand your personality and suitability for the role. Be honest, but strategic.</p>
        <h4>Tips to answer:</h4>
        <ul>
          <li>Be honest and highlight strengths relevant to the job.</li>
          <li>Back up your strengths with examples.</li>
          <li>Choose weaknesses that don’t affect your job candidacy.</li>
          <li>Never use clichés like “I’m a perfectionist”.</li>
        </ul>
        <h4>Sample Answer:</h4>
        <blockquote>
          I think one of my greatest strengths is that I am a great team player. I am also a self-motivated and quick learning individual. Whatever task that I set to do, I always give my best and complete it diligently well in advance. <br />
          <br />
          My weakness would be that I am learning to master people skills while meeting new individuals. I get nervous while talking to new people. I have been working on this for quite a long time and I can say with utmost confidence that I have come a long way.
        </blockquote>
      </>
    ),
  },
  {
    title: "4. Why are you looking for a change?",
    content: (
      <>
        <p>This helps HR understand your motivation for switching jobs. Avoid speaking negatively about your current employer.</p>
        <h4>Sample Answer:</h4>
        <blockquote>
          The reason I am looking for change is that I feel like now is the time to expand my horizon. I have worked in my current company for quite a long time and while I am grateful for all the opportunities that were presented to me there, I want to go beyond my current role here, explore different avenues, and take up challenging roles. I believe that your company will be the perfect place for me to push and grow myself as an individual.
        </blockquote>
        <h4>If you were laid off, you can say:</h4>
        <blockquote>
          The client that I was working for was leaving the market and hence our company was forced to dissolve the department. Unfortunately, I had joined that position in that department very recently. I do not have any regrets though, as I was extremely happy with the learning opportunities presented to me which will help me a lot in my further career endeavors.
        </blockquote>
      </>
    ),
  },
  {
    title: "5. Tell me about the gap in your resume.",
    content: (
      <>
        <p>This comes up if the interviewer spots a gap in your resume. The goal is to reassure them that the gap had a valid reason.</p>
        <h4>Sample Answer:</h4>
        <blockquote>
          After the completion of my bachelor's degree, I started working continuously for 8 years without taking any break. This sort of impacted my productivity and also harmed my work-life balance. Hence, I decided to take a break of 6 months to clear my mind, make amends with my family, and also do solo travel to different places. I also gained valuable lessons during this break such as the importance of work-life balance, organizational ability, and a fresh new perspective on life.
        </blockquote>
      </>
    ),
  },
{
    title: "7. What is your biggest achievement so far?",
    content: (
      <>
        <p>Discuss your most recent work-related achievement using the STAR format (Situation, Task, Action, Result).</p>
        <h4>Sample Answer:</h4>
        <blockquote>
          I have achieved several milestones to date in my career as a software developer. The most recent one is of the time when we were working on a critical component of a product pertaining to customer payments. I was made a lead to this component to complete it in 2 months. We upskilled ourselves, brought in more resources, and completed the product well in advance of the deadline. The higher management was proud, and our team was awarded in the quarterly town hall. It was a very proud moment for me.
        </blockquote>
      </>
    ),
  },
  {
    title: "8. Where do you see yourself in 5 years?",
    content: (
      <>
        <p>This question helps interviewers gauge your commitment and alignment with the company’s growth.</p>
        <h4>Sample Answer:</h4>
        <blockquote>
          Over 5 years, I would love to utilize all the opportunities that this company provides me to learn by utilizing internal and external training programs. My ultimate goal is to become a Technology Architect and contribute to developing products aligned with this company’s vision.
        </blockquote>
      </>
    ),
  },
  {
    title: "9. Why should we hire you?",
    content: (
      <>
        <p>Convince the recruiter how you’re the right fit for the role and how you’ll add value.</p>
        <h4>Sample Answer:</h4>
        <blockquote>
          I am a self-motivated and open-minded person who can learn quickly. My experience in web development and my problem-solving attitude make me confident that I’m suitable for this role. My values align with the company’s values, and I’m excited about contributing to the organization’s growth.
        </blockquote>
      </>
    ),
  },
  {
    title: "10. How do you deal with criticism?",
    content: (
      <>
        <p>This helps the interviewer assess your ability to take constructive feedback and grow.</p>
        <h4>Sample Answer:</h4>
        <blockquote>
          I am always enthusiastic about learning new things, and during the process, I might tend to make mistakes. I am open to constructive feedback and actively work to improve myself. If the feedback is negative and unhelpful, I stay focused on my work without letting it affect my morale.
        </blockquote>
      </>
    ),
  },


];



    export default function HRRound() {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [currentMockQuestion, setCurrentMockQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

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
    speechSynthesis.speak(utterance);
  };

  const startMockInterview = () => {
    setInterviewStarted(true);
    setCurrentMockQuestion(0);
    setAnswers({});
    resetTranscript();
    speakQuestion(questions[0].title);
  };

  const saveAnswerToBackend = async (question, answer) => {
    try {
      const res = await fetch("http://localhost:5000/save-answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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

    // Save to backend
    saveAnswerToBackend(currentTitle, transcript);

    // Save locally
    setAnswers((prev) => ({
      ...prev,
      [currentTitle]: transcript,
    }));

    resetTranscript();

    if (currentMockQuestion + 1 < questions.length) {
      const next = currentMockQuestion + 1;
      setCurrentMockQuestion(next);
      speakQuestion(questions[next].title);
    } else {
      alert("✅ Mock Interview Completed!");
      console.log("All Answers:", answers);
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
              <h2>{questions[selectedQuestion].title}</h2>
              <div className="question-content">
                {questions[selectedQuestion].content}
              </div>
            </div>
          ) : (
            <p className="placeholder">Select a question to view its details.</p>
          )
        ) : (
          <div className="mock-interview">
            <h2>{questions[currentMockQuestion].title}</h2>
            <div className="question">{questions[currentMockQuestion].content}</div>

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
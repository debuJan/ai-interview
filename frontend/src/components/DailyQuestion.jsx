import React, { useEffect, useState } from 'react';
import '../styles/dailyquestion.css';

const questions = [
    {
        id: 'dq001',
        title: 'Concept Challenge',
        questionText: 'Explain the difference between SQL and NoSQL databases.',
        category: 'Database',
        difficulty: 'Medium',
    },
    {
        id: 'dq002',
        title: 'DSA Puzzle',
        questionText: 'Find the middle of a linked list in one pass.',
        category: 'Data Structures',
        difficulty: 'Hard',
    },
    {
        id: 'dq003',
        title: 'System Design',
        questionText: 'How would you design a URL shortener?',
        category: 'System Design',
        difficulty: 'Hard',
    },
];

const getTimeUntilMidnight = () => {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    const diff = midnight - now;

    const hours = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, '0');
    const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0');
    const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');

    return `${hours}h ${minutes}m ${seconds}s`;
};

const DailyQuestion = () => {
    const [questionIndex, setQuestionIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(getTimeUntilMidnight());

    useEffect(() => {
        const savedIndex = localStorage.getItem('dqIndex');
        const savedTime = localStorage.getItem('dqTimestamp');
        const now = Date.now();

        if (savedIndex && savedTime) {
            const timeDiff = now - parseInt(savedTime, 10);

            if (timeDiff < 24 * 60 * 60 * 1000) {
                setQuestionIndex(Number(savedIndex));
            } else {
                const nextIndex = (Number(savedIndex) + 1) % questions.length;
                setQuestionIndex(nextIndex);
                localStorage.setItem('dqIndex', nextIndex.toString());
                localStorage.setItem('dqTimestamp', now.toString());
            }
        } else {
            localStorage.setItem('dqIndex', '0');
            localStorage.setItem('dqTimestamp', now.toString());
            setQuestionIndex(0);
        }
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(getTimeUntilMidnight());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const question = questions[questionIndex];

    const handleSubmit = () => {
        setSubmitted(true);
    };

    return (
        <div className="dq-card">
            <div className="dq-header">
                <div className="dq-badge">🔥 Daily Challenge</div>
                <div className="dq-timer">Next in: {timeLeft}</div>
            </div>

            <h3 className="dq-title">{question.title}</h3>
            <p><strong>Question:</strong> {question.questionText}</p>
            <p className="dq-meta">
                Category: {question.category} | Difficulty: {question.difficulty}
            </p>

            <textarea
                className="dq-input"
                rows="5"
                placeholder="Write your answer here..."
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                disabled={submitted}
            />

            <div className="dq-actions">
                <button
                    className="dq-btn submit"
                    onClick={handleSubmit}
                    disabled={submitted || !userAnswer.trim()}
                >
                    {submitted ? 'Submitted' : 'Submit'}
                </button>
            </div>

            {submitted && (
                <p className="dq-feedback">Your answer has been submitted!</p>
            )}
        </div>
    );
};

export default DailyQuestion;

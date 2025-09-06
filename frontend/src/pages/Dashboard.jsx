import "../styles/dashboard.css";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import DailyQuestion from "../components/DailyQuestion";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();

  const [profileImage, setProfileImage] = useState(() => {
    return localStorage.getItem("profileImage") || "/assets/avatar.png";
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");

  const [questions, setQuestions] = useState([]); // Ensure default is array
  const [loading, setLoading] = useState(true);

  // Save profile image on update
  useEffect(() => {
    localStorage.setItem("profileImage", profileImage);
  }, [profileImage]);

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Fetch HR questions on mount
 useEffect(() => {
  const fetchQuestions = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/questions?category=hr");

      const data = response.data;

      if (Array.isArray(data.data)) {
        setQuestions(data.data); // ✅ correct access
      } else {
        console.error("Expected array but got:", data);
        setQuestions([]);
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  fetchQuestions();
}, []);


  // Toggle sidebar for mobile
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const progressData = {
    hr: 75,
    lld: 40,
    technical: 60,
    aptitude: 30,
    oa: 50,
  };

  // ⏳ Countdown Timer to Midnight (IST)
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
      const endOfDay = new Date(now);
      endOfDay.setHours(23, 59, 59, 999);

      const difference = endOfDay - now;

      if (difference <= 0) {
        setTimeLeft("00h 00m 00s");
        return;
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft(
        `${hours.toString().padStart(2, "0")}h ${minutes
          .toString()
          .padStart(2, "0")}m ${seconds.toString().padStart(2, "0")}s`
      );
    };

    const interval = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft(); // run immediately
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard-container">
      {/* Hamburger for Mobile */}
      <button className="hamburger-btn" onClick={toggleSidebar}>☰</button>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <ThemeToggle />
        <div className="profile-wrapper">
          <label htmlFor="profile-upload" className="upload-icon">
            <div className="profile-circle">
              <img src={profileImage} alt="Profile" id="profile-img" />
              <span className="plus-icon">+</span>
            </div>
          </label>
          <input
            type="file"
            id="profile-upload"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
          <h3>Hello, Debanshu 👋</h3>
        </div>

        <button className="sidebar-btn" onClick={() => navigate("/dashboard/PI")}>
          Past Interview
        </button>
        <button className="sidebar-btn" onClick={() => navigate("/dashboard/MI")}>
          Mock Interview
        </button>
        <button className="sidebar-btn" onClick={() => navigate("/dashboard/RB")}>
          Resume Builder
        </button>
        <button className="sidebar-btn" onClick={() => navigate("/dashboard/IT")}>
          Interview Tips
        </button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="welcome-card fade-in">
          <h1>🚀 Ready to Ace Your Interview?</h1>
          <p>Choose your preparation path below:</p>
        </div>

        <div className="grid-buttons">
          {/* HR Section */}
          <div className="card" onClick={() => navigate("/dashboard/hr")}>
            <h2>👤 HR Round</h2>
            <p>Behavioral and general HR questions.</p>
            <div className="progress-bar">
              <div style={{ width: `${progressData.hr}%` }} className="progress-fill"></div>
            </div>
            <p className="progress-text">{progressData.hr}% Completed</p>
          </div>

        
          {/* Other Rounds */}
          <div className="card" onClick={() => navigate("/dashboard/lld")}>
            <h2>🧱 LLD Round</h2>
            <p>Low-level design & system understanding.</p>
            <div className="progress-bar">
              <div style={{ width: `${progressData.lld}%` }} className="progress-fill"></div>
            </div>
            <p className="progress-text">{progressData.lld}% Completed</p>
          </div>

          <div className="card" onClick={() => navigate("/dashboard/technical")}>
            <h2>💻 Technical Round</h2>
            <p>Core DSA & language-specific concepts.</p>
            <div className="progress-bar">
              <div style={{ width: `${progressData.technical}%` }} className="progress-fill"></div>
            </div>
            <p className="progress-text">{progressData.technical}% Completed</p>
          </div>

          <div className="card" onClick={() => navigate("/dashboard/aptitude")}>
            <h2>🧠 Aptitude Round</h2>
            <p>Logical reasoning and quantitative skills.</p>
            <div className="progress-bar">
              <div style={{ width: `${progressData.aptitude}%` }} className="progress-fill"></div>
            </div>
            <p className="progress-text">{progressData.aptitude}% Completed</p>
          </div>

          <div className="card" onClick={() => navigate("/dashboard/oa")}>
            <h2>📄 OA Round</h2>
            <p>Online assessments & company patterns.</p>
            <div className="progress-bar">
              <div style={{ width: `${progressData.oa}%` }} className="progress-fill"></div>
            </div>
            <p className="progress-text">{progressData.oa}% Completed</p>
          </div>

          {/* Daily Challenge */}
          <div className="card daily-question-circle">
            <div className="daily-header">
              <h3>🔥 Daily Challenge</h3>
              <span className="countdown">Next in: {timeLeft}</span>
            </div>
            <DailyQuestion />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

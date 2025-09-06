import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import HRRound from "./pages/HRRound";
import AptitudeRound from "./pages/AptitudeRound";
import LLDRound from "./pages/LLDRound";
import ResumeBuilder from "./pages/ResumeBuilder";
import InterviewTips from "./pages/InterviewTips";
import MockInterview from "./pages/MockInterview";
import TechnicalRound from "./pages/TechnicalRound";
import OARound from "./pages/OARound";
import SubmitQuestion from "./pages/SubmitQuestion"; // 👈 this is fine

function App() {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/hr" element={<HRRound />} />
      <Route path="/dashboard/aptitude" element={<AptitudeRound />} />
      <Route path="/dashboard/lld" element={<LLDRound />} />
      <Route path="/dashboard/technical" element={<TechnicalRound />} />
      <Route path="/dashboard/oa" element={<OARound />} />
      <Route path="/dashboard/IT" element={<InterviewTips />} />
      <Route path="/dashboard/RB" element={<ResumeBuilder />} />
      <Route path="/dashboard/MI" element={<MockInterview />} />

      {/* ✅ Add this line below */}
      <Route path="/submit" element={<SubmitQuestion />} />
    </Routes>
  );
}

export default App;

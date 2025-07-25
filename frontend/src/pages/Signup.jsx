// src/pages/Signup.jsx
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabase"; // ✅ Your Supabase client setup
import "../styles/signup.css";
import { useState } from "react";

function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    const username = e.target.username.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    if (!email || !password || !username) {
      alert("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { username },
        },
      });

      if (error) throw error;

      console.log("✅ Supabase signup success:", data);
      alert("Signup successful! Check your email for verification.");
      navigate("/login");
    } catch (err) {
      console.error("❌ Signup error:", err.message || err);
      alert("Signup failed: " + (err.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-container">
        <h2 className="signup-title">Create Your Account</h2>
        <form className="signup-form" onSubmit={handleSignup}>
          <input type="text" name="username" placeholder="Username" required />
          <input type="email" name="email" placeholder="Email" required />
          <input type="password" name="password" placeholder="Password" required />
          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>
        <p className="signup-login-text">
          Already have an account?{" "}
          <Link to="/login" className="login-link">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;

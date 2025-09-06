// controllers/authController.js
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { generateAndSendOTP, otpStore } from "../utils/sendOTP.js";

import User from "../models/User.js";
import sendMail from "../utils/sendMail.js";  // Make sure sendMail is correctly exported in sendMail.js
// If sendMail is named export, adjust import accordingly

const makeToken = (user) =>
  jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET || "devsecret",
    { expiresIn: "1h" }
  );

// Temporary in-memory OTP store (for demo/testing, use Redis in production)
const otpMap = new Map();

// POST /api/auth/signup
export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const exists = await User.findOne({ $or: [{ email }, { username }] });
    if (exists)
      return res.status(400).json({ message: "Email or username already taken" });

    // Generate and store OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpMap.set(email, { otp, username, password, createdAt: Date.now() });

    // Send OTP to email
    await sendMail(email, "Verify your email", `Your OTP is: ${otp}`);

    return res.status(200).json({
      message: "OTP sent to your email for verification",
    });
  } catch (err) {
    console.error("Signup OTP error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// POST /api/auth/verify-otp
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const record = otpMap.get(email);

    if (!record) return res.status(400).json({ message: "OTP expired or invalid" });
    if (record.otp !== otp)
      return res.status(400).json({ message: "Incorrect OTP" });

    const hashed = await bcrypt.hash(record.password, 10);
    const user = await User.create({
      username: record.username,
      email,
      password: hashed,
    });

    otpMap.delete(email);

    const token = makeToken(user);
    return res.status(201).json({
      message: "Signup successful",
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (err) {
    console.error("OTP verification error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// POST /api/auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password are required" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    const token = makeToken(user);
    return res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

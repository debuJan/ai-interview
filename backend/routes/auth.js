import express from "express";
import { signup, login } from "../controllers/authController.js";
import Otp from "../models/Otp.js";
import User from "../models/User.js"; // Ensure you have this
import { generateAndSendOTP } from "../utils/otpStore.js";

const router = express.Router();

// Signup route
router.post("/signup", signup);

// Login route
router.post("/login", login);

// Send OTP route (Only for new users)
router.post("/send-otp", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists with this email" });
    }

    await generateAndSendOTP(email);
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Verify OTP route
router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ error: "Email and OTP are required" });
  }

  try {
    const record = await Otp.findOne({ email });

    if (!record) {
      return res.status(400).json({ error: "OTP not found for this email" });
    }

    if (record.otp !== otp) {
      return res.status(401).json({ error: "Invalid OTP" });
    }

    // Optional: You can delete OTP after verification
    await Otp.deleteOne({ email });

    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;

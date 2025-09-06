// backend/utils/sendOTP.js

import nodemailer from "nodemailer";
import otpGenerator from "otp-generator";

// In-memory store for OTPs
export const otpStore = new Map();

/**
 * Generates a 6-digit OTP and sends it to the user's email.
 * @param {string} email - The user's email address
 * @returns {string} otp - The generated OTP
 */
export const generateAndSendOTP = async (email) => {
  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
  });

  // Save OTP to in-memory store with timestamp
  otpStore.set(email, {
    otp,
    timestamp: Date.now(),
  });

  // Setup the transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,     // Your Gmail address
      pass: process.env.EMAIL_PASS,     // App password from Gmail
    },
  });

  // Email content
  const mailOptions = {
    from: `"AI Interview Platform" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your OTP for AI Interview Platform",
    text: `Your One-Time Password (OTP) is: ${otp}. It is valid for 5 minutes.`,
  };

  // Send the email
  await transporter.sendMail(mailOptions);

  return otp;
};

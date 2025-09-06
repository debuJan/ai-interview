import nodemailer from "nodemailer";
import otpGenerator from "otp-generator";

// Temporary in-memory OTP store
const otpStore = new Map();

export const generateAndSendOTP = async (email) => {
  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP for AI Interview App",
    text: `Your OTP is: ${otp}. It is valid for 5 minutes.`,
  };

  await transporter.sendMail(mailOptions);

  otpStore.set(email, { otp, expiresAt: Date.now() + 5 * 60 * 1000 }); // store for 5 mins

  return otp;
};

export { otpStore };

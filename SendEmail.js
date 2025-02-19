const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE === "true", // Use SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendEmail(to, subject, text) {
  try {
    const info = await transporter.sendMail({
      from: `"Your Name" <${process.env.EMAIL_USER}>`, // Sender email
      to,
      subject,
      text,
    });

    console.log("Email sent: " + info.response);
  } catch (error) {
    // Log the error for debugging
    console.error("Error in sendEmail function:", error);
    throw new Error("Failed to send email"); // Re-throw the error to be caught in the route
  }
}

module.exports = sendEmail;

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ✅ Set up Nodemailer transporter for Gmail
const transporter = nodemailer.createTransport({
  service: "gmail", // ✅ Use 'gmail' instead of host
  auth: {
    user: process.env.EMAIL_USER, // ✅ Authenticated Gmail address
    pass: process.env.EMAIL_PASS, // ✅ App Password (NOT your actual password)
  },
});

// ✅ Verify SMTP connection before accepting requests
transporter.verify(function (error, success) {
  if (error) {
    console.error("❌ SMTP Connection Error:", error);
  } else {
    console.log("✅ SMTP Connection Successful");
  }
});

// ✅ Contact form endpoint
app.post("/contact", async (req, res) => {
  const { fullname, email, message } = req.body;

  if (!fullname || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Email sender and recipient details
  const mailOptions = {
    from: `"${fullname}" <${process.env.EMAIL_USER}>`, // ✅ Use authenticated Gmail sender
    to: "kpopera123@gmail.com", // ✅ Recipient email
    subject: "New Contact Form Submit",
    text: `From: ${fullname} (${email})\n\nMessage:\n${message}`,
    replyTo: email, // ✅ Allows easy reply
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully:", info);
    res.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("❌ Email sending error:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

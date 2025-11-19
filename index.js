import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Проверяем что ключ существует
if (!process.env.OPENAI_API_KEY) {
  console.error("❌ ERROR: OPENAI_API_KEY is missing in Render environment!");
}

const API_KEY = process.env.OPENAI_API_KEY;

// Проверка, что сервер работает
app.get("/", (req, res) => {
  res.send("Proxy is running");
});

// Основной маршрут AI
app.post("/v1/chat/completions", async (req, res) => {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.json(data);

  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).json({ error: "Proxy error", details: err.message });
  }
});

// Запуск
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Proxy running on ${PORT}`));

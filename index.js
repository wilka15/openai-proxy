import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_KEY = process.env.OPENAI_KEY; // Добавить на Render!

app.post("/v1/responses", async (req, res) => {
    try {
        const body = req.body;

        const openaiResponse = await fetch("https://api.openai.com/v1/responses", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${OPENAI_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        const data = await openaiResponse.json();
        res.json(data);

    } catch (error) {
        console.error("Proxy error:", error);
        res.status(500).json({ error: "proxy_failed", details: error.toString() });
    }
});

// Проверка что сервер работает
app.get("/", (_, res) => res.send("Proxy is running"));

app.listen(10000, () => console.log("Proxy running on port 10000"));

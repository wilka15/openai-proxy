import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/v1/chat/completions", async (req, res) => {
    try {
        const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + process.env.OPENAI_API_KEY
            },
            body: JSON.stringify(req.body)
        });

        const data = await openaiRes.json();
        res.status(openaiRes.status).send(data);

    } catch (err) {
        console.error(err);
        res.status(500).send({ error: "Proxy error" });
    }
});

app.listen(3000, () => {
    console.log("Proxy running on port 3000");
});

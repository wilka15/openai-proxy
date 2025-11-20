async function sendMessage() {
    const input = document.getElementById("userInput");
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "user");
    input.value = "";

    const res = await fetch("https://openai-proxy-ucgy.onrender.com/v1/responses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            model: "gpt-4.1-mini",
            input: text
        })
    });

    const data = await res.json();

    const ai = data.output_text || "Ошибка ответа";
    addMessage(ai, "ai");
}

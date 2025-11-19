async function sendMessage() {
    const input = document.getElementById("userInput");
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "user");
    input.value = "";

    const response = await fetch(API_URL, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            input: text
        })
    });

    const data = await response.json();

    if (!data.output) {
        addMessage("Ошибка: сервер не ответил корректно", "ai");
        return;
    }

    const ai = data.output[0].content[0].text;
    addMessage(ai, "ai");
    speak(ai);
}

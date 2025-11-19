const API_URL = "https://openai-proxy-ucgy.onrender.com/v1/chat/completions";

async function sendMessage() {
    const input = document.getElementById("userInput");
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "user");
    input.value = "";

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [{ role: "user", content: text }]
            })
        });

        const data = await response.json();

        if (!data.choices || !data.choices[0]) {
            addMessage("Ошибка: неправильный JSON от сервера", "ai");
            console.log("Сырой ответ:", data);
            return;
        }

        const ai = data.choices[0].message.content;
        addMessage(ai, "ai");
        speak(ai);

    } catch (err) {
        addMessage("Ошибка соединения с прокси", "ai");
        console.error(err);
    }
}

function addMessage(msg, sender) {
    const chat = document.getElementById("chat");
    const div = document.createElement("div");
    div.className = "msg " + sender;
    div.textContent = msg;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

function speak(text) {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "ru-RU";
    window.speechSynthesis.speak(utter);
}

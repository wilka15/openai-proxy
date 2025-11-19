const API_URL = "https://openai-proxy-ucgy.onrender.com/v1/chat/completions";

// Отправка запроса к прокси → OpenAI → обратно
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
            addMessage("Ошибка: сервер вернул неверный ответ", "ai");
            console.error("Ответ сервера:", data);
            return;
        }

        const ai = data.choices[0].message.content;
        addMessage(ai, "ai");
        speak(ai);

    } catch (err) {
        addMessage("Ошибка соединения с сервером", "ai");
        console.error(err);
    }
}

// Добавление сообщения в чат
function addMessage(text, sender) {
    const chat = document.getElementById("chat");
    const div = document.createElement("div");
    div.className = "msg " + sender;
    div.textContent = text;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

// Озвучка ответа
function speak(text) {
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "ru-RU";
    utter.rate = 1;
    synth.speak(utter);
}

// Голосовой ввод
function voiceInput() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return alert("Ваш браузер не поддерживает голосовой ввод");

    const rec = new SR();
    rec.lang = "ru-RU";
    rec.start();

    rec.onresult = (e) => {
        document.getElementById("userInput").value

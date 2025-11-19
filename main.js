const API_URL = "https://smarthub-proxy.onrender.com/v1/chat/completions";

// Отправка сообщения
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
            addMessage("❌ Ошибка: сервер вернул пустой или неверный ответ", "ai");
            return;
        }

        const ai = data.choices[0].message.content;
        addMessage(ai, "ai");
        speak(ai);

    } catch (err) {
        addMessage("❌ Ошибка подключения к серверу", "ai");
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

// Голосовой ввод
function voiceInput() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        alert("Ваш браузер не поддерживает голосовой ввод");
        return;
    }

    const rec = new SpeechRecognition();
    rec.lang = "ru-RU";
    rec.start();

    document.getElementById("micBtn").style.background = "#ffa200";

    rec.onresult = (event) => {
        const text = event.results[0][0].transcript;
        document.getElementById("userInput").value = text;
    };

    rec.onend = () => {
        document.getElementById("micBtn").style.background = "#ff3b3b";
    };
}

// Озвучка ответа
function speak(text) {
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "ru

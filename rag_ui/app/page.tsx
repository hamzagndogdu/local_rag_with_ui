"use client";

import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setInput("");

    const res = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage }),
    });

    const data = await res.json();
    const botReply = data.answer;

    setMessages((prev) => [...prev, { role: "bot", text: botReply }]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-[#121212] text-white">
      <div className="w-full max-w-xl border border-gray-700 rounded p-4 mb-4 h-[70vh] overflow-y-auto bg-[#1E1E1E] shadow-lg">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`p-3 my-2 rounded-lg max-w-[90%] ${
              m.role === "user"
                ? "bg-blue-600 ml-auto text-right text-white"
                : "bg-gray-700 text-left text-gray-200"
            }`}
          >
            {m.text}
          </div>
        ))}
      </div>

      <div className="flex w-full max-w-xl gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border border-gray-600 bg-[#1e1e1e] text-white p-3 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="Ask something..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition font-semibold"
        >
          Send
        </button>
      </div>
    </div>
  );
}

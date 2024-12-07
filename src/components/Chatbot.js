// src/components/Chatbot.js
import React, { useState } from "react";
const { GoogleGenerativeAI } = require("@google/generative-ai");

const Chatbot = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Handle user input change
  const handleUserInput = (e) => setUserInput(e.target.value);

  // Send message to the server via /api/chat
  const sendMessage = async () => {
    if (!userInput) return; // Prevent sending empty messages

    setIsLoading(true);
    const userMessage = { type: "user", message: userInput };
    setChatHistory((prev) => [...prev, userMessage]);
    
    const genAI = new GoogleGenerativeAI("AIzaSyBBTZ47MTMNg_GlzS8eaSLWNIE92IH_hW0");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    try {
      const result = await model.generateContent(userInput);
      const aiMessage = { type: "ai", message: result.response.text() };
      setChatHistory((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error generating response:", error);
    } finally {
      setIsLoading(false);
      setUserInput(""); // Clear input field after sending
    }
  };

  // Clear chat history
  const clearChat = () => {
    setChatHistory([]);
    setUserInput(""); // Clear input field
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-4">Ask Me Anything</h1>

      <div className="chat-container rounded-lg shadow-md p-4 bg-white h-96 overflow-y-auto">
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded-lg ${
              chat.type === "user"
                ? "bg-blue-100 text-right"
                : "bg-gray-100 text-left"
            }`}
          >
            <p>{chat.message}</p>
          </div>
        ))}
        {isLoading && <p className="text-center text-gray-500">Loading...</p>}
      </div>

      <div className="flex mt-4">
        <input
          type="text"
          className="flex-grow px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message..."
          value={userInput}
          onChange={handleUserInput}
        />
        <button
          className="px-4 py-2 ml-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
          onClick={sendMessage}
          disabled={isLoading}
        >
          Send
        </button>
      </div>

      <button
        className="mt-4 block px-4 py-2 rounded-lg bg-gray-400 text-white hover:bg-gray-500 focus:outline-none"
        onClick={clearChat}
      >
        Clear Chat
      </button>
    </div>
  );
};

export default Chatbot;

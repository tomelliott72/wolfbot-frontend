import React from "react";
import { useChat } from "./hooks/useChat";

export default function Chat() {
  const { messages, sendMessage, isStreaming } = useChat();

  return (
    <div className="p-4 max-w-xl mx-auto">
      <div className="space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg ${
              msg.role === "user" ? "bg-gray-200 text-left" : "bg-blue-100 text-right"
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>

      <form
        onSubmit={e => {
          e.preventDefault();
          const input = e.currentTarget.elements.namedItem("message") as HTMLInputElement;
          sendMessage(input.value);
          input.value = "";
        }}
        className="mt-4 flex"
      >
        <input
          name="message"
          className="flex-grow p-2 border border-gray-300 rounded-l-md"
          placeholder="Ask a question..."
          disabled={isStreaming}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-r-md"
          disabled={isStreaming}
        >
          Send
        </button>
      </form>
    </div>
  );
}

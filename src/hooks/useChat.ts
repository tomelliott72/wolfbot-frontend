import { useState } from "react";
import { chatApi } from "../api/api";
import { stripCitations } from "../utils/citation";
import { ChatAppRequest, ResponseMessage } from "../api/models";

export function useChat() {
  const [conversations, setConversations] = useState<[string, string][]>([]); // [userQuestion, botAnswer]
  const [isStreaming, setIsStreaming] = useState(false);

  async function sendMessage(userInput: string) {
    const requestMessages: ResponseMessage[] = conversations.flatMap(([q, a]) => [
      { role: "user", content: q },
      { role: "assistant", content: a }
    ]);

    requestMessages.push({ role: "user", content: userInput });

    const request: ChatAppRequest = {
      messages: requestMessages,
      session_state: localStorage.getItem("wolfbot_session_id") || "unknown"
    };

    setConversations(prev => [...prev, [userInput, ""]]);
    setIsStreaming(true);

    try {
      const response = await chatApi(request);
      const reader = response.body?.getReader();
      const decoder = new TextDecoder("utf-8");
      let botReply = "";

      while (true) {
        const { value, done } = await reader!.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });

        const lines = chunk
          .split("\n")
          .filter(line => line.trim().startsWith("{") && line.includes("\"delta\""));

        for (const line of lines) {
          try {
            const parsed = JSON.parse(line);
            const deltaContent = parsed?.delta?.content;
            if (deltaContent) {
              botReply += deltaContent;
              setConversations(prev => {
                const last = prev.slice(0, -1);
                const [q] = prev[prev.length - 1];
                return [...last, [q, botReply]];
              });
            }
          } catch (e) {
            console.warn("Stream parsing error:", e);
          }
        }
      }

      const cleanedReply = stripCitations(botReply);
      setConversations(prev => {
        const last = prev.slice(0, -1);
        const [q] = prev[prev.length - 1];
        return [...last, [q, cleanedReply]];
      });
    } catch (err) {
      console.error("Error sending message:", err);
      setConversations(prev => {
        const last = prev.slice(0, -1);
        const [q] = prev[prev.length - 1];
        return [...last, [q, "Sorry, something went wrong."]];
      });
    } finally {
      setIsStreaming(false);
    }
  }

  // For rendering: flatten conversation to message bubbles
  const messages: ResponseMessage[] = conversations.flatMap(([q, a]) => [
    { role: "user", content: q },
    { role: "assistant", content: a }
  ]);

  return {
    messages,
    sendMessage,
    isStreaming
  };
}

# Wolfbot Chat Frontend

This is a lightweight React + TypeScript frontend for interacting with the Wolfbot API. It supports message streaming, persistent session tracking, and proper context handling for multi-turn conversations.

This codebase is intended for handoff to [bolt.new](https://bolt.new), where the UI can be further enhanced or rebuilt using the existing API and chat logic.

---

## 🔧 Tech Stack

- Vite
- React + TypeScript
- Tailwind (optional)
- Custom chat hook with streaming and citation parsing

---

## 📁 Folder Structure

```
src/
├── api/
│   └── api.ts              # Chat API wrapper
├── hooks/
│   └── useChat.ts          # Chat logic, state, context handling
├── utils/
│   ├── citation.ts         # Strips citations like [file.pdf#page=3]
│   └── session.ts          # Persistent session_state via localStorage
├── Chat.tsx                # Basic UI to test chat flow
├── main.tsx                # Renders Chat component
└── index.css               # Global styles (Tailwind-compatible)
```

---

## 🚀 Getting Started

### Install dependencies

```bash
npm install
```

### Start the dev server

```bash
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) to view the app.

---

## 💬 How It Works

### ✅ Sending a Message

When the user sends a question:
- The `useChat()` hook collects the full conversation history (`[user, assistant]` pairs)
- Builds a `ChatAppRequest` payload
- Sends it to the backend via `chatApi()`
- Streams the assistant response using Server-Sent Events
- Strips out citations (e.g., `[filename.pdf#page=2]`) before displaying

---

## 📦 API Payload Format

Each request to the backend includes:

```ts
{
  messages: [
    { role: "user", content: "Hello" },
    { role: "assistant", content: "Hi, how can I help?" },
    { role: "user", content: "Tell me about your products" }
  ],
  session_state: "xxx-yyy-zzz",
  overrides: { ... } // from chatConfig.ts
}
```

> Note: `session_state` is generated in `utils/session.ts` and persists across visits.

---

## 🛠️ Bolt Handoff Notes

When building or redesigning the UI in Bolt:
- Use the `useChat()` hook to manage message flow
- Display messages from the `messages[]` array
- Input is sent via `sendMessage()`
- Streaming response is automatically handled

---

## 📌 TODO (Optional Enhancements)

- Style with Tailwind or custom design system
- Add avatar icons for user/bot
- Add error handling visuals
- Support citations or related links in future versions

---

## ✅ Maintainer

Tom Elliott  
GitHub: [github.com/tomelliott](https://github.com/tomelliott)


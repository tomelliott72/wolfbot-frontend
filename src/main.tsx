import React from "react";
import ReactDOM from "react-dom/client";
import Chat from "./Chat"; // Assuming Chat.tsx is in src/
import "./index.css"; // Optional, keep if using Tailwind or want base styles

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Chat />
  </React.StrictMode>
);


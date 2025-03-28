export function getOrCreateSessionId(): string {
    const key = "wolfbot_session_id";
    let sessionId = localStorage.getItem(key);
  
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      localStorage.setItem(key, sessionId);
    }
  
    return sessionId;
  }
  
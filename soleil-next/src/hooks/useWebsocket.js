import { useEffect, useRef, useState } from "react";

export const useWebSocket = (token) => {
  const wsRef = useRef(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!token) return;

    const ws = new WebSocket(`ws://localhost:3000/?token=${token}`);
    wsRef.current = ws;

    ws.addEventListener("open", () => { 
      console.log("Connected to WebSocket server");
    });

    ws.addEventListener("message", (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("Received WebSocket message:", data);
        setMessages((prev) => [...prev, data]);
      } catch (err) {
        console.error("Failed to parse WebSocket message:", err, event.data);
      }
    });

    ws.addEventListener("close", () => {
      console.log("Disconnected from WebSocket server");
    });

    ws.addEventListener("error", (err) => {
      console.error("WebSocket error:", err);
    });

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, [token]);

  const sendMessage = (message) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(message));
    }
  };

  return { messages, sendMessage };
};
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { DragDropProvider } from "@dnd-kit/react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DragDropProvider>
      <App />
    </DragDropProvider>
  </StrictMode>,
);

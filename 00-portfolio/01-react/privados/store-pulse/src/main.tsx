import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app/App.tsx";
import "./index.css";

const container = document.getElementById("root");

// Un fallo con nombre en vez de un `null` que revienta dentro de React con una traza
// que no señala a ningún archivo del proyecto.
if (!container) throw new Error("No se encontró el elemento #root en index.html");

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

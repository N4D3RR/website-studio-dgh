import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "@/app/App.jsx";
import "@/styles/index.css";

const root = document.getElementById("root");
const app = (
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>
);
if (root.querySelector("main")) hydrateRoot(root, app);
else createRoot(root).render(app);

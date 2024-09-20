import { StrictMode , createContext } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./var.css";
import "./global.css";
export const contactContext = createContext()

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    <contactContext.Provider>
      <App />
    </contactContext.Provider>
    </BrowserRouter>
  </StrictMode>
);

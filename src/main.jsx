import { StrictMode, createContext, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { api } from "./Services/config.js";
import App from "./App.jsx";
import "./var.css";
import "./global.css";

export const contactContext = createContext();

const Main = () => {
  const [contacts, setContacts] = useState([]);
  const [contact, setContact] = useState([]);

  useEffect(() => {
    api.get("/contacts").then(res => {
      console.log(res);
      setContacts(res.data); 
    });
  }, []);

  return (
    <contactContext.Provider value={{contacts , contact , setContact}}>
      <App />
    </contactContext.Provider>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  </StrictMode>
);

import { StrictMode, createContext, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./var.css";
import "./global.css";
export const contactContext = createContext();
const Main = () => {
  const [contacts, setContacts] = useState([]);
  const [contact, setContact] = useState([]);
  const [isEditing, setIsEditing ] = useState(false);
  const [alert, setAlert] = useState("");
  return (
    <contactContext.Provider value={{contacts , setContacts , contact , setContact,alert, setAlert , isEditing, setIsEditing}}>
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

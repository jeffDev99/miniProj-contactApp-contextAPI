import React, { useContext, useEffect , useState } from "react";
import { contactContext } from "../../main";
import styles from "./AddContact.module.css";
import inputes from "../../constants/inputes";
import { api } from "../../Services/config";
import Toast from "../Toast/Toast";

export default function AddContact({ updateHandler, isEditing, setIsEditing }) {
  const { contact, setContact, setAlert } = useContext(contactContext);
  const [showToast, setShowToast] = useState(false);
  const handleShowToast = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };
  useEffect(() => {
    setContact({
      fullname: "",
      email: "",
      phone: "",
    });
  }, [setContact]);

  const handleSaveChanges = () => {
    updateHandler(contact);
    setContact({
      id: "",
      fullname: "",
      email: "",
      phone: "",
    });
    setIsEditing(false);
  };

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setContact((contact) => ({ ...contact, [name]: value }));
  };

  const handleCancel = () => {
    setContact({
      id: "",
      fullname: "",
      email: "",
      phone: "",
    });
    setIsEditing(false);
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^(([^<>()[\\.,;:\s@"]+(\.[^<>()[\\.,;:\s@"]+)*)|.(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  };

  const addHandler = () => {
    if (!contact.fullname || !contact.email || !validateEmail(contact.email) || !contact.phone) {
      setAlert("Please enter valid data");
      return;
    }
    setAlert("");
    api.post("/contacts", {
      fullname: contact.fullname,
      email: contact.email,
      phone: contact.phone,
    });
    handleShowToast()
    setContact({
      id: "",
      fullname: "",
      email: "",
      phone: "",
    });
  };

  return (
    <div className={styles.AddEditContacts}>
      <h2>{isEditing ? "Edit Contacts" : "Add Contacts"}</h2>
      <div className="input-wrapper">
        {inputes.map((item) => (
          <input
            key={item.id}
            type={item.type}
            name={item.name}
            className="input"
            placeholder={item.placeholder}
            id={item.id}
            value={contact?.[item.name] || ""} // استفاده از optional chaining و مقدار پیش‌فرض
            onChange={changeHandler}
          />
        ))}
        {isEditing ? (
          <>
            <button type="button" className="btn btn-primary" onClick={handleSaveChanges}>
              Save Changes
            </button>
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
          </>
        ) : (
          <input type="button" value="Add Contact" className="inputBtn" onClick={addHandler} />
        )}
      </div>
      {showToast && <Toast message="Contact successfully added" duration={3000} onClose={() => setShowToast(false)} varient="success" />}
    </div>
  );
}

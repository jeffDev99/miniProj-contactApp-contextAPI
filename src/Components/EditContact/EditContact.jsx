import React, { useContext, useEffect, useState } from "react";
import { contactContext } from "../../main";
import { useNavigate } from "react-router-dom";
import styles from "./EditContact.module.css";
import inputes from "../../constants/inputes";
import { api } from "../../Services/config";
import Toast from "../Toast/Toast";

export default function EditContact() {
  const { contact, setContact, setAlert, isEditing, setIsEditing } = useContext(contactContext);
  const [showToast, setShowToast] = useState(false);
  const myNavigate = useNavigate();
  const handleShowToast = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };
  useEffect(() => {
    if (!isEditing) {
      myNavigate("/");
      return;
    }
    setContact({
      id: contact.id,
      fullname: contact.fullname,
      email: contact.email,
      phone: contact.phone,
    });
  }, [setContact]);

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
    myNavigate("/");
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^(([^<>()[\\.,;:\s@"]+(\.[^<>()[\\.,;:\s@"]+)*)|.(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  };

  const editHandler = () => {
    if (!contact.fullname || !contact.email || !validateEmail(contact.email) || !contact.phone) {
      setAlert("Please enter valid data");
      return;
    }
    setAlert("");
    api
      .put(`/contacts/${contact.id}`, {
        fullname: contact.fullname,
        email: contact.email,
        phone: contact.phone,
      })
      .then(() => {
        setContact({
          id: "",
          fullname: "",
          email: "",
          phone: "",
        });
        myNavigate("/")
      });
  };

  return (
    <div className={styles.AddEditContacts}>
      <h2>Edit Contacts</h2>
      <div className="input-wrapper">
        {inputes.map((item) => (
          <input key={item.id} type={item.type} name={item.name} className="input" placeholder={item.placeholder} id={item.id} value={contact?.[item.name] || ""} onChange={changeHandler} />
        ))}
        <>
          <button type="button" className="btn btn-primary" onClick={editHandler}>
            Save Changes
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </>
      </div>
      {showToast && <Toast message="Contact successfully added" duration={3000} onClose={() => setShowToast(false)} varient="success" />}
    </div>
  );
}

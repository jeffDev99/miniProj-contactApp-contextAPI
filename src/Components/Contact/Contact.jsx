import React, { useContext, useState, useEffect } from "react";
import { contactContext } from "../../main";
import Modal from "../Modal/Modal";
import styles from "./Contact.module.css";
import { api } from "../../Services/config";
import { useNavigate } from "react-router-dom";

export default function Contact() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [showBtns, setShowBtns] = useState({});
  const [selectedContacts, setSelectedContacts] = useState([]);
  const myNavigate = useNavigate();
  const { contacts, setContacts, contact,setContact , setIsEditing } = useContext(contactContext);

  

  useEffect(() => {
    api.get("/contacts").then((res) => {
      setContacts(res.data);
    });
  }, [isModalOpen,selectedContacts]);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".more-btn")) {
        setShowBtns({});
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const filteredContacts = contacts.filter((contact) => contact.fullname.toLowerCase().includes(searchQuery.toLowerCase()) || contact.email.toLowerCase().includes(searchQuery.toLowerCase()));
  const openModal = (item) => {
    setContactToDelete(item);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const handleDelete = () => {
    api.delete(`/contacts/${contactToDelete.id}`);
    setModalOpen(false);
  };
  const toggleButtons = (id) => {
    setShowBtns((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const startEditing = (item) => {
    setContact(item);
    setIsEditing(true);
    myNavigate("/editcontact");
  };

  const handleSelectContact = (id) => {
    setSelectedContacts((prev) =>
      prev.includes(id) ? prev.filter((contactId) => contactId !== id) : [...prev, id]
    );
  };
  const handleDeleteSelected = () => {
    selectedContacts.forEach((id) => {
      api.delete(`/contacts/${id}`);
    });
    setSelectedContacts([]); 
  };
  
  return (
    <>
      <h4 className={styles.subtitle}>{contacts.length} TOTAL</h4>
      <h2 className={styles.title}>Contacts</h2>
      <input type="text" placeholder="Search by name or email" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className={styles.formSearch} style={{ marginBottom: "1rem" }} />
      <button className={`btn btn-danger ${styles.deleteSelected}`} onClick={handleDeleteSelected} disabled={selectedContacts.length === 0}>
        Delete Selected Contacts 🗑
      </button>
      <div style={{ overflowX: "auto" }}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Select</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th style={{ width: "120px", alignItems: "center" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.length ? (
              filteredContacts.map((item) => (
                <tr key={item.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedContacts.includes(item.id)}
                      onChange={() => handleSelectContact(item.id)}
                    />
                  </td>
                  <td>{item.fullname}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: showBtns[item.id] ? "normal" : "center" }}>
                  {showBtns[item.id] ? (
                    <>
                      <button className="btn btn-danger" style={{ marginBottom: ".5rem" }} onClick={() => openModal(item)}>
                        Delete 🗑
                      </button>
                      <button className="btn btn-primary" onClick={() => startEditing(item)}>
                        Edit ✏️
                      </button>
                    </>
                  ) : (
                    <img src="/images/more.png" className={`${styles.contactIcon}`} onClick={() => toggleButtons(item.id)} />
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>
                <p className="alert alert-primary">No contact yet</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

    {/* Modal for single delete */}
    {isModalOpen && (
      <Modal onClose={closeModal}>
        <h3>Are you sure you want to delete this contact?</h3>
        <button onClick={handleDelete}>Yes</button>
        <button onClick={closeModal}>No</button>
      </Modal>
    )}
  </>
);
  
}

import React from "react";
import styles from "./Header.module.css";
import NavBar from "../NavBar/NavBar";
export default function Header() {
  return (
    <header className={styles.header}>
        <h2>Contact App</h2>
        <NavBar />
      <p>React js | json-server | React-router-dom</p>
    </header>
  );
}

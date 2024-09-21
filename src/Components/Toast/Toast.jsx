import React, { useEffect } from "react";
import styles from "./Toast.module.css";

const Toast = ({ message, duration, onClose , varient }) => {
    const varientClass = styles[varient]
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return <div className={`${styles.toast} ${varientClass}`}>{message}</div>;
};
export default Toast;

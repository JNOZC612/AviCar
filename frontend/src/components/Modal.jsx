import React from "react";
import styles from "../styles/Modal.module.css";
export default function Modal({ show, onClose, children, ...restProps }) {
    if (!show) {
        return null;
    }
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <button className={styles.closeButton} onClick={onClose}>X</button>
                <div className={styles.modalContent}>
                    {children}
                </div>
            </div>
        </div>
    );
};
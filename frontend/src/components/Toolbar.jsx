import React from "react";
import { Link } from 'react-router-dom';
import styles from '../styles/Toolbar.module.css'
export default function Toolbar({ refs }) {
    return (
        <div className={styles.toolbar}>
            <div className={styles.linkContainer}>
                <Link className={styles.anchorTitle} to="/">AviCar</Link>
            </div>
            <div className={styles.linkContainer}>
                {
                    refs.map((item, index) => (
                        <Link className={styles.anchor} key={index} to={item.ref}>{item.title}</Link>
                    ))
                }
            </div>

        </div>
    );
};
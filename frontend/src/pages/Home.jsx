import React from "react";
import Toolbar from "../components/Toolbar";
import styles from "../styles/Home.module.css";
export const Home = () => {
    const links = [{ ref: "/login", title: "Login" }, { ref: "/register", title: "Register" }];
    return (
        <div>
            <Toolbar refs={links} />
            <div className={styles.background} />
        </div>
    );
};
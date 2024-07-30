import React from "react";
//import defimage from "../assets/images/alien.svg";
import styles from "../styles/Toolbar.module.css";
export default function ProfileImage({ imageurl }) {
    //const imagesrc = imageurl || defimage;
    return (
        <div className={styles.circularImage}
            style={{ backgroundImage: `url(${imageurl})` }} />
    );
};
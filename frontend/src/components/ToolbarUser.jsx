import React from "react";
import styles from "../styles/Toolbar.module.css";
import { useSelector } from "react-redux";
import ProfileImage from "./ProfileImage";
import { useNavigate } from "react-router-dom";
import { clearUser } from "../features/user/userSlice";
import defimage from "../assets/images/alien.svg";
export default function ToolbarUser() {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.userInfo);
    const handleLogout = () => {
        if (user) {
            clearUser();
        }
        navigate('/');
    }
    return (
        <div className={styles.toolbar}>
            <div className={styles.linkContainer}>
                <div style={{ alignContent: "center", alignItems: "center", marginLeft: "20px" }}>
                    <ProfileImage imageurl={user ? user.image : defimage} />
                </div>
                <h2 className={styles.username}>{user ? user.name : "Sin sesion"}</h2>
                <div style={{display:"flex", justifyContent:"space-around"}}>
                    <h3 className={styles.username}>{user ? user.mail : "Correo"}</h3>
                    <h3 className={styles.username}>{user ? user.user : "Usuario"}</h3>
                </div>
            </div>
            <div>
                <div className={styles.anchor} onClick={handleLogout}>Cerrar Sesión</div>
            </div>

        </div>
    );
};
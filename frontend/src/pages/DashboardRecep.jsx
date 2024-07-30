import React/* , { useState }  */ from "react";
import { useSelector } from "react-redux";
import styles from "../styles/DashUser.module.css";
import ToolbarUser from "../components/ToolbarUser";
import ShowReservs from "../components/ShowReservs";
/* import TreeView from "../components/TreeView"; */

export default function DashboardRecep() {
    const user = useSelector((state) => state.user.userInfo);
    return (
        <div className={styles.app}>
            <ToolbarUser />
            <div className={styles.content}>
                <ShowReservs className={styles.mainContent} isLog={user ? true : false} />
            </div>
        </div>
    );
};
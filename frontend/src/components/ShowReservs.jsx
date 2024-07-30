import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "../styles/Table.module.css";
import Modal from "./Modal";
import Reservs from "./Reservs";
export default function ShowReservs({ isLog, ...restProps }) {
    const [users, setUsers] = useState(null);
    useEffect(() => {
        const apiurl = process.env.REACT_APP_API_URL + '/get-users-reserv';
        async function fetchUsers() {
            try {
                const response = await axios.get(apiurl);
                if (response.status === 200) setUsers(response.data.users);
                else if (response.status === 204) setUsers([]);
            } catch (error) { console.error("Error fetching users", error); }
        }
        if (isLog)
            fetchUsers();
    }, [isLog])
    const [showModal, setShowModal] = useState(false);
    const [mail, setMail] = useState('');
    function handleOpenModal(mail) { setMail(mail); setShowModal(true); }
    function handleCloseModal() { setMail(''); setShowModal(false); }
    return (
        <div {...restProps}>
            <div className={styles.title}><h2>Turistas en espera...</h2></div>
            {users === null ? (
                <p>Cargando...</p>
            ) : users.length > 0 ? (
                <table className={styles.table}>
                    <thead className={styles.thead}>
                        <tr>
                            <th className={styles.tableRowHead}>Nombre</th>
                            <th className={styles.tableRowHead}>Usuario</th>
                            <th className={styles.tableRowHead}>E-mail</th>
                            <th className={styles.tableRowHead}>Solicitudes</th>
                        </tr>
                    </thead>
                    <tbody className={styles.tbody}>
                        {users.map((user, index) => (
                            <tr key={index} className={index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd}>
                                <td className={styles.tableCell}>{user.name}</td>
                                <td className={styles.tableCell}>{user.user}</td>
                                <td className={styles.tableCell}>{user.mail}</td>
                                <td className={styles.tableCellButton}>
                                    <button className={styles.btnDel} onClick={() => { handleOpenModal(user.mail) }}>Ver</button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay usuarios en espera</p>
            )}
            <Modal onClose={handleCloseModal} show={showModal} children={<Reservs email={mail} />} />
        </div>
    );
};
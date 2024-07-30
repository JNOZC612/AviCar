import React, { useEffect, useState } from "react";
import styles from "../styles/Table.module.css";
import axios from "axios";
import Modal from "./Modal";
import History from "./History";

export default function ShowUser({ isLog, type, title, isAdmin, ...restProps }) {
    const [recepUsers, setRecepUsers] = useState(null);
    const [mail, setMail] = useState('');
    useEffect(() => {
        const apiurl = process.env.REACT_APP_API_URL + '/get-' + type;
        const fetchRecep = async () => {
            try {
                const response = await axios.get(apiurl);
                if (response.status === 200) setRecepUsers(response.data.users);
                else if (response.status === 204) setRecepUsers([]);

            } catch (error) {
                console.error('Error fetching ' + type + ' users: ', error);
            }
        };
        if (isLog)
            fetchRecep();

    }, [isLog, type]);
    const handleDelete = async (mail) => {
        try {
            const apiurl = process.env.REACT_APP_API_URL + '/delete-user';
            const response = await axios.delete(apiurl, { data: { mail } });
            if (response.status === 200) setRecepUsers(recepUsers.filter(user => user.mail !== mail));
            else alert("No se pudo encontrar al usuario para su eliminación");
        } catch (error) { console.error('Error eliminando al usuario: ', error); }
    }
    const [showModal, setShowModal] = useState(false);
    const handleOpenModal = (mail) => {
        setMail(mail);
        setShowModal(true);
    }
    const handleClosModal = () => {
        setMail('');
        setShowModal(false);
    }
    return (
        <div className={styles.treeContainer} {...restProps}>
            <div className={styles.title}><h2>{title}</h2></div>
            {recepUsers === null ? (
                <p>Cargando...</p>
            ) : recepUsers.length > 0 ? (
                <table className={styles.table}>
                    <thead className={styles.thead}>
                        <tr>
                            <th className={styles.tableRowHead}>Nombre</th>
                            <th className={styles.tableRowHead}>Usuario</th>
                            <th className={styles.tableRowHead}>E-mail</th>
                            <th className={styles.tableRowHead}>Contraseña</th>
                            {isAdmin && type !== "receps" && (
                                <th className={styles.tableRowHead}>Historial</th>
                            )}
                            <th className={styles.tableRowHead}>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody className={styles.tbody}>
                        {recepUsers.map((user, index) => (
                            <tr key={index} className={index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd}>
                                <td className={styles.tableCell}>{user.name}</td>
                                <td className={styles.tableCell}>{user.user}</td>
                                <td className={styles.tableCell}>{user.mail}</td>
                                <td className={styles.tableCell}>{user.pass}</td>
                                {isAdmin && type !== "receps" && (
                                    <td className={styles.tableCellButton}>
                                        <button className={styles.btnDel} onClick={() => { handleOpenModal(user.mail) }}>Ver</button>
                                    </td>
                                )}
                                <td className={styles.tableCellButton}>
                                    <button className={styles.btnDel} onClick={() => handleDelete(user.mail)}>Eliminar</button>
                                </td>
                            </tr>

                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay usuarios disponibles</p>
            )}
            {type !== "receps" && (
                <Modal onClose={handleClosModal} show={showModal} children={<History isLog={isLog} email={mail} />} />
            )}
        </div>
    );
}
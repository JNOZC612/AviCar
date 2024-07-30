import React, { useEffect, useState } from "react";
import styles from "../styles/Table.module.css";
import axios from "axios";
export default function ShowTravels({ isLog, isAdmin, handleSelectTravel, ...restProps }) {
    const [travels, setTravels] = useState(null);
    useEffect(() => {
        const apiurl = process.env.REACT_APP_API_URL + '/get-travels';
        const fetchTravels = async () => {
            try {
                const response = await axios.get(apiurl);
                if (response.status === 200) setTravels(response.data.travels);
                else if (response.status === 204) setTravels([]);
            } catch (error) { console.error('Error fetching tavels: ', error) }
        };
        if (isLog)
            fetchTravels();
    }, [isLog]);
    const handleDelete = async (agencia, origen, destino) => {
        try {
            const apiurl = process.env.REACT_APP_API_URL + '/delete-travel';
            const response = await axios.delete(apiurl, { data: { agencia: agencia, origen: origen, destino: destino } });
            if (response.status === 200) setTravels(travels.filter(travel => travel.agencia !== agencia || travel.origen !== origen || travel.destino !== destino));
        } catch (error) { console.error('Error elimando viaje: ', error); }
    }

    return (
        <div className={styles.treeContainer} {...restProps}>
            <div className={styles.title}><h2>Viajes</h2></div>
            {travels === null ? (
                <p>Cargando...</p>
            ) : travels.length > 0 ? (
                <table className={styles.table}>
                    <thead className={styles.thead}>
                        <tr>
                            <td className={styles.tableRowHead}>Agencia</td>
                            <td className={styles.tableRowHead}>Cd. Origen</td>
                            <td className={styles.tableRowHead}>Cd. Destino</td>
                            <td className={styles.tableRowHead}>Días</td>
                            <td className={styles.tableRowHead}>Précio</td>
                            {isAdmin ? (
                                <td className={styles.tableRowHead}>Eliminar</td>
                            ) : (
                                <td className={styles.tableRowHead}>Solicitar</td>
                            )}
                        </tr>
                    </thead>
                    <tbody className={styles.tbody}>
                        {travels.map((travel, index) => (
                            <tr key={index} className={index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd}>
                                <td className={styles.tableCell}>{travel.agencia}</td>
                                <td className={styles.tableCell}>{travel.origen}</td>
                                <td className={styles.tableCell}>{travel.destino}</td>
                                <td className={styles.tableCell}>{travel.dias}</td>
                                <td className={styles.tableCell}>{travel.precio}</td>
                                {isAdmin ? (
                                    <td className={styles.tableCellButton}>
                                        <button className={styles.btnDel} onClick={() => handleDelete(travel.agencia, travel.origen, travel.destino)}>Eliminar</button>
                                    </td>
                                ) : (
                                    <td className={styles.tableCellButton}>
                                        <button className={styles.btnDel} onClick={() => handleSelectTravel(travel)}>Solicitar</button>
                                    </td>
                                )}

                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay viajes que mostrar</p>
            )
            }
        </div >
    );
};
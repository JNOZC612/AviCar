import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "../styles/Table.module.css";
export default function Reservs({ email, ...restProps }) {
    const [cars, setCars] = useState(null);
    const [vuelos, setVuelos] = useState(null);
    useEffect(() => {
        const apiurl = process.env.REACT_APP_API_URL + '/reservs-user';
        async function fetchReservs() {
            try {
                const response = await axios.post(apiurl, { data: { mail: email } });
                if (response.status === 200) {
                    setCars(response.data.cars || []);
                    setVuelos(response.data.vuelos || []);
                } else if (response.status === 204) { setCars([]); setVuelos([]); }
            } catch (error) { console.error('Error fetching reservs', error); }
        }
        fetchReservs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [email]);
    async function handleStateCar(state, placa) {
        const apiurl = process.env.REACT_APP_API_URL + '/aprove-car';
        var aprovado = false;
        var rechazado = false;
        if (state) aprovado = true;
        else rechazado = true;
        const data = { placa, aprovado, rechazado, email }
        try {
            const response = await axios.post(apiurl, data);
            if (response.status !== 200) alert(`ERROR: ${JSON.stringify(response)}`);
            else if (response.status === 200) setCars(cars.filter(car => car.car.placa !== placa));
        } catch (error) { console.error("Error al enviar cambios", error); }
    }
    async function handleStateTravel(state, agencia, origen, destino) {
        const apiurl = process.env.REACT_APP_API_URL + '/aprove-travel';
        var aprovado = false;
        var rechazado = false;
        if (state) aprovado = true;
        else rechazado = true;
        const data = { agencia, origen, destino, aprovado, rechazado, email }
        try {
            const response = await axios.post(apiurl, data);
            if (response.status !== 200) alert(`ERROR: ${JSON.stringify(response)}`);
            else if (response.status === 200) {
                setVuelos(vuelos.filter(vuelo => vuelo.agencia !== agencia || vuelo.origen !== origen || vuelo.destino !== destino));
            }
        } catch (error) { console.log("Error al enviar cambios", error); }
    }
    return (
        <div style={{ maxHeight: "70vh", overflow: "scroll" }} {...restProps}>
            <div className={styles.treeContainer}>
                <div className={styles.title}><h2>Autos solicitados</h2></div>
                {cars === null ? (
                    <p>Cargando...</p>
                ) : cars.length > 0 ? (
                    <table className={styles.table}>
                        <thead className={styles.thead}>
                            <tr>
                                <th className={styles.tableRowHead}>Agencia</th>
                                <th className={styles.tableRowHead}>Marca</th>
                                <th className={styles.tableRowHead}>Placa</th>
                                <th className={styles.tableRowHead}>Modelo</th>
                                <th className={styles.tableRowHead}>Aprobar</th>
                                <th className={styles.tableRowHead}>Rechazar</th>
                            </tr>
                        </thead>
                        <tbody className={styles.tbody}>
                            {cars.map((car, index) => (
                                <tr key={index} className={index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd}>
                                    <td className={styles.tableCell}>{car.car.agencia}</td>
                                    <td className={styles.tableCell}>{car.car.marca}</td>
                                    <td className={styles.tableCell}>{car.car.placa}</td>
                                    <td className={styles.tableCell}>{car.car.modelo}</td>
                                    <td className={styles.tableCellButton}>
                                        <button className={styles.btnDel} onClick={() => { handleStateCar(true, car.car.placa) }}>Aprobar</button>
                                    </td>
                                    <td className={styles.tableCellButton}>
                                        <button className={styles.btnDel} onClick={() => { handleStateCar(false, car.car.placa) }}>Rechazar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No hay carros solicitados</p>
                )}
            </div>
            <div className={styles.treeContainer} style={{ marginTop: "30px" }}>
                <div className={styles.title}><h2>Vuelos solicitados</h2></div>
                {vuelos === null ? (
                    <p>Cargando...</p>
                ) : vuelos.length > 0 ? (
                    <table className={styles.table}>
                        <thead className={styles.thead}>
                            <tr>
                                <th className={styles.tableRowHead}>Agencia</th>
                                <th className={styles.tableRowHead}>Origen</th>
                                <th className={styles.tableRowHead}>Destino</th>
                                <th className={styles.tableRowHead}>Aprovar</th>
                                <th className={styles.tableRowHead}>Rechazar</th>
                            </tr>
                        </thead>
                        <tbody className={styles.tbody}>
                            {vuelos.map((vuelo, index) => (
                                <tr key={index} className={index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd}>
                                    <td className={styles.tableCell}>{vuelo.agencia}</td>
                                    <td className={styles.tableCell}>{vuelo.origen}</td>
                                    <td className={styles.tableCell}>{vuelo.destino}</td>
                                    <td className={styles.tableCellButton}>
                                        <button className={styles.btnDel} onClick={() => { handleStateTravel(true, vuelo.agencia, vuelo.origen, vuelo.destino) }}>Aprovar</button>
                                    </td>
                                    <td className={styles.tableCellButton}>
                                        <button className={styles.btnDel} onClick={() => { handleStateTravel(false, vuelo.agencia, vuelo.origen, vuelo.destino) }}>Rechazar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No hay vuelos solicitados</p>
                )}
            </div>
        </div>
    );
};
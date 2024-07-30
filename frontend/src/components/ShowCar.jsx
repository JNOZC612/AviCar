import React, { useEffect, useState } from "react";
import styles from "../styles/Table.module.css";
import axios from "axios";
export default function ShowCar({ isLog, isAdmin, handleSelectCar, ...restProps }) {
    const [cars, setCars] = useState(null);
    useEffect(() => {
        const apiurl = process.env.REACT_APP_API_URL + '/get-cars';
        async function fetchCars() {
            try {
                const response = await axios.get(apiurl);
                if (response.status === 200) setCars(response.data.cars);
                else if (response.status === 204) setCars([]);
            } catch (error) { console.error('Error fetching cars', error) }
        }
        if (isLog)
            fetchCars();
    }, [isLog]);
    async function handleDelete(placa) {
        try {
            const apiurl = process.env.REACT_APP_API_URL + '/delete-car';
            const response = await axios.delete(apiurl, { data: { placa: placa } });
            if (response.status === 200) setCars(cars.filter(car => car.placa !== placa));
        } catch (error) { console.error('Error eliminando vehículo: ', error); }
    }

    return (
        <div className={styles.treeContainer} {...restProps}>
            <div className={styles.title}><h2>Autos</h2></div>
            {cars === null ? (
                <p>Cargando...</p>
            ) : cars.length > 0 ? (
                <table className={styles.table}>
                    <thead className={styles.thead}>
                        <tr>
                            <td className={styles.tableRowHead}>Agencia</td>
                            <td className={styles.tableRowHead}>Marca</td>
                            <td className={styles.tableRowHead}>Placa</td>
                            <td className={styles.tableRowHead}>Modelo</td>
                            <td className={styles.tableRowHead}>Precio</td>
                            <td className={styles.tableRowHead}>Ubicación</td>
                            <td className={styles.tableRowHead}>Ocupado</td>
                            {isAdmin ? (
                                <td className={styles.tableRowHead}>Eliminar</td>
                            ) : (
                                <td className={styles.tableRowHead}>Solicitar</td>
                            )}

                        </tr>
                    </thead>
                    <tbody className={styles.tbody}>
                        {cars.map((car, index) => (
                            <tr key={index} className={index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd}>
                                <td className={styles.tableCell}>{car.agencia}</td>
                                <td className={styles.tableCell}>{car.marca}</td>
                                <td className={styles.tableCell}>{car.placa}</td>
                                <td className={styles.tableCell}>{car.modelo}</td>
                                <td className={styles.tableCell}>{car.precio}</td>
                                <td className={styles.tableCell}>{car.ubicacion}</td>
                                <td className={styles.tableCell}>{car.ocupado ? "Ocupado" : "Disponible"}</td>
                                {isAdmin ? (
                                    <td className={styles.tableCellButton}>
                                        <button className={styles.btnDel} onClick={() => handleDelete(car.placa)}>Eliminar</button>
                                    </td>
                                ) : (
                                    <td className={styles.tableCellButton}>
                                        <button className={styles.btnDel} onClick={() => handleSelectCar(car.placa)}>Solicitar</button>
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
import React, { useState } from "react";
import styles from "../styles/Login.module.css";
import axios from "axios";
export default function RegisterCar({ isLog, ...restProps }) {
    const refs = {
        refAgencia: null,
        refMarca: null,
        refPlaca: null,
        refModelo: null,
        refPrecio: null,
        refUbicacion: null
    }
    const [agencia, setAgencia] = useState('');
    const [marca, setMarca] = useState('');
    const [placa, setPlaca] = useState('');
    const [modelo, setModelo] = useState('');
    const [precio, setPrecio] = useState(0);
    const [ubicacion, setUbicacion] = useState('');
    const [msgAgencia, setMsgAgencia] = useState('');
    const [msgMarca, setMsgMarca] = useState('');
    const [msgPlaca, setMsgPlaca] = useState('');
    const [msgModelo, setMsgModelo] = useState('');
    const [msgPrecio, setMsgPrecio] = useState(0);
    const [msgUbicacion, setMsgUbicacion] = useState('');
    function validateAgencia(val) {
        setAgencia(val);
        if (val.length > 0) setMsgAgencia('');
        else setMsgAgencia('Este campo es obligatorio');
    }
    function validateMarca(val) {
        setMarca(val);
        if (val.length > 0) setMsgMarca('');
        else setMsgMarca('Este campo es obligatorio');
    }
    function validatePlaca(val) {
        setPlaca(val);
        if (val.length > 0) setMsgPlaca('');
        else setMsgPlaca('Este campo es obligatorio');
    }
    function validateModelo(val) {
        setModelo(val);
        if (val.length > 0) setMsgModelo('');
        else setMsgModelo('Este campo es obligatorio');
    }
    function validatePrecio(val) {
        setPrecio(val);
        if (val.length > 0 && val > 0) setMsgPrecio('');
        else setMsgPrecio('Este campo es obligatorio y debe ser un valor numérico mayor a 0');
    }
    function validateUbicacion(val) {
        setUbicacion(val);
        if (val.length > 0) setMsgUbicacion('');
        else setMsgUbicacion('Este campo es obligatorio');
    }
    function changeAgencia(e) {
        const val = e.target.value;
        validateAgencia(val);
    }
    function changeMarca(e) {
        const val = e.target.value;
        validateMarca(val);
    }
    function changePlaca(e) {
        const val = e.target.value;
        validatePlaca(val);
    }
    function changeModelo(e) {
        const val = e.target.value;
        validateModelo(val);
    }
    function changePrecio(e) {
        const val = e.target.value;
        validatePrecio(val);
    }
    function changeUbicacion(e) {
        const val = e.target.value;
        validateUbicacion(val);
    }
    async function handleSubmit() {
        validateAgencia(agencia);
        validateMarca(marca);
        validatePlaca(placa);
        validateModelo(modelo);
        validatePrecio(precio);
        validateUbicacion(ubicacion);
        if (agencia === '' || msgAgencia !== '') refs.refAgencia.current.focus();
        else if (marca === '' || msgMarca !== '') refs.refMarca.current.focus();
        else if (placa === '' || msgMarca !== '') refs.refPlaca.current.focus();
        else if (!precio || precio === '' || precio <= 0 || msgPrecio !== '') refs.refPrecio.current.focus();
        else if (ubicacion === '' || msgUbicacion !== '') refs.refUbicacion.current.focus();
        else {
            try {
                const vals = {
                    agencia: agencia,
                    marca: marca,
                    placa: placa,
                    modelo: modelo,
                    precio: precio,
                    ubicacion: ubicacion,
                };
                const apiurl = process.env.REACT_APP_API_URL + '/register-car';
                const response = await axios.post(apiurl, vals);
                if (response.status !== 200) {
                    if (response.status === 204) alert("Ya hay un vehículo con esta placa")
                    else alert("Error al registrar vehículo");
                } else {
                    setAgencia('');
                    setMarca('');
                    setPlaca('');
                    setModelo('');
                    setPrecio(0);
                    setUbicacion('');
                }
            } catch (error) {
                console.error("Error al enviar la solicitud: ", error);
            }
        }
    }
    return (
        <div className={styles.body} {...restProps}>
            <div className={styles.formContainer}>
                <h2 className={styles.formTitle}>Registro de Vehículo</h2>
                <div className={styles.form}>
                    <div className={styles.group}>
                        <div className={styles.groupTitle}>Información de Vehícualo</div>
                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="agencia">Agencia</label>
                            <input onChange={changeAgencia} value={agencia} ref={refs.refAgencia} className={styles.inputField} type="text" id="agencia" />
                            {msgAgencia && (<div className={styles.ballon}><div className={styles.alert}>{msgAgencia}</div></div>)}
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="marca">Marca</label>
                            <input onChange={changeMarca} value={marca} ref={refs.refMarca} className={styles.inputField} type="text" id="marca" />
                            {msgMarca && (<div className={styles.ballon}><div className={styles.alert}>{msgMarca}</div></div>)}
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="placa">Placa</label>
                            <input onChange={changePlaca} value={placa} ref={refs.refPlaca} className={styles.inputField} type="text" id="placa" />
                            {msgPlaca && (<div className={styles.ballon}><div className={styles.alert}>{msgPlaca}</div></div>)}
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="modelo">Modelo</label>
                            <input onChange={changeModelo} value={modelo} ref={refs.refModelo} className={styles.inputField} type="text" id="modelo" />
                            {msgModelo && (<div className={styles.ballon}><div className={styles.alert}>{msgModelo}</div></div>)}
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="precio">Precio</label>
                            <input onChange={changePrecio} value={precio} ref={refs.refPrecio} className={styles.inputField} type="number" id="precio" />
                            {msgPrecio && (<div className={styles.ballon}><div className={styles.alert}>{msgPrecio}</div></div>)}
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="ubicacion">Ubicaciíon</label>
                            <input onChange={changeUbicacion} value={ubicacion} ref={refs.refUbicacion} className={styles.inputField} type="text" id="ubicacion" />
                            {msgUbicacion && (<div className={styles.ballon}><div className={styles.alert}>{msgUbicacion}</div></div>)}
                        </div>
                    </div>
                </div>
                <div className={styles.formSubmit}>
                    {isLog && (
                        <button className={styles.buttonSubmit} onClick={handleSubmit}>Registrar Carro</button>
                    )}
                </div>
            </div>
        </div>
    );
}
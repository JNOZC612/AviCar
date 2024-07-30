import React, { useState } from "react";
import styles from "../styles/Login.module.css";
import axios from "axios";
export default function RegisterTravel({ isLog }) {
    const [agencia, setAgencia] = useState('');
    const [origen, setOrigen] = useState('');
    const [destino, setDestino] = useState('');
    const [dias, setDias] = useState('');
    const [precio, setPrecio] = useState('');
    const [msgAgencia, setMsgAgencia] = useState('');
    const [msgOrigen, setMsgOrigen] = useState('');
    const [msgDestino, setMsgDestino] = useState('');
    const [msgDias, setMsgDias] = useState(0);
    const [msgPrecio, setMsgPrecio] = useState(0);
    const validateAgencia = (val) => {
        if (val.length < 1) setMsgAgencia('Este campo es obligatorio');
        else setMsgAgencia('');
    }
    const validateOrigen = (val) => {
        if (val.length < 1) setMsgOrigen('Este campo es obligatorio');
        else setMsgOrigen('');
    }
    const validateDestino = (val) => {
        if (val.length < 1) setMsgDestino('Este campo es obligatorio');
        else setMsgDestino('');
    }
    const validateDias = (val) => {
        if (val <= 0) setMsgDias('El valor debe ser positivo mayor a 0');
        else setMsgDias('');
    }
    const validatePrecio = (val) => {
        if (val <= 0) setMsgPrecio('El valor debe ser positivo mayor a 0');
        else setMsgPrecio('');
    }
    const handleAgencia = (e) => {
        const val = e.target.value;
        setAgencia(val);
        validateAgencia(val);
    }
    const handleOrigen = (e) => {
        const val = e.target.value;
        setOrigen(val);
        validateOrigen(val);
    }
    const handleDestino = (e) => {
        const val = e.target.value;
        setDestino(val);
        validateDestino(val);
    }
    const handleDias = (e) => {
        const val = e.target.value;
        setDias(val);
        validateDias(val);
    }
    const handlePrecio = (e) => {
        const val = e.target.value;
        setPrecio(val);
        validatePrecio(val);
    }

    const refs = {
        rfAge: null,
        rfOri: null,
        rfDes: null,
        rfDia: null,
        rfPre: null,
    };
    async function handleSubmit() {
        validateAgencia(agencia);
        validateOrigen(origen);
        validateDestino(destino);
        validateDias(dias);
        validatePrecio(precio);
        if (agencia === '' || msgAgencia !== '') refs.rfAge.current.focus();
        else if (origen === '' || msgOrigen !== '') refs.rfOri.current.focus();
        else if (destino === '' || msgDestino !== '') refs.rfDes.current.focus();
        else if (dias <= 0 || msgDias !== '') refs.rfDia.current.focus();
        else if (precio <= 0 || msgPrecio !== '') refs.rfPre.current.focus();
        else {
            try {
                const vals = {
                    agencia: agencia,
                    origen: origen,
                    destino: destino,
                    dias: dias,
                    precio: precio,
                };
                const apiurl = process.env.REACT_APP_API_URL + '/register-travel';
                const response = await axios.post(apiurl, vals);
                if (response.status !== 200) {
                    alert("Error al registrar Viaje");
                } else {
                    setAgencia('');
                    setOrigen('');
                    setDestino('');
                    setDias(0);
                    setPrecio(0);
                }
            } catch (error) {
                console.error("Error al enviar la solicitus:", error)
            }
        }
    }
    return (
        <nav className={styles.body}>
            <div className={styles.formContainer}>
                <h2 className={styles.formTitle}>Registro de Viajes</h2>
                <div className={styles.form}>
                    <div className={styles.group}>
                        <div className={styles.groupTitle}>Infomación de viaje</div>
                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="agencia">Nombre de Agencia</label>
                            <input ref={refs.rfAge} onChange={handleAgencia} value={agencia} className={styles.inputField} type="text" id="agencia" />
                            {msgAgencia && <div className={styles.ballon}><div className={styles.alert}>{msgAgencia}</div></div>}
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="origen" className={styles.label}>Ciudad de origen</label>
                            <input ref={refs.rfOri} onChange={handleOrigen} value={origen} type="text" id="origen" className={styles.inputField} />
                            {msgOrigen && <div className={styles.ballon}><div className={styles.alert}>{msgOrigen}</div></div>}
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="destino" className={styles.label}>Ciudad de destino</label>
                            <input ref={refs.rfDes} onChange={handleDestino} value={destino} type="text" id="destino" className={styles.inputField} />
                            {msgDestino && <div className={styles.ballon}><div className={styles.alert}>{msgDestino}</div></div>}
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="dias" className={styles.label}>Días de viaje</label>
                            <input ref={refs.rfDia} onChange={handleDias} value={dias} type="number" id="dias" className={styles.inputField} />
                            {msgDias && <div className={styles.ballon}><div className={styles.alert}>{msgDias}</div></div>}
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="precio" className={styles.label}>Precio de viaje</label>
                            <input ref={refs.rfPre} onChange={handlePrecio} value={precio} type="number" id="precio" className={styles.inputField} />
                            {msgPrecio && <div className={styles.ballon}><div className={styles.alert}>{msgPrecio}</div></div>}
                        </div>
                    </div>
                </div>
                <div className={styles.formSubmit}>
                    {isLog && (
                        <button className={styles.buttonSubmit} onClick={handleSubmit}>Registrar Viaje</button>
                    )}
                </div>
            </div>
        </nav>
    );
}
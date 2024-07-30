import React, { useState } from "react";
import styles from "../styles/Login.module.css";
import { ButtonPassword } from "../utils/ComponentsWithStaticFile";
import Toolbar from "../components/Toolbar";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { setUser } from '../features/user/userSlice';
export default function Login() {
    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');
    const [isVisiblePassword, setVisiblePassword] = useState(false);
    const links = [{ ref: "/register", title: "Registrarme" }];
    const refs = {
        rfUser: null,
        rfPass: null,
    };
    const [msgUser, setMsgUser] = useState('');
    const [msgPass, setMsgPass] = useState('');
    const validateUser = (val) => {
        if (val.length < 1) setMsgUser('Este campo es obligatorio');
        else setMsgUser('');
    }
    const validatePass = (val) => {
        if (val.length < 1) setMsgPass('Este campo es obligatorio');
        else setMsgPass('');
    }
    const handleUser = (e) => {
        const val = e.target.value;
        setUsername(val);
        validateUser(val);
    }
    const handlePass = (e) => {
        const val = e.target.value;
        setPass(val);
        validatePass(val);
    }
    const handleClickVisiblePassword = () => setVisiblePassword(!isVisiblePassword);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    async function handleSubmit() {
        try {
            const vals = {
                usermail: username,
                pass: pass
            };
            const apiurl = process.env.REACT_APP_API_URL + '/login';
            const response = await axios.post(apiurl, vals);
            if (response.status === 200) {
                dispatch(setUser(response.data.user));
                if (response.data.user["typu"] === "admin") navigate('/dashboard/admin');
                else if (response.data.user["typu"] === "recep") navigate('/dashboard/recep');
                else navigate('/dashboard');
            } else alert('Cuenta no encontrada');
        } catch (error) {
            console.error('Error al realizar petición: ', error.message);
            alert('Error al intentar iniciar sesión');
        }
    };
    return (
        <div style={{ width: "100%", height: "100%", display: "relative" }}>
            <Toolbar refs={links} />
            <nav className={styles.body}>
                <div className={styles.formContainer}>
                    <h2 className={styles.formTitle}>Inicio de sesión</h2>
                    <div className={styles.form}>
                        <div className={styles.group}>
                            <div className={styles.groupTitle}>Información de usuario</div>
                            <div className={styles.formGroup}>
                                <label htmlFor="user" className={styles.label}>Usuario o Email</label>
                                <input className={styles.inputField} onChange={handleUser} value={username} ref={refs.rfUser} type="text" id="user" />
                                {msgUser && <div className={styles.ballon}><div className={styles.alert}>{msgUser}</div></div>}
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="pass" className={styles.label}>Contraseña</label>
                                <div className={styles.passwordGroup}>
                                    <input type={isVisiblePassword ? 'text' : 'password'} ref={refs.rfPass} value={pass} onChange={handlePass} className={styles.inputPassword} />
                                    <div className={styles.buttonBackground}>
                                        <ButtonPassword onClick={handleClickVisiblePassword} $visible={isVisiblePassword} />
                                    </div>
                                </div>
                                {msgPass && <div className={styles.ballon}><div className={styles.alert}>{msgPass}</div> </div>}
                            </div>
                        </div>
                    </div>
                    <div className={styles.formSubmit}>
                        <button className={styles.buttonSubmit} onClick={handleSubmit}>Iniciar Sesión</button>
                    </div>
                </div>
            </nav>
        </div>
    );
};
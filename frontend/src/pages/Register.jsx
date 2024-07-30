import React, { useRef, useState } from "react";
import Toolbar from "../components/Toolbar";
import styles from '../styles/Login.module.css';
import { ButtonPassword } from "../utils/ComponentsWithStaticFile";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
export default function Register() {
    const [isVisiblePassword, setVisiblePassword] = useState(false);
    const [isVisibleConfirm, setVisibleConfirm] = useState(false);
    const links = [{ ref: "/login", title: "Inicio de Sesión" }];
    const [name, setName] = useState('');
    const [user, setUser] = useState('');
    const [mail, setMail] = useState('');
    const [pass, setPass] = useState('');
    const [conf, setConf] = useState('');
    const [image, setImage] = useState(null);
    const [msgName, setMsgName] = useState('');
    const [msgUser, setMsgUser] = useState('');
    const [msgMail, setMsgMail] = useState('');
    const [msgPass, setMsgPass] = useState('');
    const [msgConf, setMsgConf] = useState('');
    const refs = {
        rfName: useRef(null),
        rfUser: useRef(null),
        rfMail: useRef(null),
        rfPass: useRef(null),
        rfConf: useRef(null),
        rfImag: useRef(null),
    }
    const validateName = (val) => {
        if (val.length < 1) setMsgName('Este campo es obligatorio')
        else setMsgName('')
    };
    const validateUser = (val) => {
        if (val.length < 1) setMsgUser('Este campo es obligatorio')
        else setMsgUser('')
    };
    const validateEmail = (val) => {
        const regex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        if (val.length < 1) setMsgMail('Este campo es obligatorio')
        else if (!regex.test(val)) setMsgMail('Dirección de correo no valida')
        else setMsgMail('')
    };
    const validatePassword = (pass, conf) => {
        const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[.,\-_@#%&$])[A-Za-z\d.,\-_@#%&$]+$/
        if (pass.length < 8 && !regex.test(pass)) {
            setMsgPass(`* Debe tener al menos 8 caracteres (${pass.length})\n* Debe tener al menos 1 caracter especial (., -, _, @, #, %, &, $)\n* Debe tener al menos 1 numero\n* Debe tener al menos una mayúscula`);
            setMsgConf('Contraseña invalida');
        } else if (pass.length < 8) {
            setMsgPass(`* Debe tener al menos 8 caracteres (${pass.length})`);
            setMsgConf('Contraseña invalida');
        } else if (!regex.test(pass)) {
            setMsgPass('* Debe tener al menos 1 caracter especial (., -, _, @, #, %, &, $)\n* Debe tener al menos 1 numero\n* Debe tener al menos una mayúscula');
            setMsgConf('Contraseña invalida');
        } else if (conf !== pass) {
            setMsgConf('Las contraseñas no coinciden');
            setMsgPass('');
        } else {
            setMsgPass('');
            setMsgConf('');
        }
    };
    const validateImage = (file) => {
        if (file && file.type.startsWith('image/')) setImage(file);
        else alert("Por favor, seleccione un archivo de imagen válido");
    }
    const handleName = (e) => {
        const val = e.target.value;
        setName(val);
        validateName(val);
    };
    const handleUser = (e) => {
        const val = e.target.value;
        setUser(val);
        validateUser(val);
    };
    const handleEmail = (e) => {
        const val = e.target.value;
        setMail(val);
        validateEmail(val);
    };
    const handlePassword = (e) => {
        const val = e.target.value;
        setPass(val);
        validatePassword(val, conf);
    };
    const handleConfirm = (e) => {
        const val = e.target.value;
        setConf(val);
        validatePassword(pass, val);
    };
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        validateImage(file)
    }
    const navigate = useNavigate();
    const handleClickVisiblePassword = () => setVisiblePassword(!isVisiblePassword);
    const handleClickVisibleConfirm = () => setVisibleConfirm(!isVisibleConfirm);
    async function handleClickSubmit() {
        validateName(name);
        validateUser(user);
        validateEmail(mail);
        validatePassword(pass, conf);
        validateImage(image);
        if (name === '' || msgName !== '') refs.rfName.current.focus();
        else if (user === '' || msgUser !== '') refs.rfUser.current.focus();
        else if (mail === '' || msgMail !== '') refs.rfMail.current.focus();
        else if (image == null) refs.rfImag.current.focus();
        else if (pass === '' || msgPass !== '') refs.rfPass.current.focus();
        else if (conf === '' || msgConf !== '') refs.rfConf.current.focus();
        else {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("user", user);
            formData.append("mail", mail);
            formData.append("pass", pass);
            formData.append("image", image);
            try {
                const apiurl = process.env.REACT_APP_API_URL + '/register';
                const response = await axios.post(apiurl, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                });
                if (response.status !== 200) {
                    if (response.status === 204) {
                        alert("El correo|usuario ya está asociado a otra cuenta");
                    } else {
                        alert("Error al registrar usuario")
                    }
                } else {
                    console.log('Response: ', response.data);
                    setName('');
                    setUser('');
                    setMail('');
                    setPass('');
                    setConf('');
                    setImage(null);
                    navigate('/login');
                }
            } catch (error) {
                console.error('Error al enviar la solicitud: ', error.message);
            }
        }
    };
    return (
        <div style={{ width: "100%", height: "100%", display: "relative" }}>
            <Toolbar refs={links} />
            <nav className={styles.body}>
                <div className={styles.formContainer}>
                    <h2 className={styles.formTitle}>Registro de usuario</h2>
                    <div className={styles.form}>
                        <div className={styles.group}>
                            <div className={styles.groupTitle}>Información de Usuario</div>
                            <div className={styles.formGroup}>
                                <label htmlFor="name" className={styles.label}>Nombre Completo</label>
                                <input ref={refs.rfName} value={name} onChange={handleName} type="text" id="name" className={styles.inputField} />
                                {msgName && <div className={styles.ballon}><div className={styles.Alert}>{msgName}</div></div>}
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label} htmlFor="usuario">Usuario</label>
                                <input ref={refs.rfUser} value={user} onChange={handleUser} type="text" id="usuario" className={styles.inputField} />
                                {msgUser && <div className={styles.ballon}><div className={styles.Alert}>{msgUser}</div></div>}
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label} htmlFor="mail">Correo electrónico</label>
                                <input ref={refs.rfMail} value={mail} onChange={handleEmail} type="text" id="mail" className={styles.inputField} />
                                {msgMail && <div className={styles.ballon}><div className={styles.Alert}>{msgMail}</div></div>}
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="file-1" className={styles.label}>Foto de perfil</label>
                                <div className={styles.containerInput}>
                                    <input onChange={handleImageChange} ref={refs.rfImag} type="file" name="file-1" id="file-1" className={styles.inputfile} accept="image/*" />
                                    <label htmlFor="file-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className={styles.iborrainputfile} width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"></path></svg>
                                        <span className={styles.iborrainputfile}>{image ? image.name : "Seleccionar archivo"}</span>
                                    </label>
                                </div>
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="pass" className={styles.label}>Contraseña</label>
                                <div className={styles.passwordGroup}>
                                    <input ref={refs.rfPass} type={isVisiblePassword ? 'text' : 'password'} value={pass} onChange={handlePassword} id="pass" className={styles.inputPassword} />
                                    <div className={styles.buttonBackground}>
                                        <ButtonPassword onClick={handleClickVisiblePassword} $visible={isVisiblePassword} />
                                    </div>
                                </div>
                                {msgPass && <div className={styles.ballon}><div className={styles.Alert}>{msgPass}</div></div>}
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="confirm" className={styles.label}>Contraseña</label>
                                <div className={styles.passwordGroup}>
                                    <input ref={refs.rfConf} type={isVisibleConfirm ? 'text' : 'password'} value={conf} onChange={handleConfirm} id="confirm" className={styles.inputPassword} />
                                    <div className={styles.buttonBackground}>
                                        <ButtonPassword onClick={handleClickVisibleConfirm} $visible={isVisibleConfirm} />
                                    </div>

                                </div>
                                {msgConf && <div className={styles.ballon}><div className={styles.Alert}>{msgConf}</div></div>}
                            </div>
                        </div>
                    </div>
                    <div className={styles.formSubmit}>
                        <button className={styles.buttonSubmit} onClick={handleClickSubmit}>Registrarme</button>
                    </div>
                </div>
            </nav>
        </div>

    );
};
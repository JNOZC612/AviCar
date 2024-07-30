import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "../styles/DashUser.module.css";
import ToolbarUser from "../components/ToolbarUser";
import TreeView from "../components/TreeView";
import ShowTravels from "../components/ShowTravels";
import ShowCar from "../components/ShowCar";
import History from "../components/History";
import axios from "axios";
export default function DashboardUser() {
    const data = [
        {
            id: 1,
            label: "Ver Vuelos"
        }, {
            id: 2,
            label: "Ver Autos"
        }, {
            id: 3,
            label: "Ver Solicitudes"
        }
    ]
    const user = useSelector((state) => state.user.userInfo);
    const [selectedNode, setSelectedNode] = useState(null);
    async function changeTravelState(travel) {
        const data = {
            agencia: travel.agencia,
            origen: travel.origen,
            destino: travel.destino,
            user: user.user,
        }
        try {
            const apiurl = process.env.REACT_APP_API_URL + '/travel-user';
            const response = await axios.post(apiurl, data);
            if (response.status === 200) { console.log("viaje solicitado"); }
            else { console.log("No se ha encontrado usuario"); }
        } catch (error) { console.error('Error solicitando viaje:', error); }
    }
    async function changeCarState(placa) {
        const data = {
            placa: placa,
            user: user.user,
        };
        try {
            const apiurl = process.env.REACT_APP_API_URL + '/car-user';
            const response = await axios.post(apiurl, data);
            if (response.status === 200) console.log("Carro solicitado");
            else console.log("No se ha encontrado usuario");
        } catch (error) {
            console.error("Error solicitando carro");
        }
    }
    const handleSelectTravel = (travel) => {
        changeTravelState(travel);
    }
    const handleSelectCar = (car) => {
        changeCarState(car);
    }
    const handleLeafNodeSelect = (node) => {
        setSelectedNode(node);
    }

    function renderComponent() {
        var isLog = false;
        if (user) isLog = true;
        if (selectedNode) {
            switch (selectedNode.id) {
                case 1: return <ShowTravels isLog={isLog} isAdmin={false} handleSelectTravel={handleSelectTravel} />
                case 2: return <ShowCar isLog={isLog} isAdmin={false} handleSelectCar={handleSelectCar} />
                case 3: return <History isLog={isLog} email={user ? user.mail : ''} />
                default: return <p>Render Error</p>
            }
        }
    }
    return (
        <div className={styles.app}>
            <ToolbarUser />
            <div className={styles.content}>
                <TreeView className={styles.tree} data={data} onLeafNodeSelect={handleLeafNodeSelect} />
                <div className={styles.mainContent}>
                    {
                        renderComponent()
                    }
                </div>
            </div>
        </div>
    );
};
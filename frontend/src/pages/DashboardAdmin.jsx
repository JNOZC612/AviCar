import React, { useState } from "react";
import TreeView from "../components/TreeView";
import styles from "../styles/DashAdmin.module.css";
import ToolbarUser from "../components/ToolbarUser";
import { useSelector } from "react-redux";
import RegisterTourist from "../components/RegisterTourist";
import ShowUser from "../components/ShowUser";
import RegisterRecep from "../components/RegisterRecep";
import RegisterTravel from "../components/RegisterTravel";
import ShowTravels from "../components/ShowTravels";
import RegisterCar from "../components/RegisterCar";
import ShowCar from "../components/ShowCar";

export default function DashboardAdmin() {
    const treeData = [
        {
            id: 1,
            label: "Turista",
            children: [
                { id: 2, label: "Ver Turistas" },
                { id: 3, label: "Agregar Turista" },
            ]
        },
        {
            id: 4,
            label: "Recepcionista",
            children: [
                { id: 5, label: "Ver Recepcionista" },
                { id: 6, label: "Agregar Recepcionista" },
            ]
        },
        {
            id: 7,
            label: "Viajes",
            children: [
                { id: 8, label: "Ver Vuelos" },
                { id: 9, label: "Agregar Vuelos" },
            ]
        },
        {
            id: 10,
            label: "Automóviles",
            children: [
                { id: 11, label: "Ver Automóviles" },
                { id: 12, label: "Agregar Automóviles" },
            ]
        },
    ];
    const user = useSelector((state) => state.user.userInfo);
    const [selectedNode, setSelectedNode] = useState(null);
    const handleLeafNodeSelect = (node) => {
        setSelectedNode(node);
    }
    const renderComponent = () => {
        var isLog = false;
        if (user) isLog = true;
        if (selectedNode) {
            switch (selectedNode.id) {
                case 2: return <ShowUser isLog={isLog} isAdmin={true} title={"Ver Turistas"} type={"tourists"} />
                case 3: return <RegisterTourist isLog={isLog} />
                case 5: return <ShowUser isLog={isLog} isAdmin={true} title={"Ver Recepcionistas"} type={"receps"} />
                case 6: return <RegisterRecep isLog={isLog} />
                case 8: return <ShowTravels isLog={isLog} isAdmin={true} handleSelectTravel={null} />
                case 9: return <RegisterTravel isLog={isLog} />
                case 11: return <ShowCar isLog={isLog} isAdmin={true} />
                case 12: return <RegisterCar isLog={isLog} />
                default: return <p>Render error</p>;
            }
        }
    }
    return (
        <div className={styles.app}>
            <ToolbarUser />
            <div className={styles.content}>
                <TreeView className={styles.tree} data={treeData} onLeafNodeSelect={handleLeafNodeSelect} />
                <div className={styles.mainContent}>
                    {
                        renderComponent()
                    }
                </div>
            </div>

        </div>
    );
};
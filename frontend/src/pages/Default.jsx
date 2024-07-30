import React from "react";
import Toolbar from "../components/Toolbar";
export const Default = () => {
    const links = [];
    return (
        <div>
            <Toolbar refs={links} />
            <h1>PAGE NOT FOUND</h1>
        </div>
    );
}
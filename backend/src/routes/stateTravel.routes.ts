import { Router, Request, Response } from "express";
import { connectDB } from "../services/database.services";
import { Vuelo, getUserModel } from "../models/user.models";

const router = Router();

router.post('/aprove-travel', async (req: Request, res: Response) => {
    const { agencia, origen, destino, aprovado, rechazado, email } = req.body;
    console.log(`AGENCIA: ${agencia} MAIL: ${email}\nBODY: ${JSON.stringify(req.body)}`);
    try {
        const connection = await connectDB('users_db', process.env.MONGO_URI_USER || '');
        const User = getUserModel(connection);
        const existUser = await User.findOne({ mail: email });
        if (!existUser) return res.status(204).json({ error: "Usuario no encontrado" });

        // Corregir la función de búsqueda en findIndex
        const index = existUser.vuelos.findIndex((vuelo: Vuelo) =>
            vuelo.agencia === agencia && vuelo.origen === origen && vuelo.destino === destino
        );
        console.log(`INDEX: ${index}`);
        if (index === -1) return res.status(204).json({ error: "Vuelo no encontrado" });

        console.log("EXISTE VUELO");
        existUser.vuelos[index].aprovado = aprovado;
        existUser.vuelos[index].rechazado = rechazado;
        await existUser.save();
        return res.status(200).json({ message: "Vuelo modificado exitosamente" });
    } catch (error) {
        console.error("Error al modificar vuelo", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
});

export default router;


/* import { Router, Request, Response } from "express";
import { connectDB } from "../services/database.services";
import { Vuelo, getUserModel } from "../models/user.models";

const router = Router();
router.post('/aprove-travel', async (req: Request, res: Response) => {
    const { agencia, origen, destino, aprovado, rechazado, email } = req.body;
    console.log(`AGENCIA: ${agencia} MAIL: ${email}\nBODY: ${JSON.stringify(req.body)}`);
    try {
        const connection = await connectDB('users_db', process.env.MONGO_URI_USER || '');
        const User = getUserModel(connection);
        const existUser = await User.findOne({ mail: email });
        if (!existUser) return res.status(204).json({ error: "Usuario no encontrado" });
        const index = existUser.vuelos.findIndex((vuelo: Vuelo) => {
            vuelo.agencia === agencia && vuelo.origen === origen && vuelo.destino === destino;
        });
        console.log(`INDEX: ${index}`);
        if (index === -1) return res.status(204).json({ error: "Vuelo no encontrado" })
        console.log("EXISTE VUELO");
        existUser.vuelos[index].aprovado = aprovado;
        existUser.vuelos[index].rechazado = rechazado;
        await existUser.save();
        return res.status(200).json({ message: "Vuelo modificado exitosamente" });
    } catch (error) {
        console.error("Error al modificar vuelo", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
});
export default router; */
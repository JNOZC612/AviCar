import { Request, Response, Router, response } from "express";
import { connectDB } from "../services/database.services";
import { Vuelo, getUserModel } from "../models/user.models";

const router = Router();

router.post('/travel-user', async (req: Request, res: Response) => {
    const { agencia, origen, destino, user } = req.body;
    try {
        const connection = await connectDB('users_db', process.env.MONGO_URI_USER || '');
        const User = getUserModel(connection);
        const vuelo: Vuelo = { agencia: agencia, origen: origen, destino: destino, aprovado: false, rechazado: false };
        const updated = await User.findOneAndUpdate({ user: user },
            { $push: { vuelos: vuelo } },
            { new: true, useFindAndModify: false }
        );
        if (!updated)
            return res.status(204).json({ error: "Usuario no encontrado" });
        return res.status(200).json({ message: "Vuelo solicitado exitosamente" });
    } catch (error) {
        console.error("Error al solicitar vuelo", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
});
export default router;
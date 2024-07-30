import express, { Request, Response } from "express";
import { connectDB } from "../services/database.services";
import { getUserModel } from "../models/user.models";
const router = express.Router();
router.get('/get-tourists', async (req: Request, res: Response) => {
    try {
        const connection = await connectDB('users_db', process.env.MONGO_URI_USER || '');
        const User = getUserModel(connection); // Obtener el modelo de usuario
        const users = await User.find({ typu: 'turist' }).exec();
        if (users.length > 0) res.json({ message: "Turistas encontrados: ", users });
        else res.status(204).json({ error: "No hay usuarios turistas para mostrar" });

    } catch (error: any) {
        console.error('Error al obtener usuarios turistas', error);
        res.status(500).json({ error: "Error interno del servidor" });
    }

});
export default router;
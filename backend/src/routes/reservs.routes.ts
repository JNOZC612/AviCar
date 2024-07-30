import { Router, Response, Request } from "express";
import { connectDB } from "../services/database.services";
import { getUserModel } from "../models/user.models";

const router = Router();
router.get('/get-users-reserv', async (req: Request, res: Response) => {
    try {
        const connection = await connectDB('users_db', process.env.MONGO_URI_USER || '');
        const User = getUserModel(connection);
        const users = await User.find({
            typu: 'turist',
            $or: [
                { 'carros.0': { $exists: true } },
                { 'vuelos.0': { $exists: true } }
            ]
        }).lean();
        if (!users) res.status(204).json({ error: "No hay usuarios" });
        return res.status(200).json({ users });
    } catch (error) {
        console.error("Error al buscar usuarios", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});
export default router;
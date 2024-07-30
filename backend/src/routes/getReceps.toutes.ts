import { Request, Response, Router } from 'express';
import { getUserModel } from '../models/user.models';
import { connectDB } from '../services/database.services';

const router = Router();

router.get('/get-receps', async (req: Request, res: Response) => {
    try {
        const connection = await connectDB('users_db', process.env.MONGO_URI_USER || '');

        const User = getUserModel(connection); // Obtener el modelo de usuario
        const users = await User.find({ typu: "recep" });

        if (users.length > 0) {
            res.json({ message: "Recepcionistas encontrados:", users });
        } else {
            res.status(204).json({ error: "No hay recepcionistas que mostrar" });
        }
    } catch (error) {
        console.error("Error al obtener recepcionistas:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

export default router;
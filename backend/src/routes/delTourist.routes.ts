import { Request, Response, Router } from 'express';
import { getUserModel } from '../models/user.models';
import { connectDB } from '../services/database.services';

const router = Router();

router.delete('/delete-user', async (req: Request, res: Response) => {
    const { mail } = req.body;

    try {
        const connection = await connectDB('users_db', process.env.MONGO_URI_USER || '');
        const User = getUserModel(connection); // Obtener el modelo de usuario
        const deletedUser = await User.findOneAndDelete({ mail: mail });
        if (deletedUser) {
            res.json({ message: "Usuario eliminado" });
        } else {
            res.status(204).json({ error: "Usuario no encontrado" });
        }
    } catch (error) {
        console.error("Error eliminando al usuario:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

export default router;
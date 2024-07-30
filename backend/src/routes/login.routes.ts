import { Request, Response, Router } from 'express';
import { getUserModel } from '../models/user.models';
import { connectDB } from '../services/database.services';

const router = Router();

router.post('/login', async (req: Request, res: Response) => {
    const { usermail, pass } = req.body;

    try {
        const connection = await connectDB('users_db', process.env.MONGO_URI_USER || '');
        const User = getUserModel(connection); // Obtener el modelo de usuario
        let query: any;

        // Determinar si el usuario es un email o un usuario
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (regex.test(usermail)) {
            query = { mail: usermail, pass: pass };
        } else {
            query = { user: usermail, pass: pass };
        }

        const user = await User.findOne(query);

        if (user) {
            res.json({ message: 'Usuario encontrado', user });
        } else {
            res.status(204).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error('Error al buscar usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

export default router;

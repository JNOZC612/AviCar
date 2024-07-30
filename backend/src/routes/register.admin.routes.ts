import { Request, Response, Router } from 'express';
import { getUserModel } from '../models/user.models';
import { connectDB } from '../services/database.services';

const router = Router();

router.post('/register-admin', async (req: Request, res: Response) => {
    try {
        const connection = await connectDB('users_db', process.env.MONGO_URI_USER || '');
        const User = getUserModel(connection); // Obtener el modelo de usuario
        const newUser = new User({
            name: 'admin',
            user: 'admin',
            mail: 'admin@admin.com',
            pass: 'admin',
            typu: 'admin',
            image: 'https://nzbp1.s3.us-east-2.amazonaws.com/alien.svg'
        });
        const savedUser = await newUser.save();
        console.log('Admin guardado en DB: ', savedUser);
        res.json({ message: 'Admin guardado exitosamente' });
    } catch (error: any) {
        console.error('Error al registrar Admin: ', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

export default router;
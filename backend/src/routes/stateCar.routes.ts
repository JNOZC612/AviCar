import { Router, Request, Response } from 'express';
import { connectDB } from '../services/database.services';
import { Car, getUserModel } from '../models/user.models';
const router = Router();
router.post('/aprove-car', async (req: Request, res: Response) => {
    const { placa, aprovado, rechazado, email } = req.body;
    try {
        const connection = await connectDB('users_db', process.env.MONGO_URI_USER || '');
        const User = getUserModel(connection);
        const existUser = await User.findOne({ mail: email });
        if (!existUser) return res.status(204).json({ error: "Usuario no encontrado" });
        const index = existUser.carros.findIndex((car: Car) =>
            car.placa === placa
        );
        if (index === -1) return res.status(204).json({ error: "Vehículo no encontrado" });
        existUser.carros[index].aprovado = aprovado;
        existUser.carros[index].rechazado = rechazado;
        await existUser.save();
        return res.status(200).json({ message: "Vehículo modificado con éxito" });
    } catch (error) {
        console.error("Error al modificar vehículo", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
export default router;
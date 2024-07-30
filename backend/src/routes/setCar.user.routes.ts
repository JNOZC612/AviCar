import { Router, Request, Response } from "express";
import { connectDB } from "../services/database.services";
import { getUserModel, Car } from "../models/user.models";

const router = Router();
router.post('/car-user', async (req: Request, res: Response) => {
    const { placa, user } = req.body;
    try {
        console.log(`PLACA: ${placa}`);
        const connection = await connectDB('users_db', process.env.MONGO_URI_USER || '');
        const User = getUserModel(connection);
        const car: Car = { placa: placa, aprovado: false, rechazado: false };
        const updated = await User.findOneAndUpdate({ user: user },
            { $push: { carros: car } },
            { new: true, useFindAndModify: false }
        );
        if (!updated) return res.status(204).json({ error: "Usuario no encontrado" });
        return res.status(200).json({ message: "Auto solicitado exitosamente" });

    } catch (error) {
        console.error("Error al solicitar auto", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});
export default router;
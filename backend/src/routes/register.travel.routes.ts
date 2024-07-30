import { Request, Response, Router } from "express";
import { connectDB } from "../services/database.services";
import { getTravelModel } from "../models/travel.models";

const router = Router();
router.post('/register-travel', async (req: Request, res: Response) => {
    const { agencia, origen, destino, dias, precio } = req.body;
    try {
        const connection = await connectDB('travels_db', process.env.MONGO_URI_TRAVEL || '');
        const Travel = getTravelModel(connection);
        const newTravel = new Travel({
            agencia,
            origen,
            destino,
            dias,
            precio
        });
        await newTravel.save();
        res.json({ message: 'Viaje registrado exitosamente', newTravel });
    } catch (error) {
        console.error("Error al registrar viaje", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
export default router;
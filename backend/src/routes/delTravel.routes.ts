import { Request, Response, Router } from 'express';
import { connectDB } from '../services/database.services';
import { getTravelModel } from '../models/travel.models';

const router = Router();

router.delete('/delete-travel', async (req: Request, res: Response) => {
    const { agencia, origen, destino } = req.body;

    try {
        const connection = await connectDB('travels_db', process.env.MONGO_URI_TRAVEL || '');
        const Travel = getTravelModel(connection);
        const query = { agencia: agencia, origen: origen, destino: destino }
        const deletedTravel = await Travel.findOneAndDelete(query);
        if (deletedTravel) {
            console.log("Encontrado");
            res.json({ message: "Viaje eliminado" });
        } else {
            console.log("No encontrado");
            res.status(204).json({ error: "Viaje no encontrado" });
        }
    } catch (error) {
        console.error("Error eliminando al Viaje:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

export default router;
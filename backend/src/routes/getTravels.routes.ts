import express, { Request, Response } from 'express';
import { connectDB } from '../services/database.services';
import { getTravelModel } from '../models/travel.models';
const router = express.Router();
router.get('/get-travels', async (req: Request, res: Response) => {
    try {
        const connection = await connectDB('travels_db', process.env.MONGO_URI_TRAVEL || '');
        const Travel = getTravelModel(connection);
        const travels = await Travel.find().exec();
        if(travels.length > 0) res.json({message:"Viajes: ", travels});
        else res.status(204).json({error:"No hay viajes para mostrar"});
    } catch (error: any) {
        console.error('Error al obtener viajes', error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
export default router;
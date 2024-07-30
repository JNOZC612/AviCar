import express, { Request, Response } from 'express';
import { connectDB } from '../services/database.services';
import { getCarModel } from '../models/car.models';
const router = express.Router();
router.get('/get-cars', async (req: Request, res: Response) => {
    try {
        const connection = await connectDB('cars_db', process.env.MONGO_URI_CAR || '');
        const Car = getCarModel(connection);
        const cars = await Car.find().exec();
        if (cars.length > 0) res.json({ message: "Vehículos: ", cars });
        else res.status(204).json({ error: "No hay Vehículos para mostrar" });
    } catch (error: any) {
        console.error('Error al obtener Vehículos', error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
export default router;
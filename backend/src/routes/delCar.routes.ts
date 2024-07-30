import { Request, Response, Router } from 'express';
import { connectDB } from '../services/database.services';
import { getCarModel } from '../models/car.models';

const router = Router();

router.delete('/delete-car', async (req: Request, res: Response) => {
    const { placa } = req.body;

    try {
        const connection = await connectDB('cars_db', process.env.MONGO_URI_CAR || '');
        const Car = getCarModel(connection);
        const query = { placa: placa }
        const deletedCar = await Car.findOneAndDelete(query);
        if (deletedCar) {
            console.log("Encontrado");
            res.json({ message: "Vehículo eliminado" });
        } else {
            console.log("No encontrado");
            res.status(204).json({ error: "Vehículo no encontrado" });
        }
    } catch (error) {
        console.error("Error eliminando al Vehículo:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

export default router;
import { Request, Response, Router } from "express";
import { connectDB } from "../services/database.services";
import { getCarModel } from "../models/car.models";

const router = Router();
router.post('/register-car', async (req: Request, res: Response) => {
    const { agencia, marca, placa, modelo, precio, ubicacion } = req.body;
    try {
        const connection = await connectDB('cars_db', process.env.MONGO_URI_CAR || '');
        const Car = getCarModel(connection);
        const checkCar = await Car.findOne({ placa: placa });
        if (checkCar) res.status(204).json({ error: "Ya hay un vehiculo con esta placa" });
        else {
            const newCar = new Car({
                agencia,
                marca,
                placa,
                modelo,
                precio,
                ubicacion,
                ocupado: false,
            });
            await newCar.save();
            res.json({ message: 'Vehículo registrado exitosamente', newCar });
        }
    } catch (error) {
        console.error("Error al registrar vehículo", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
export default router;
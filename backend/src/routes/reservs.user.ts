import { Router, Response, Request } from "express";
import { connectDB } from "../services/database.services";
import { getUserModel } from "../models/user.models";
import { getCarModel } from "../models/car.models";

const router = Router();

router.post('/reservs-user', async (req: Request, res: Response) => {
    const { mail } = req.body.data;
    try {
        const connection = await connectDB('users_db', process.env.MONGO_URI_USER || '');
        const connectionC = await connectDB('cars_db', process.env.MONGO_URI_CAR || '');
        const User = getUserModel(connection);
        const Car = getCarModel(connectionC);
        const user = await User.findOne({ mail: mail }).lean(); // Use lean() to get plain JavaScript objects

        if (!user) {
            return res.status(204).json({ error: "No se encontró el usuario" });
        }
        const carros = user.carros || [];
        const vuelos = user.vuelos || [];


        const carPromises = carros.map(async (cr: any) => {
            const car = await Car.findOne({ placa: cr.placa }).lean();
            if (!car) {
                return null;
            }
            return {
                car: car,
                aprovado: cr.aprovado,
                rechazado: cr.rechazado
            };
        });
        const cars = (await Promise.all(carPromises)).filter(Boolean);
        return res.status(200).json({ message: "solicitudes:", cars, vuelos });
    } catch (error) {
        console.error("Error al obtener solicitudes", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

export default router;
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import registerRoutes from './routes/register.routes';
import loginRoutes from './routes/login.routes';
import registerAdminRoutes from './routes/register.admin.routes';
import getTourists from "./routes/getTourists.routes";
import delTourist from "./routes/delTourist.routes";
import getReceps from "./routes/getReceps.toutes";
import registerRecep from './routes/register.recep.routes';
import registerTravel from './routes/register.travel.routes';
import delAdmin from './routes/delAdmin.routes';
import getTravels from './routes/getTravels.routes';
import deltravel from './routes/delTravel.routes';
import registerCar from './routes/register.car.routes';
import getCars from './routes/getCars.routes';
import delCar from './routes/delCar.routes';
import addFlyUser from './routes/setTravel.user.routes';
import addCarUser from './routes/setCar.user.routes';
import getReservsUser from './routes/reservs.user';
import getReservs from './routes/reservs.routes';
import stateTravel from './routes/stateTravel.routes';
import stateCar from './routes/stateCar.routes';
import { connectDB } from './services/database.services';
dotenv.config();
const app = express();
const port = process.env.PORT || 3200;
//cors
//app.use(cors());
app.use(cors({
  origin: 'http://18.117.174.189:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

app.use(express.json());
//db
const connectDatabases = async () => {
  await connectDB('users_db', process.env.MONGO_URI_USER || 'mongodb://mongodb:27017/users_db');
  await connectDB('travels_db', process.env.MONGO_URI_TRAVEL || 'mongodb://mongodb:27017/travels_db');
  await connectDB('cars_db', process.env.MONGO_URI_CAR || 'mongodb://mongodb:27017/cars_db');
}
connectDatabases();
//rutas
app.use('/', registerRoutes);
app.use('/', loginRoutes);
app.use('/', registerAdminRoutes);
app.use('/', getTourists);
app.use('/', delTourist);
app.use('/', getReceps);
app.use('/', registerRecep);
app.use('/', registerTravel);
app.use('/', delAdmin);
app.use('/', getTravels);
app.use('/', deltravel);
app.use('/', registerCar);
app.use('/', getCars);
app.use('/', delCar);
app.use('/', addFlyUser);
app.use('/', addCarUser);
app.use('/', getReservsUser);
app.use('/', getReservs);
app.use('/', stateTravel);
app.use('/', stateCar);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
/*import mongoose from 'mongoose';
const mongoURI = process.env.MONGOURI || 'mongodb://mongodb:27017/users_db';
const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, {});
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err);
        process.exit(1); // Salir del proceso con error
    }
};
export default connectDB;*/
import mongoose from "mongoose";
const connections: { [key: string]: mongoose.Connection } = {}
export const connectDB = async (dbName: string, uri: string) => {
    if (connections[dbName]) return connections[dbName];
    try {
        const connection = await mongoose.createConnection(uri, {
            dbName,
        });
        connections[dbName] = connection;
        console.log(`Conected to database:  ${dbName}`);
        return connection;
    } catch (error: any) {
        console.error(`Error conectando a la DB: ${dbName}: `, error);
        throw error;
    }
}
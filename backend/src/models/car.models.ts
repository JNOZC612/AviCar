import { Schema, Document, Connection } from "mongoose";
export default interface CarDocument extends Document {
    agencia: string,
    marca: string,
    placa: string,
    modelo: string,
    precio: number,
    ubicacion: string,
    ocupado: boolean
};
const CarSchema: Schema = new Schema({
    agencia: { type: String, required: true },
    marca: { type: String, required: true },
    placa: { type: String, required: true },
    modelo: { type: String, required: true },
    precio: { type: Number, required: true },
    ubicacion: { type: String, required: true },
    ocupado: { type: Boolean, required: true },
});
export const getCarModel = (connection: Connection) => {
    return connection.model<CarDocument>('Car', CarSchema);
}
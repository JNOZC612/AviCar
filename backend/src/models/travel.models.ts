import { Schema, Document, Connection } from "mongoose";
export default interface TravelDocument extends Document {
    agencia: string,
    origen: string,
    destino: string,
    dias: string,
    precio: number,
};
const TravelSchema: Schema = new Schema({
    agencia: { type: String, required: true },
    origen: { type: String, required: true },
    destino: { type: String, required: true },
    dias: { type: Number, required: true },
    precio: { type: Number, required: true }
});
export const getTravelModel = (connection: Connection) => {
    return connection.model<TravelDocument>('Travel', TravelSchema);
}
import { Schema, Document, Connection } from "mongoose";
export interface Car {
    placa: string;
    aprovado: boolean;
    rechazado: boolean;
}
export interface Vuelo {
    agencia: string;
    origen: string;
    destino: string;
    aprovado: boolean;
    rechazado: boolean;
}

export default interface UserDocument extends Document {
    name: string;
    user: string;
    mail: string;
    pass: string;
    typu: string;
    image: string;
    carros: Car[];
    vuelos: Vuelo[];
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    user: { type: String, required: true },
    mail: { type: String, required: true },
    pass: { type: String, required: true },
    typu: { type: String, default: "turist" },
    image: { type: String, default: "../assets/images/alien.svg" },
    carros: {
        type: [
            {
                placa: { type: String, required: true },
                aprovado: { type: Boolean, default: false },
                rechazado: { type: Boolean, default: false }
            }
        ], default: []
    },
    vuelos: {
        type: [
            {
                agencia: { type: String, required: true },
                origen: { type: String, required: true },
                destino: { type: String, required: true },
                aprovado: { type: Boolean, default: false },
                rechazado: { type: Boolean, default: false },
            }
        ], default: []
    }
});

export const getUserModel = (connection: Connection) => {
    return connection.model<UserDocument>('User', UserSchema);
};
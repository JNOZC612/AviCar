import mongoose from "mongoose";
const MONGOURI = process.env.MONGOURI || 'mongodb://mongodb:27017/travels.db'
const connectTravelDB = async () => {
    try {
        await mongoose.connect(MONGOURI, {});
        console.log('TRAVEL DB CONNECTED');
    } catch (error: any) {
        console.error(error);
        process.exit(1);
    }
}
export default connectTravelDB;
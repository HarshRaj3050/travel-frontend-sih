import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_DB_URL);
        console.log("Connection is done!");
    } catch (error) {
        console.log(error);
    }
}
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

export const connectDB = async () => {
    try {
        const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/appointments_db';
        await mongoose.connect(MONGO_URI)
        console.log("✅ Database connected successfully");
    } catch (error) {
        console.log(`❌ Error connecting to database: ${error.message}`);
        process.exit(1);
    }
}
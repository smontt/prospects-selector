import 'dotenv/config';
import mongoose from 'mongoose';
import score from '../middleware/scoreCalculation.js';

const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected successfully");
        score();
    } catch (error) {
        console.error("Error connecting to database", error);
        process.exit(1);
    }
};

export { connectToDb };

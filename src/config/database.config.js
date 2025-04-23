import mongoose from "mongoose";

export const dbConnection = async () => {
    try {
        const uri = process.env.DB_URI;
        await mongoose.connect(uri);

        console.info("✅ Database connected successfully.");
    } catch (error) {
        console.error("❌ Error => ", error);
    }
};

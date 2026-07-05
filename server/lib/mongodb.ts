import mongoose from "mongoose";

let isConnected = false;

export async function connectMongoDB(): Promise<void> {
    if (isConnected) {
        console.log("MongoDB already connected, reusing connection.");
        return;
    }

    const uri = process.env.MONGODB_URI;
    if (!uri) {
        throw new Error("MONGODB_URI environment variable is not set");
    }

    try {
        await mongoose.connect(uri);
        isConnected = true;
        console.log("✅ MongoDB connected successfully");

        mongoose.connection.on("error", (err) => {
            console.error("❌ MongoDB connection error:", err);
            isConnected = false;
        });

        mongoose.connection.on("disconnected", () => {
            console.warn("⚠️  MongoDB disconnected");
            isConnected = false;
        });
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error);
        throw error;
    }
}

export { mongoose };

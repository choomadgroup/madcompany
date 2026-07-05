import mongoose from "mongoose";

let isConnected = false;

export async function connectMongoDB(): Promise<void> {
    if (isConnected) return;

    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error("MONGODB_URI tidak ditemukan di environment");

    await mongoose.connect(uri);
    isConnected = true;
    console.log("✅ MongoDB connected");

    mongoose.connection.on("error", () => { isConnected = false; });
    mongoose.connection.on("disconnected", () => { isConnected = false; });
}

export { mongoose };

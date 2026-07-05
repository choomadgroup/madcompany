import express from "express";
import cors from "cors";
import { connectMongoDB } from "./lib/mongodb.js";
import apiRouter from "./routes/index.js";

const app = express();
const PORT = Number(process.env.API_PORT ?? 3001);

// Middleware
app.use(cors({ origin: true }));
app.use(express.json());

// Routes
app.use("/api", apiRouter);

// Start
async function start() {
    try {
        await connectMongoDB();

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`🚀 Express server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
}

start();

export default app;

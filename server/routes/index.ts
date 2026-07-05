import { Router } from "express";
import mongoose from "mongoose";

const router = Router();

// Health check — returns server + DB status
router.get("/health", (_req, res) => {
    const dbState: Record<number, string> = {
        0: "disconnected",
        1: "connected",
        2: "connecting",
        3: "disconnecting"
    };

    res.json({
        status: "ok",
        timestamp: new Date().toISOString(),
        database: {
            status: dbState[mongoose.connection.readyState] ?? "unknown"
        }
    });
});

export default router;

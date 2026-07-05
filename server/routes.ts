import { Router } from "express";
import { mongoose } from "./database/mongodb.js";

const router = Router();

const DB_STATE: Record<number, string> = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting"
};

router.get("/health", (_req, res) => {
    res.json({
        status: "ok",
        database: DB_STATE[mongoose.connection.readyState] ?? "unknown"
    });
});

export default router;

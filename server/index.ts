import express from "express";
import cors from "cors";
import { connectMongoDB } from "./lib/mongodb.js";
import apiRouter from "./routes/index.js";

const app = express();
const PORT = Number(process.env.PORT ?? 5000);
const isDev = process.env.NODE_ENV !== "production";

app.use(cors({ origin: true }));
app.use(express.json());

// API routes
app.use("/api", apiRouter);

async function start() {
    // Connect to MongoDB
    await connectMongoDB();

    if (isDev) {
        // In development: use Vite as middleware (HMR included)
        const { createServer: createViteServer } = await import("vite");
        const vite = await createViteServer({
            configFile: "vite.config.ts",
            server: { middlewareMode: true },
            appType: "spa"
        });
        app.use(vite.middlewares);
    } else {
        // In production: serve built static files
        const { default: path } = await import("path");
        const distPath = path.resolve("dist/public");
        app.use(express.static(distPath));
        app.get("*", (_req, res) => {
            res.sendFile(path.join(distPath, "index.html"));
        });
    }

    app.listen(PORT, "0.0.0.0", () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
        if (isDev) console.log("   Vite HMR active ✨");
    });
}

start().catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
});

export default app;

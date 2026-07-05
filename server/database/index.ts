import express from "express";
import cors from "cors";
import { createServer } from "http";
import { connectMongoDB } from "./mongodb.js";
import router from "../routes.js";

const app = express();
const httpServer = createServer(app);
const PORT = Number(process.env.PORT ?? 5000);
const isDev = process.env.NODE_ENV !== "production";

app.use(cors({ origin: true }));
app.use(express.json());
app.use("/api", router);

async function start() {
    await connectMongoDB();

    if (isDev) {
        const { createServer: createViteServer } = await import("vite");
        const vite = await createViteServer({
            configFile: "vite.config.ts",
            server: {
                middlewareMode: true,
                hmr: { server: httpServer }
            },
            appType: "spa"
        });
        app.use(vite.middlewares);
    } else {
        const { default: path } = await import("path");
        const distPath = path.resolve("dist/public");
        app.use(express.static(distPath));
        app.get("*", (_req, res) => {
            res.sendFile(path.join(distPath, "index.html"));
        });
    }

    httpServer.listen(PORT, "0.0.0.0", () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
}

start().catch((err) => {
    console.error("Gagal start server:", err);
    process.exit(1);
});

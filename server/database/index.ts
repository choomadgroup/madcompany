import express from "express";
import cors from "cors";
import { createServer } from "http";
import { connectMongoDB } from "./mongodb.js";
import router from "../routes.js";

const startTime = Date.now();

const c = {
    reset:  (s: string) => `\x1b[0m${s}\x1b[0m`,
    bold:   (s: string) => `\x1b[1m${s}\x1b[0m`,
    dim:    (s: string) => `\x1b[2m${s}\x1b[0m`,
    green:  (s: string) => `\x1b[32m${s}\x1b[0m`,
    cyan:   (s: string) => `\x1b[36m${s}\x1b[0m`,
    yellow: (s: string) => `\x1b[33m${s}\x1b[0m`,
    purple: (s: string) => `\x1b[35m${s}\x1b[0m`,
};

const app = express();
const httpServer = createServer(app);
const PORT = Number(process.env.PORT ?? 5000);
const isDev = process.env.NODE_ENV !== "production";

app.use(cors({ origin: true }));
app.use(express.json({ limit: "10mb" }));
app.use("/uploads", express.static("public/uploads"));
app.use("/api", router);

async function start() {
    await connectMongoDB();

    if (isDev) {
        const { createServer: createViteServer, version: viteVersion } = await import("vite");
        const vite = await createViteServer({
            configFile: "vite.config.ts",
            server: { middlewareMode: true, hmr: { server: httpServer } },
            appType: "spa"
        });
        app.use(vite.middlewares);

        httpServer.listen(PORT, "0.0.0.0", () => {
            const elapsed = Date.now() - startTime;
            console.log();
            console.log(`  ${c.green(c.bold("VITE"))} ${c.dim(`v${viteVersion}`)}  ${c.green(c.bold("EXPRESS"))} ${c.dim(`ready in ${elapsed} ms`)}`);
            console.log();
            console.log(`  ${c.green("➜")}  ${c.bold("Local:")}    ${c.cyan(`http://localhost:${PORT}/`)}`);
            console.log(`  ${c.green("➜")}  ${c.bold("Network:")}  ${c.cyan(`http://0.0.0.0:${PORT}/`)}`);
            console.log(`  ${c.green("➜")}  ${c.bold("API:")}      ${c.cyan(`http://localhost:${PORT}/api/health`)}`);
            console.log(`  ${c.yellow("➜")}  ${c.bold("MongoDB:")} ${c.green("connected ✓")}`);
            console.log();
        });
    } else {
        const { default: path } = await import("path");
        const distPath = path.resolve("dist/public");
        app.use(express.static(distPath));
        app.get("*", (_req, res) => {
            res.sendFile(path.join(distPath, "index.html"));
        });

        httpServer.listen(PORT, "0.0.0.0", () => {
            console.log(`🚀 Production server running on http://localhost:${PORT}`);
        });
    }
}

start().catch((err) => {
    console.error("Gagal start server:", err);
    process.exit(1);
});

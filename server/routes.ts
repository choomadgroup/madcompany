import { Router } from "express";
import fs from "fs";
import path from "path";
import { mongoose } from "./database/mongodb.js";
import { Blog } from "./models/Blog.js";
import { Portfolio } from "./models/Portfolio.js";
import { adminAuth, getAdminToken } from "./middleware/adminAuth.js";

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

// ─── Admin: Upload Gambar ──────────────────────────────────────
router.post("/admin/upload", adminAuth, (req, res) => {
    const { imageBase64 } = req.body;
    if (!imageBase64) { res.status(400).json({ error: "Tidak ada gambar" }); return; }
    const matches = imageBase64.match(/^data:image\/(\w+);base64,(.+)$/s);
    if (!matches) { res.status(400).json({ error: "Format gambar tidak valid" }); return; }
    const ext = matches[1] === "jpeg" ? "jpg" : matches[1];
    const data = matches[2];
    const uniqueName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const uploadsDir = path.resolve("public/uploads");
    fs.mkdirSync(uploadsDir, { recursive: true });
    fs.writeFileSync(path.join(uploadsDir, uniqueName), data, "base64");
    res.json({ url: `/uploads/${uniqueName}` });
});

// ─── Admin Auth ────────────────────────────────────────────────
router.post("/admin/login", (req, res) => {
    const { password } = req.body;
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) {
        res.status(500).json({ error: "ADMIN_PASSWORD belum diset di environment" });
        return;
    }
    if (password !== adminPassword) {
        res.status(401).json({ error: "Password salah" });
        return;
    }
    res.json({ token: getAdminToken() });
});

// ─── Public: Blog ──────────────────────────────────────────────
router.get("/blogs", async (_req, res) => {
    try {
        const blogs = await Blog.find({ published: true }).sort({ createdAt: -1 });
        res.json(blogs);
    } catch {
        res.status(500).json({ error: "Gagal mengambil data blog" });
    }
});

router.get("/blogs/:id", async (req, res) => {
    try {
        const blog = await Blog.findOne({ _id: req.params.id, published: true });
        if (!blog) { res.status(404).json({ error: "Artikel tidak ditemukan" }); return; }
        res.json(blog);
    } catch {
        res.status(500).json({ error: "Gagal mengambil data blog" });
    }
});

// ─── Admin: Blog ───────────────────────────────────────────────
router.get("/admin/blogs", adminAuth, async (_req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.json(blogs);
    } catch {
        res.status(500).json({ error: "Gagal mengambil data blog" });
    }
});

router.post("/admin/blogs", adminAuth, async (req, res) => {
    try {
        const blog = await Blog.create(req.body);
        res.status(201).json(blog);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

router.put("/admin/blogs/:id", adminAuth, async (req, res) => {
    try {
        const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!blog) { res.status(404).json({ error: "Tidak ditemukan" }); return; }
        res.json(blog);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

router.delete("/admin/blogs/:id", adminAuth, async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch {
        res.status(500).json({ error: "Gagal menghapus" });
    }
});

// ─── Public: Portfolio ─────────────────────────────────────────
router.get("/portfolios", async (_req, res) => {
    try {
        const portfolios = await Portfolio.find({ published: true }).sort({ createdAt: -1 });
        res.json(portfolios);
    } catch {
        res.status(500).json({ error: "Gagal mengambil data portofolio" });
    }
});

// ─── Admin: Portfolio ──────────────────────────────────────────
router.get("/admin/portfolios", adminAuth, async (_req, res) => {
    try {
        const portfolios = await Portfolio.find().sort({ createdAt: -1 });
        res.json(portfolios);
    } catch {
        res.status(500).json({ error: "Gagal mengambil data portofolio" });
    }
});

router.post("/admin/portfolios", adminAuth, async (req, res) => {
    try {
        const portfolio = await Portfolio.create(req.body);
        res.status(201).json(portfolio);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

router.put("/admin/portfolios/:id", adminAuth, async (req, res) => {
    try {
        const portfolio = await Portfolio.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!portfolio) { res.status(404).json({ error: "Tidak ditemukan" }); return; }
        res.json(portfolio);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

router.delete("/admin/portfolios/:id", adminAuth, async (req, res) => {
    try {
        await Portfolio.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch {
        res.status(500).json({ error: "Gagal menghapus" });
    }
});

export default router;

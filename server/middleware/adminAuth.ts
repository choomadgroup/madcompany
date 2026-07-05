import type { Request, Response, NextFunction } from "express";
import crypto from "crypto";

export function getAdminToken(): string {
    const password = process.env.ADMIN_PASSWORD ?? "";
    return crypto.createHmac("sha256", password).update("choomad-admin").digest("hex");
}

export function adminAuth(req: Request, res: Response, next: NextFunction) {
    const auth = req.headers.authorization;
    if (!auth?.startsWith("Bearer ")) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    const token = auth.slice(7);
    if (token !== getAdminToken()) {
        res.status(401).json({ error: "Invalid token" });
        return;
    }
    next();
}

import { useState } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { useLocation } from "wouter";
import { Container, Typography, Button, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";

export default function AdminLogin() {
    const { login } = useAdmin();
    const [, setLocation] = useLocation();
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const res = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error ?? "Login gagal");
            login(data.token);
            setLocation("/admin");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-primary px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-sm"
            >
                <Container className="flex flex-col gap-6 rounded-2xl border border-third/15 bg-white/60 p-8 shadow-md">
                    <div className="flex flex-col items-center gap-2">
                        <img src="/icons/icon-512x512.png" alt="logo" className="w-14" />
                        <Typography className="font-sans text-xl font-semibold text-third">
                            Admin Dashboard
                        </Typography>
                        <Typography className="font-sans text-sm text-third/60">
                            Choomad Group
                        </Typography>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="font-sans text-sm font-medium text-third">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                placeholder="Masukkan password admin"
                                className="rounded-lg border border-third/25 bg-white px-3 py-2 font-sans text-sm text-third outline-none focus:border-third/60"
                            />
                        </div>

                        {error && (
                            <Typography className="font-sans text-sm text-red-500">
                                {error}
                            </Typography>
                        )}

                        <Button
                            type="submit"
                            variant="contained"
                            disabled={loading}
                            fullWidth
                            className="rounded-lg bg-third py-2 font-sans text-sm font-medium capitalize text-white shadow-none hover:bg-third/80"
                        >
                            {loading ? <CircularProgress size={18} className="text-white" /> : "Masuk"}
                        </Button>
                    </form>
                </Container>
            </motion.div>
        </div>
    );
}

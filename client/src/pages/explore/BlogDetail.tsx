import { useEffect, useState } from "react";
import { useParams, useLocation } from "wouter";
import { Container, Typography, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";

type Blog = { _id: string; title: string; category: string; description: string; content: string; readTime: string; createdAt: string };

const categoryColors: Record<string, string> = {
    Brand: "bg-purple-100 text-purple-700",
    Fashion: "bg-pink-100 text-pink-700",
    Food: "bg-orange-100 text-orange-700",
    "Web Dev": "bg-blue-100 text-blue-700"
};

function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

export default function BlogDetail() {
    const { id } = useParams<{ id: string }>();
    const [, setLocation] = useLocation();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        fetch(`/api/blogs/${id}`)
            .then(res => {
                if (!res.ok) { setNotFound(true); return null; }
                return res.json();
            })
            .then(data => { if (data) setBlog(data); })
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <CircularProgress />
            </div>
        );
    }

    if (notFound || !blog) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-4">
                <Typography className="font-sans text-2xl font-semibold text-third">Artikel tidak ditemukan</Typography>
                <button
                    onClick={() => setLocation("/explore/blog")}
                    className="rounded-full border border-third/30 px-5 py-2 font-sans text-sm text-third hover:bg-third/10"
                >
                    ← Kembali ke Blog
                </button>
            </div>
        );
    }

    return (
        <Container fixed className="flex min-h-[calc(100vh-5rem)] w-full flex-col items-center px-4 py-16 pt-24 sm:px-5">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex w-full max-w-2xl flex-col gap-6"
            >
                <button
                    onClick={() => setLocation("/explore/blog")}
                    className="w-fit rounded-full border border-third/25 px-4 py-1.5 font-sans text-sm text-third hover:bg-third/10"
                >
                    ← Kembali
                </button>

                <div className="flex flex-col gap-3">
                    <span className={`w-fit rounded-full px-3 py-0.5 text-xs font-semibold ${categoryColors[blog.category] ?? "bg-gray-100 text-gray-600"}`}>
                        {blog.category}
                    </span>
                    <Typography className="font-sans text-2xl font-bold leading-snug text-third sm:text-3xl">
                        {blog.title}
                    </Typography>
                    <Typography className="font-sans text-base italic leading-relaxed text-third/60">
                        {blog.description}
                    </Typography>
                    <div className="flex items-center gap-3 border-b border-third/15 pb-4">
                        <span className="font-sans text-xs text-third/50">{formatDate(blog.createdAt)}</span>
                        <span className="h-1 w-1 rounded-full bg-third/30" />
                        <span className="font-sans text-xs text-third/50">{blog.readTime} baca</span>
                    </div>
                </div>

                <Typography
                    component="div"
                    className="whitespace-pre-wrap font-sans text-base leading-relaxed text-third/80"
                >
                    {blog.content}
                </Typography>
            </motion.div>
        </Container>
    );
}

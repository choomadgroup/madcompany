import { Container, Typography, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";

const categories = ["Semua", "Brand", "Fashion", "Food", "Web Dev"];

type Blog = { _id: string; title: string; category: string; description: string; readTime: string; createdAt: string };

const categoryColors: Record<string, string> = {
    Brand: "bg-purple-100 text-purple-700",
    Fashion: "bg-pink-100 text-pink-700",
    Food: "bg-orange-100 text-orange-700",
    "Web Dev": "bg-blue-100 text-blue-700"
};

function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}

export default function BlogPage() {
    const [active, setActive] = useState("Semua");
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [, setLocation] = useLocation();

    useEffect(() => {
        fetch("/api/blogs")
            .then(res => res.json())
            .then(data => setBlogs(Array.isArray(data) ? data : []))
            .catch(() => setBlogs([]))
            .finally(() => setLoading(false));
    }, []);

    const filtered = active === "Semua" ? blogs : blogs.filter(b => b.category === active);

    return (
        <Container fixed className="flex min-h-[calc(100vh-5rem)] w-full flex-col items-center px-4 py-16 pt-24 sm:px-5">
            <div className="flex w-full max-w-4xl flex-col gap-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col gap-2 text-center"
                >
                    <Typography className="font-sans text-2xl font-medium uppercase text-third sm:text-4xl">
                        Blog & Artikel
                    </Typography>
                    <Typography className="font-sans text-base text-third/70">
                        Tips, tren, dan insight seputar Brand, Fashion, Food, dan Web Development.
                    </Typography>
                </motion.div>

                <div className="flex flex-wrap justify-center gap-2">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActive(cat)}
                            className={`rounded-full px-4 py-1.5 font-sans text-sm font-medium transition-all ${
                                active === cat
                                    ? "bg-third text-white"
                                    : "border border-third/30 text-third hover:bg-third/10"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <div className="flex justify-center py-12">
                        <CircularProgress />
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="flex flex-col items-center gap-2 py-12 text-center">
                        <span className="text-4xl">📝</span>
                        <Typography className="font-sans text-base text-third/60">
                            {blogs.length === 0 ? "Belum ada artikel yang dipublikasikan." : "Tidak ada artikel di kategori ini."}
                        </Typography>
                    </div>
                ) : (
                    <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {filtered.map((blog, i) => (
                            <motion.div
                                key={blog._id}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: i * 0.07 }}
                                onClick={() => setLocation(`/explore/blog/${blog._id}`)}
                                className="flex cursor-pointer flex-col gap-3 rounded-2xl border border-third/15 bg-white/50 p-5 shadow-sm transition-shadow hover:shadow-md"
                            >
                                <span className={`w-fit rounded-full px-3 py-0.5 text-xs font-semibold ${categoryColors[blog.category] ?? "bg-gray-100 text-gray-600"}`}>
                                    {blog.category}
                                </span>
                                <Typography className="font-sans text-base font-semibold leading-snug text-third">
                                    {blog.title}
                                </Typography>
                                <Typography className="font-sans text-sm leading-relaxed text-third/70 line-clamp-3">
                                    {blog.description}
                                </Typography>
                                <div className="mt-auto flex items-center justify-between pt-2">
                                    <span className="font-sans text-xs text-third/50">{formatDate(blog.createdAt)}</span>
                                    <span className="font-sans text-xs text-third/50">{blog.readTime} baca</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </Container>
    );
}

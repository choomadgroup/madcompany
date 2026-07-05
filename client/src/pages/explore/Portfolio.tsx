import { Container, Typography, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const categories = ["Semua", "Brand", "Fashion", "Food", "Web"];

type Portfolio = { _id: string; title: string; category: string; description: string; tags: string[]; imageUrl: string; createdAt: string };

const categoryColors: Record<string, string> = {
    Brand: "bg-purple-100 text-purple-700",
    Fashion: "bg-pink-100 text-pink-700",
    Food: "bg-orange-100 text-orange-700",
    Web: "bg-blue-100 text-blue-700"
};

const categoryBg: Record<string, string> = {
    Brand: "from-purple-100 to-purple-50",
    Fashion: "from-pink-100 to-pink-50",
    Food: "from-orange-100 to-orange-50",
    Web: "from-blue-100 to-blue-50"
};

const categoryEmoji: Record<string, string> = {
    Brand: "🎨",
    Fashion: "👗",
    Food: "🍜",
    Web: "💻"
};

export default function PortfolioPage() {
    const [active, setActive] = useState("Semua");
    const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/portfolios")
            .then(res => res.json())
            .then(data => setPortfolios(Array.isArray(data) ? data : []))
            .catch(() => setPortfolios([]))
            .finally(() => setLoading(false));
    }, []);

    const filtered = active === "Semua" ? portfolios : portfolios.filter(p => p.category === active);

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
                        Portofolio
                    </Typography>
                    <Typography className="font-sans text-base text-third/70">
                        Karya-karya terbaik kami di bidang Brand, Fashion, Food, dan Web Development.
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
                        <span className="text-4xl">🖼️</span>
                        <Typography className="font-sans text-base text-third/60">
                            {portfolios.length === 0 ? "Belum ada portofolio yang dipublikasikan." : "Tidak ada portofolio di kategori ini."}
                        </Typography>
                    </div>
                ) : (
                    <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2">
                        {filtered.map((project, i) => (
                            <motion.div
                                key={project._id}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: i * 0.07 }}
                                className="flex flex-col overflow-hidden rounded-2xl border border-third/15 bg-white/50 shadow-sm transition-shadow hover:shadow-md"
                            >
                                {project.imageUrl ? (
                                    <img
                                        src={project.imageUrl}
                                        alt={project.title}
                                        className="h-48 w-full object-cover"
                                    />
                                ) : (
                                    <div className={`flex h-48 items-center justify-center bg-gradient-to-br ${categoryBg[project.category] ?? "from-gray-100 to-gray-50"}`}>
                                        <span className="text-5xl">{categoryEmoji[project.category] ?? "✨"}</span>
                                    </div>
                                )}
                                <div className="flex flex-col gap-2 p-5">
                                    <span className={`w-fit rounded-full px-3 py-0.5 text-xs font-semibold ${categoryColors[project.category] ?? "bg-gray-100 text-gray-600"}`}>
                                        {project.category}
                                    </span>
                                    <Typography className="font-sans text-base font-semibold leading-snug text-third">
                                        {project.title}
                                    </Typography>
                                    <Typography className="font-sans text-sm leading-relaxed text-third/70">
                                        {project.description}
                                    </Typography>
                                    <div className="mt-2 flex flex-wrap gap-1.5">
                                        {project.tags.map((tag, j) => (
                                            <span key={j} className="rounded-full border border-third/20 px-2.5 py-0.5 font-sans text-xs text-third/60">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </Container>
    );
}

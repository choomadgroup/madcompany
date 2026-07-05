import { useEffect, useState } from "react";
import { useParams, useLocation } from "wouter";
import { Container, Typography, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";

type Portfolio = {
    _id: string;
    title: string;
    category: string;
    description: string;
    tags: string[];
    imageUrl: string;
    createdAt: string;
};

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

export default function PortfolioDetail() {
    const { id } = useParams<{ id: string }>();
    const [, setLocation] = useLocation();
    const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        fetch(`/api/portfolios/${id}`)
            .then(res => {
                if (!res.ok) { setNotFound(true); return null; }
                return res.json();
            })
            .then(data => { if (data) setPortfolio(data); })
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <CircularProgress />
            </div>
        );
    }

    if (notFound || !portfolio) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-4">
                <Typography className="font-sans text-2xl font-semibold text-third">Portofolio tidak ditemukan</Typography>
                <button
                    onClick={() => setLocation("/explore/portfolio")}
                    className="rounded-full border border-third/30 px-5 py-2 font-sans text-sm text-third hover:bg-third/10"
                >
                    ← Kembali ke Portofolio
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-primary">
            {/* Hero Image */}
            {portfolio.imageUrl ? (
                <div className="relative h-72 w-full overflow-hidden sm:h-96">
                    <img
                        src={portfolio.imageUrl}
                        alt={portfolio.title}
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
            ) : (
                <div className={`flex h-56 w-full items-center justify-center bg-gradient-to-br ${categoryBg[portfolio.category] ?? "from-gray-100 to-gray-50"} sm:h-72`}>
                    <span className="text-8xl">{categoryEmoji[portfolio.category] ?? "✨"}</span>
                </div>
            )}

            <Container fixed className="px-4 py-10 sm:px-5">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mx-auto flex max-w-2xl flex-col gap-6"
                >
                    <button
                        onClick={() => setLocation("/explore/portfolio")}
                        className="w-fit rounded-full border border-third/25 px-4 py-1.5 font-sans text-sm text-third hover:bg-third/10"
                    >
                        ← Kembali
                    </button>

                    <div className="flex flex-col gap-3">
                        <span className={`w-fit rounded-full px-3 py-0.5 text-xs font-semibold ${categoryColors[portfolio.category] ?? "bg-gray-100 text-gray-600"}`}>
                            {portfolio.category}
                        </span>

                        <Typography className="font-sans text-2xl font-bold leading-snug text-third sm:text-3xl">
                            {portfolio.title}
                        </Typography>

                        <Typography className="font-sans text-base leading-relaxed text-third/70">
                            {portfolio.description}
                        </Typography>
                    </div>

                    {portfolio.tags.length > 0 && (
                        <div className="flex flex-col gap-2">
                            <Typography className="font-sans text-sm font-semibold uppercase tracking-wide text-third/50">
                                Tags
                            </Typography>
                            <div className="flex flex-wrap gap-2">
                                {portfolio.tags.map((tag, i) => (
                                    <span
                                        key={i}
                                        className="rounded-full border border-third/20 px-3 py-1 font-sans text-sm text-third/70"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="mt-4 rounded-2xl border border-third/15 bg-white/50 p-5">
                        <Typography className="font-sans text-sm font-semibold uppercase tracking-wide text-third/50">
                            Tertarik dengan proyek seperti ini?
                        </Typography>
                        <Typography className="mt-1 font-sans text-base text-third/70">
                            Hubungi kami dan ceritakan idemu — kami siap mewujudkannya.
                        </Typography>
                        <button
                            onClick={() => setLocation("/contact")}
                            className="mt-3 rounded-full bg-third px-5 py-2 font-sans text-sm font-medium text-white hover:bg-third/80"
                        >
                            Hubungi Kami →
                        </button>
                    </div>
                </motion.div>
            </Container>
        </div>
    );
}

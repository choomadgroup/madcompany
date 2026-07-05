import { Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";

const categories = ["Semua", "Brand", "Fashion", "Food", "Web"];

const projects = [
    {
        category: "Brand",
        title: "Identitas Visual — Kedai Senja",
        description: "Perancangan brand identity lengkap untuk kedai kopi lokal, mulai dari logo, palet warna, hingga panduan penggunaan brand.",
        tags: ["Logo", "Brand Guide", "Visual Identity"]
    },
    {
        category: "Fashion",
        title: "Lookbook Koleksi Raya 2025",
        description: "Desain konsep dan presentasi visual untuk koleksi busana Ramadan & Lebaran dari brand fashion lokal.",
        tags: ["Lookbook", "Art Direction", "Fashion"]
    },
    {
        category: "Food",
        title: "Packaging & Branding — Dapur Mama",
        description: "Desain kemasan produk UMKM makanan rumahan yang modern dan bersih, siap bersaing di marketplace digital.",
        tags: ["Packaging", "Branding", "UMKM"]
    },
    {
        category: "Web",
        title: "Website Company Profile — CV. Maju Bersama",
        description: "Website company profile modern, responsif, dan cepat untuk perusahaan jasa konstruksi lokal.",
        tags: ["Web Dev", "Company Profile", "Responsive"]
    },
    {
        category: "Brand",
        title: "Rebranding — Toko Batik Nusantara",
        description: "Proses rebranding menyeluruh untuk toko batik yang ingin tampil lebih modern tanpa kehilangan nilai budaya.",
        tags: ["Rebranding", "Batik", "Brand Strategy"]
    },
    {
        category: "Food",
        title: "Konten Visual — Warung Geprek Pak Budi",
        description: "Produksi konten foto dan video makanan untuk kebutuhan media sosial dan kampanye promosi digital.",
        tags: ["Food Photography", "Content", "Social Media"]
    },
    {
        category: "Web",
        title: "Landing Page — Produk Skincare Lokal",
        description: "Landing page konversi tinggi untuk produk skincare UMKM dengan desain minimalis dan elegan.",
        tags: ["Landing Page", "UI/UX", "Skincare"]
    },
    {
        category: "Fashion",
        title: "Katalog Digital — Studio Mode ID",
        description: "Pembuatan katalog digital interaktif untuk brand fashion ready-to-wear yang dipasarkan secara online.",
        tags: ["Katalog", "Digital", "Fashion"]
    }
];

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

    const filtered = active === "Semua"
        ? projects
        : projects.filter(p => p.category === active);

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

                <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2">
                    {filtered.map((project, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: i * 0.07 }}
                            className="flex flex-col overflow-hidden rounded-2xl border border-third/15 bg-white/50 shadow-sm transition-shadow hover:shadow-md"
                        >
                            <div className={`flex h-36 items-center justify-center bg-gradient-to-br ${categoryBg[project.category]}`}>
                                <span className="text-5xl">{categoryEmoji[project.category]}</span>
                            </div>
                            <div className="flex flex-col gap-2 p-5">
                                <span className={`w-fit rounded-full px-3 py-0.5 text-xs font-semibold ${categoryColors[project.category]}`}>
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
            </div>
        </Container>
    );
}

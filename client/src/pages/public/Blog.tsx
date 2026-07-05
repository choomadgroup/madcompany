import { Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";

const categories = ["Semua", "Brand", "Fashion", "Food", "Web Dev"];

const articles = [
    {
        category: "Brand",
        title: "5 Elemen Penting dalam Membangun Brand Identity yang Kuat",
        description: "Brand identity bukan hanya logo — ini panduan lengkap tentang warna, tipografi, tone of voice, dan konsistensi visual yang membuat brand kamu diingat.",
        date: "28 Jun 2025",
        readTime: "5 menit"
    },
    {
        category: "Fashion",
        title: "Tren Fashion Lokal 2025 yang Wajib Kamu Tahu",
        description: "Dari batik kontemporer hingga streetwear berbasis budaya — ini adalah tren fashion lokal yang sedang naik daun dan bagaimana brand kamu bisa ikut berperan.",
        date: "20 Jun 2025",
        readTime: "4 menit"
    },
    {
        category: "Food",
        title: "Food Styling 101: Tips Foto Makanan yang Bikin Ngiler",
        description: "Angle, pencahayaan, dan properti yang tepat bisa mengubah foto makanan biasa jadi konten yang viral. Pelajari dasarnya di sini.",
        date: "12 Jun 2025",
        readTime: "6 menit"
    },
    {
        category: "Web Dev",
        title: "Kenapa Website Bisnis Kamu Harus Mobile-First di 2025",
        description: "Lebih dari 70% pengguna internet Indonesia mengakses web dari HP. Ini alasan dan cara memastikan website bisnis kamu optimal di semua perangkat.",
        date: "5 Jun 2025",
        readTime: "5 menit"
    },
    {
        category: "Brand",
        title: "Rebranding: Kapan Waktu yang Tepat dan Bagaimana Caranya",
        description: "Rebranding bukan sekedar ganti logo. Pelajari tanda-tanda kapan bisnis kamu butuh rebranding dan langkah-langkah strategis untuk melakukannya dengan benar.",
        date: "29 Mei 2025",
        readTime: "7 menit"
    },
    {
        category: "Food",
        title: "Branding Kuliner: Strategi Membuat Pelanggan Ketagihan Balik Lagi",
        description: "Rasa yang enak belum cukup. Pelajari bagaimana packaging, nama brand, dan pengalaman pelanggan bisa membuat bisnis kuliner kamu stand out.",
        date: "18 Mei 2025",
        readTime: "5 menit"
    }
];

const categoryColors: Record<string, string> = {
    Brand: "bg-purple-100 text-purple-700",
    Fashion: "bg-pink-100 text-pink-700",
    Food: "bg-orange-100 text-orange-700",
    "Web Dev": "bg-blue-100 text-blue-700"
};

export default function BlogPage() {
    const [active, setActive] = useState("Semua");

    const filtered = active === "Semua"
        ? articles
        : articles.filter(a => a.category === active);

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

                <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {filtered.map((article, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: i * 0.07 }}
                            className="flex cursor-pointer flex-col gap-3 rounded-2xl border border-third/15 bg-white/50 p-5 shadow-sm transition-shadow hover:shadow-md"
                        >
                            <span className={`w-fit rounded-full px-3 py-0.5 text-xs font-semibold ${categoryColors[article.category]}`}>
                                {article.category}
                            </span>
                            <Typography className="font-sans text-base font-semibold leading-snug text-third">
                                {article.title}
                            </Typography>
                            <Typography className="font-sans text-sm leading-relaxed text-third/70">
                                {article.description}
                            </Typography>
                            <div className="mt-auto flex items-center justify-between pt-2">
                                <span className="font-sans text-xs text-third/50">{article.date}</span>
                                <span className="font-sans text-xs text-third/50">{article.readTime} baca</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Container>
    );
}

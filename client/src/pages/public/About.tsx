import { Container, Typography } from "@mui/material";
import { motion } from "framer-motion";

const sectors = [
    {
        icon: "🎨",
        title: "Brand",
        description: "Kami membangun identitas merek yang kuat dan berkesan — dari strategi visual hingga panduan brand yang konsisten."
    },
    {
        icon: "👗",
        title: "Fashion",
        description: "Kami hadir di industri fashion dengan sentuhan kreatif, mulai dari desain konsep hingga presentasi koleksi."
    },
    {
        icon: "🍜",
        title: "Food",
        description: "Kami mendukung bisnis kuliner dengan solusi branding, desain menu, dan pengalaman visual yang menggugah selera."
    },
    {
        icon: "💻",
        title: "Web Development",
        description: "Kami membangun website dan aplikasi web modern yang cepat, responsif, dan berfokus pada pengalaman pengguna."
    }
];

export default function AboutPage() {
    return (
        <Container fixed className="flex min-h-[calc(100vh-5rem)] w-full flex-col items-center justify-center px-4 py-16 pt-24 sm:px-5">
            <div className="flex w-full max-w-3xl flex-col items-center gap-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex w-full flex-col items-center gap-4 text-center"
                >
                    <div className="relative aspect-square h-auto w-28 sm:w-36">
                        <img
                            src="/icons/icon-512x512.png"
                            alt="Choomad Group"
                            className="absolute inset-0 h-full w-full object-contain"
                        />
                    </div>
                    <Typography className="font-sans text-2xl font-medium uppercase text-third sm:text-4xl">
                        Tentang Choomad Group
                    </Typography>
                    <Typography className="font-sans text-base font-medium text-third sm:text-lg">
                        Choomad Group adalah perusahaan kreatif yang bergerak di bidang Brand, Fashion, Food, dan Web Development — menciptakan pengalaman bermakna untuk komunitas di seluruh dunia.
                    </Typography>
                </motion.div>

                <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2">
                    {sectors.map((sector, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 * i }}
                            className="flex flex-col gap-2 rounded-2xl border border-third/20 bg-white/40 p-6 shadow-sm"
                        >
                            <span className="text-3xl">{sector.icon}</span>
                            <Typography className="font-sans text-xl font-semibold text-third">
                                {sector.title}
                            </Typography>
                            <Typography className="font-sans text-sm text-third/80">
                                {sector.description}
                            </Typography>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Container>
    );
}

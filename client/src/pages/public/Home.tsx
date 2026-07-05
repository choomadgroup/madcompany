import { useLocale } from "@/contexts/LocaleContext";
import { Container, Typography } from "@mui/material";
import { motion } from "framer-motion";

export default function HomePage() {
    const { t } = useLocale();

    return (
        <>
            <Container fixed className="flex min-h-[calc(100vh-5rem)] w-full flex-col items-center justify-center px-4 py-8 pt-20 sm:px-5">
                <div className="flex w-full max-w-2xl flex-col items-center justify-center gap-6 sm:gap-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex w-full flex-col items-center gap-4"
                    >
                        <div className="relative aspect-square h-auto w-40 sm:w-56">
                            <img
                                src="/icons/icon-512x512.png"
                                alt="Choomad Group"
                                className="absolute inset-0 h-full w-full object-contain"
                            />
                        </div>
                        <div className="flex w-full flex-col gap-4 px-4">
                            <Typography className="text-center font-sans text-2xl font-medium uppercase text-third sm:text-3xl">
                                {t.home.title}
                            </Typography>
                            <Typography className="text-center font-sans text-base font-medium text-third sm:text-xl">
                                {t.home.description}
                            </Typography>
                        </div>
                    </motion.div>
                </div>
            </Container>
        </>
    );
}

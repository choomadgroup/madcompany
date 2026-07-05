import { Container, Typography } from "@mui/material";
import { motion } from "framer-motion";

const contacts = [
    {
        icon: "✉️",
        label: "Email",
        value: "hello@choomadgroup.com",
        href: "mailto:hello@choomadgroup.com"
    },
    {
        icon: "💬",
        label: "Discord",
        value: "discord.gg/choomadgroup",
        href: "https://discord.gg/choomadgroup"
    },
    {
        icon: "🐙",
        label: "GitHub",
        value: "github.com/stegripe",
        href: "https://github.com/stegripe"
    }
];

export default function ContactPage() {
    return (
        <Container fixed className="flex min-h-[calc(100vh-5rem)] w-full flex-col items-center justify-center px-4 py-16 pt-24 sm:px-5">
            <div className="flex w-full max-w-2xl flex-col items-center gap-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex w-full flex-col items-center gap-4 text-center"
                >
                    <Typography className="font-sans text-2xl font-medium uppercase text-third sm:text-4xl">
                        Hubungi Kami
                    </Typography>
                    <Typography className="font-sans text-base font-medium text-third/80 sm:text-lg">
                        Ada pertanyaan atau ingin bekerja sama? Jangan ragu untuk menghubungi kami melalui salah satu saluran berikut.
                    </Typography>
                </motion.div>

                <div className="flex w-full flex-col gap-4">
                    {contacts.map((contact, i) => (
                        <motion.a
                            key={i}
                            href={contact.href}
                            target="_blank"
                            rel="noreferrer noopener"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 * i }}
                            className="flex items-center gap-4 rounded-2xl border border-third/20 bg-white/40 p-5 shadow-sm no-underline transition-shadow hover:shadow-md"
                        >
                            <span className="text-3xl">{contact.icon}</span>
                            <div className="flex flex-col">
                                <Typography className="font-sans text-sm font-semibold uppercase tracking-wider text-third/60">
                                    {contact.label}
                                </Typography>
                                <Typography className="font-sans text-base font-medium text-third">
                                    {contact.value}
                                </Typography>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </Container>
    );
}

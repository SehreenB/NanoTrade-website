"use client"
import Link from "next/link";
import { useScroll, motion, useTransform } from "framer-motion";
import { Fingerprint } from "lucide-react";

export default function NavBar() {
    const { scrollY } = useScroll();
    const bgOpacity = useTransform(scrollY, [0, 100], [0.3, 0.95]);
    const blur = useTransform(scrollY, [0, 100], [0, 20]);

    return (
        <motion.nav
            style={{
                backgroundColor: useTransform(bgOpacity, (v) => `rgba(0, 0, 0, ${v})`),
                backdropFilter: useTransform(blur, (v) => `blur(${v}px)`),
                WebkitBackdropFilter: useTransform(blur, (v) => `blur(${v}px)`),
            }}
            className="fixed top-0 inset-x-0 z-[100] border-b border-white/[0.05] transition-shadow duration-300"
        >
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <Fingerprint className="w-5 h-5 text-white group-hover:text-primary transition-colors" />
                    <span className="font-bold tracking-widest uppercase text-sm text-white/90 group-hover:text-white transition-colors">NanoTrade</span>
                </Link>

                <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                    <Link href="#architecture" className="text-white/60 hover:text-white transition-colors">Architecture</Link>
                    <Link href="#metrics" className="text-white/60 hover:text-white transition-colors">Metrics</Link>
                    <a href="https://www.notion.so/HFT-ASIC-HACKATHON-309dfe2ae57580619bb7ccc8d14ecf50" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">Documentation</a>
                </div>

                <Link href="#alpha" className="text-xs font-bold uppercase tracking-widest bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full transition-colors border border-white/10">
                    Alpha Access
                </Link>
            </div>
        </motion.nav>
    );
}

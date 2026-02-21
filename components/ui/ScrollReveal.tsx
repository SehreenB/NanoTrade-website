"use client";

import { motion } from "framer-motion";

interface ScrollRevealProps {
    children: React.ReactNode;
    delay?: number;
    duration?: number;
    direction?: "up" | "down" | "left" | "right";
    className?: string;
}

export function ScrollReveal({ children, delay = 0, duration = 1.2, direction = "up", className = "" }: ScrollRevealProps) {
    const getVariants = () => {
        switch (direction) {
            case "up": return { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };
            case "down": return { hidden: { opacity: 0, y: -40 }, visible: { opacity: 1, y: 0 } };
            case "left": return { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } };
            case "right": return { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } };
        }
    };

    return (
        <motion.div
            variants={getVariants()}
            initial="hidden"
            animate="visible"
            transition={{ duration, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import SiliconChip from "./SiliconChip";

function AnimatedChipGroup({ scrollYProgress }: { scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
    const groupRef = useRef<THREE.Group>(null);

    // Scale: Starts at 1.5, scales down to 0.8
    const chipScale = useTransform(scrollYProgress, [0, 1], [1.5, 0.8]);

    // Rotation X: Starts tilted (side profile), rotates to Top-Down
    const chipRotationX = useTransform(scrollYProgress, [0, 1], [Math.PI / 4, 0]);

    // Rotation Z: Spins around slightly as you scroll down
    const chipRotationZ = useTransform(scrollYProgress, [0, 1], [-Math.PI / 8, Math.PI / 2]);

    useFrame(() => {
        if (groupRef.current) {
            const scale = chipScale.get();
            groupRef.current.scale.setScalar(scale);
            groupRef.current.rotation.x = chipRotationX.get();
            groupRef.current.rotation.z = chipRotationZ.get();
        }
    });

    return (
        <group ref={groupRef}>
            <SiliconChip />
        </group>
    );
}

export default function ChipShowcase() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Pulse Lines logic: grow SVG paths based on scroll
    const pathLength = useTransform(scrollYProgress, [0.3, 0.8], [0, 1]);

    return (
        <div ref={containerRef} className="relative h-[150vh] bg-black z-10">

            {/* Sticky Container */}
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

                {/* --- Background Pulse Lines (SVG) --- */}
                <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center">
                    <svg className="w-full h-full" viewBox="-500 -500 1000 1000" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <filter id="glow-blue" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation="15" result="blur" />
                                <feMerge>
                                    <feMergeNode in="blur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>
                        {/* Horizontal Traces */}
                        <motion.path
                            d="M -100 0 L -800 0"
                            stroke="#0071e3"
                            strokeWidth="2"
                            fill="none"
                            filter="url(#glow-blue)"
                            style={{ pathLength }}
                        />
                        <motion.path
                            d="M 100 0 L 800 0"
                            stroke="#0071e3"
                            strokeWidth="2"
                            fill="none"
                            filter="url(#glow-blue)"
                            style={{ pathLength }}
                        />
                        {/* Diagonal Traces */}
                        <motion.path
                            d="M -70 -70 L -600 -600"
                            stroke="#0071e3"
                            strokeWidth="2"
                            fill="none"
                            filter="url(#glow-blue)"
                            style={{ pathLength }}
                        />
                        <motion.path
                            d="M 70 70 L 600 600"
                            stroke="#0071e3"
                            strokeWidth="2"
                            fill="none"
                            filter="url(#glow-blue)"
                            style={{ pathLength }}
                        />
                        <motion.path
                            d="M 70 -70 L 600 -600"
                            stroke="#0071e3"
                            strokeWidth="2"
                            fill="none"
                            filter="url(#glow-blue)"
                            style={{ pathLength }}
                        />
                        <motion.path
                            d="M -70 70 L -600 600"
                            stroke="#0071e3"
                            strokeWidth="2"
                            fill="none"
                            filter="url(#glow-blue)"
                            style={{ pathLength }}
                        />
                    </svg>
                </div>

                {/* --- 3D Canvas --- */}
                <div className="absolute inset-0 z-10 pointer-events-none md:pointer-events-auto">
                    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 4, 6], fov: 45 }}>
                        <ambientLight intensity={0.5} />
                        <spotLight position={[5, 10, 5]} angle={0.2} penumbra={1} intensity={1} />
                        <pointLight position={[-5, -5, -5]} color="#0071e3" intensity={15} /> {/* Apple Blue */}

                        <AnimatedChipGroup scrollYProgress={scrollYProgress} />

                        <Environment preset="city" />
                        <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={15} blur={2.5} far={4} frames={1} />
                    </Canvas>
                </div>

                {/* --- Overlay Scrollytelling Copy --- */}
                <div className="absolute inset-0 z-20 pointer-events-none">
                    <div className="h-full w-full max-w-7xl mx-auto px-6 relative">
                        <motion.div
                            style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]), y: useTransform(scrollYProgress, [0, 0.2], [0, -50]) }}
                            className="absolute top-1/4 left-0 right-0 text-center"
                        >
                            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter drop-shadow-2xl">
                                NANOTRADE
                            </h1>
                            <p className="text-xl md:text-2xl text-white/80 mt-3 font-medium tracking-wide">
                                AI-Powered ASIC
                            </p>
                        </motion.div>

                        <motion.div
                            style={{ opacity: useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 1, 0]), y: useTransform(scrollYProgress, [0.3, 0.5], [50, 0]) }}
                            className="absolute top-1/3 left-6 md:left-20 max-w-sm glass backdrop-blur-3xl bg-white/5 border border-white/10 p-8 rounded-3xl"
                        >
                            <h3 className="text-[#0071e3] font-bold tracking-widest uppercase text-xs mb-3">Ultra-Low-Latency</h3>
                            <p className="text-white/80 text-xl font-medium leading-snug">
                                We removed the operating system overhead. Every rule is etched into the target TSMC 65nm silicon layer for {'<'}100ns matching latency.
                            </p>
                        </motion.div>

                        <motion.div
                            style={{ opacity: useTransform(scrollYProgress, [0.7, 0.9], [0, 1]), y: useTransform(scrollYProgress, [0.7, 0.9], [50, 0]) }}
                            className="absolute bottom-1/4 right-6 md:right-20 max-w-sm glass backdrop-blur-3xl bg-white/5 border border-white/10 p-8 rounded-3xl"
                        >
                            <h3 className="text-[#0071e3] font-bold tracking-widest uppercase text-xs mb-3">Real-Time Anomaly Detection</h3>
                            <p className="text-white/80 text-xl font-medium leading-snug">
                                An onboard multi-layer perceptron analyzes quoting behavior in real-time, autonomously triggering the hardware circuit breaker.
                            </p>
                        </motion.div>
                    </div>
                </div>

            </div>
        </div>
    );
}

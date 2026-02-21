'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';

interface Image {
    src: string;
    alt?: string;
}

interface ZoomParallaxProps {
    /** Array of images to be displayed in the parallax effect max 7 images */
    images: Image[];
}

export function ZoomParallax({ images }: ZoomParallaxProps) {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end'],
    });

    // REDUCED zoom scales for smoother effect (was 1-9, now 1-5)
    const scale4 = useTransform(scrollYProgress, [0, 1], [1, 2.5]);
    const scale5 = useTransform(scrollYProgress, [0, 1], [1, 3]);
    const scale6 = useTransform(scrollYProgress, [0, 1], [1, 3.5]);
    const scale8 = useTransform(scrollYProgress, [0, 1], [1, 4]);
    const scale9 = useTransform(scrollYProgress, [0, 1], [1, 5]);

    const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

    return (
        // INCREASED height from 120vh to 200vh for slower, smoother scrolling
        <div ref={container} className="relative h-[200vh] z-10">
            <div className="sticky top-0 h-screen overflow-hidden">
                {images.map(({ src, alt }, index) => {
                    const scale = scales[index % scales.length];

                    return (
                        <motion.div
                            key={index}
                            style={{
                                scale,
                                // Add GPU acceleration
                                willChange: 'transform',
                            }}
                            // Add smooth transitions
                            transition={{
                                type: "spring",
                                stiffness: 100,
                                damping: 30
                            }}
                            className={`absolute top-0 flex h-full w-full items-center justify-center ${index === 1 ? '[&>div]:!-top-[30vh] [&>div]:!left-[5vw] [&>div]:!h-[30vh] [&>div]:!w-[35vw]' : ''} ${index === 2 ? '[&>div]:!-top-[10vh] [&>div]:!-left-[25vw] [&>div]:!h-[45vh] [&>div]:!w-[20vw]' : ''} ${index === 3 ? '[&>div]:!left-[27.5vw] [&>div]:!h-[25vh] [&>div]:!w-[25vw]' : ''} ${index === 4 ? '[&>div]:!top-[27.5vh] [&>div]:!left-[5vw] [&>div]:!h-[25vh] [&>div]:!w-[20vw]' : ''} ${index === 5 ? '[&>div]:!top-[27.5vh] [&>div]:!-left-[22.5vw] [&>div]:!h-[25vh] [&>div]:!w-[30vw]' : ''} ${index === 6 ? '[&>div]:!top-[22.5vh] [&>div]:!left-[25vw] [&>div]:!h-[15vh] [&>div]:!w-[15vw]' : ''} `}
                        >
                            <div
                                className="relative h-[25vh] w-[25vw] rounded-2xl overflow-hidden shadow-2xl border border-white/5 shrink-0 bg-[#0a0a0a]"
                                style={{
                                    // Prevent flickering
                                    transform: 'translateZ(0)',
                                    backfaceVisibility: 'hidden',
                                    WebkitBackfaceVisibility: 'hidden',
                                }}
                            >
                                <img
                                    src={src || '/placeholder.svg'}
                                    alt={alt || `Parallax image ${index + 1}`}
                                    className="absolute inset-0 h-full w-full min-w-0 min-h-0 object-cover object-center"
                                    style={{
                                        // Additional anti-flicker optimizations
                                        transform: 'translateZ(0)',
                                        backfaceVisibility: 'hidden',
                                        WebkitBackfaceVisibility: 'hidden',
                                    }}
                                />
                                <div className="absolute inset-0 bg-black/20" />
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
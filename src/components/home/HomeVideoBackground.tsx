'use client';

import { motion, MotionValue, useTransform } from 'framer-motion';

interface HomeVideoBackgroundProps {
    scrollYProgress: MotionValue<number>;
}

export default function HomeVideoBackground({ scrollYProgress }: HomeVideoBackgroundProps) {
    // Layer opacities
    const videoOpacity = useTransform(scrollYProgress, [0, 0.28, 0.33], [1, 1, 0]);
    const networkOpacity = useTransform(scrollYProgress, [0.28, 0.33, 0.45, 0.5], [0, 1, 1, 0]);
    const qualityOpacity = useTransform(scrollYProgress, [0.45, 0.5, 0.62, 0.67], [0, 1, 1, 0]);
    const marketOpacity = useTransform(scrollYProgress, [0.62, 0.67, 0.79, 0.833], [0, 1, 1, 0]);
    const sustainabilityOpacity = useTransform(scrollYProgress, [0.79, 0.833, 1], [0, 1, 1]);

    // Gooey blob scale effects for transitions
    const videoScale = useTransform(scrollYProgress, [0, 0.28, 0.33], [1, 1, 1.05]);
    const networkScale = useTransform(scrollYProgress, [0.28, 0.33, 0.45, 0.5], [1.05, 1, 1, 1.05]);
    const qualityScale = useTransform(scrollYProgress, [0.45, 0.5, 0.62, 0.67], [1.05, 1, 1, 1.05]);
    const marketScale = useTransform(scrollYProgress, [0.62, 0.67, 0.79, 0.833], [1.05, 1, 1, 1.05]);
    const sustainabilityScale = useTransform(scrollYProgress, [0.79, 0.833, 1], [1.05, 1, 1]);

    // Blur effects for liquid transitions
    const videoBlur = useTransform(scrollYProgress, [0, 0.28, 0.33], [0, 0, 15]);
    const networkBlur = useTransform(scrollYProgress, [0.28, 0.33, 0.45, 0.5], [15, 0, 0, 15]);
    const qualityBlur = useTransform(scrollYProgress, [0.45, 0.5, 0.62, 0.67], [15, 0, 0, 15]);
    const marketBlur = useTransform(scrollYProgress, [0.62, 0.67, 0.79, 0.833], [15, 0, 0, 15]);
    const sustainabilityBlur = useTransform(scrollYProgress, [0.79, 0.833, 1], [15, 0, 0]);

    return (
        <>
            {/* SVG Filter for gooey blob effect */}
            <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                <defs>
                    <filter id="gooey-blob">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                            result="gooey"
                        />
                        <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
                    </filter>
                    <filter id="gooey-blob-strong">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -12"
                            result="gooey"
                        />
                        <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
                    </filter>
                </defs>
            </svg>

            <div className="fixed inset-0 w-full h-full z-[-1] overflow-hidden bg-white">
                {/* Layer 1: Video - Hero & Products */}
                <motion.div
                    className="absolute inset-0 w-full h-full"
                    style={{
                        opacity: videoOpacity,
                        scale: videoScale,
                        filter: useTransform(videoBlur, (v) => `blur(${v}px) contrast(1.2)`),
                    }}
                >
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute top-0 left-0 w-full h-full object-cover"
                        style={{ filter: 'url(#gooey-blob)' }}
                    >
                        <source src="/videos/background.mp4" type="video/mp4" />
                    </video>
                </motion.div>

                {/* Layer 2: Image - Trusted Network */}
                <motion.div
                    className="absolute inset-0 w-full h-full"
                    style={{
                        opacity: networkOpacity,
                        scale: networkScale,
                        filter: useTransform(networkBlur, (v) => `blur(${v}px) contrast(1.2)`),
                    }}
                >
                    <motion.img
                        src="/images/network.jpg"
                        alt="Trusted Network Background"
                        className="w-full h-full object-cover"
                        style={{ filter: 'url(#gooey-blob-strong)' }}
                    />
                </motion.div>

                {/* Layer 3: Image - Quality Control */}
                <motion.div
                    className="absolute inset-0 w-full h-full"
                    style={{
                        opacity: qualityOpacity,
                        scale: qualityScale,
                        filter: useTransform(qualityBlur, (v) => `blur(${v}px) contrast(1.2)`),
                    }}
                >
                    <motion.img
                        src="/images/quality.jpg"
                        alt="Quality Control Background"
                        className="w-full h-full object-cover"
                        style={{ filter: 'url(#gooey-blob-strong)' }}
                    />
                </motion.div>

                {/* Layer 4: Image - Market Intelligence */}
                <motion.div
                    className="absolute inset-0 w-full h-full"
                    style={{
                        opacity: marketOpacity,
                        scale: marketScale,
                        filter: useTransform(marketBlur, (v) => `blur(${v}px) contrast(1.2)`),
                    }}
                >
                    <motion.img
                        src="/images/market.jpg"
                        alt="Market Intelligence Background"
                        className="w-full h-full object-cover"
                        style={{ filter: 'url(#gooey-blob-strong)' }}
                    />
                </motion.div>

                {/* Layer 5: Video - Sustainability */}
                <motion.div
                    className="absolute inset-0 w-full h-full"
                    style={{
                        opacity: sustainabilityOpacity,
                        scale: sustainabilityScale,
                        filter: useTransform(sustainabilityBlur, (v) => `blur(${v}px) contrast(1.2)`),
                    }}
                >
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute top-0 left-0 w-full h-full object-cover"
                        style={{ filter: 'url(#gooey-blob)' }}
                    >
                        <source src="/videos/sustainability.mp4" type="video/mp4" />
                    </video>
                </motion.div>
            </div>
        </>
    );
}

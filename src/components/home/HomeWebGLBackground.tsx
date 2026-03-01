'use client';

import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { MotionValue } from 'framer-motion';
import WebGLBackgroundPlane from '@/components/webgl/WebGLBackgroundPlane';

interface HomeWebGLBackgroundProps {
    scrollYProgress: MotionValue<number>;
}

export default function HomeWebGLBackground({ scrollYProgress }: HomeWebGLBackgroundProps) {
    const [isMounted, setIsMounted] = useState(false);
    const [currentScroll, setCurrentScroll] = useState(0);

    useEffect(() => {
        setIsMounted(true);

        const unsubscribe = scrollYProgress.on('change', (value) => {
            setCurrentScroll(value);
        });

        return () => unsubscribe();
    }, [scrollYProgress]);

    if (!isMounted) {
        // Fallback: show the old video/image background
        return (
            <div className="fixed inset-0 w-full h-full z-[-1] bg-white">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute top-0 left-0 w-full h-full object-cover"
                >
                    <source src="/videos/background.mp4" type="video/mp4" />
                </video>
            </div>
        );
    }

    // Determine current and next layers based on scroll
    const scroll = currentScroll;
    let currentLayer = 0;
    let progress = 0;

    if (scroll < 0.305) {
        currentLayer = 0; // video -> network
        progress = Math.max(0, Math.min(1, (scroll - 0.28) / 0.025));
    } else if (scroll < 0.475) {
        currentLayer = 1; // network -> quality
        progress = Math.max(0, Math.min(1, (scroll - 0.45) / 0.025));
    } else if (scroll < 0.645) {
        currentLayer = 2; // quality -> market
        progress = Math.max(0, Math.min(1, (scroll - 0.62) / 0.025));
    } else if (scroll < 0.811) {
        currentLayer = 3; // market -> sustainability
        progress = Math.max(0, Math.min(1, (scroll - 0.79) / 0.021));
    } else {
        currentLayer = 4; // sustainability (no transition)
        progress = 0;
    }

    const layers = [
        { src: '/videos/background.mp4', isVideo: true },
        { src: '/images/network.jpg', isVideo: false },
        { src: '/images/quality.jpg', isVideo: false },
        { src: '/images/market.jpg', isVideo: false },
        { src: '/videos/sustainability.mp4', isVideo: true }
    ];

    const current = layers[Math.min(currentLayer, layers.length - 1)];
    const next = layers[Math.min(currentLayer + 1, layers.length - 1)];

    return (
        <div className="fixed inset-0 w-full h-full z-[-1] bg-white">
            <Canvas
                camera={{ position: [0, 0, 1], fov: 75 }}
                dpr={[1, 2]}
                style={{ width: '100%', height: '100%' }}
                gl={{
                    antialias: false,
                    alpha: false,
                    powerPreference: 'high-performance'
                }}
            >
                <Suspense fallback={null}>
                    <WebGLBackgroundPlane
                        texture1={current.src}
                        texture2={next.src}
                        progress={progress}
                        isVideo1={current.isVideo}
                        isVideo2={next.isVideo}
                    />
                </Suspense>
            </Canvas>
        </div>
    );
}

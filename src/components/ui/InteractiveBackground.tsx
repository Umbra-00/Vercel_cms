'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function InteractiveBackground() {
    const { scrollY } = useScroll();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Parallax effects for background elements
    const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
    const y2 = useTransform(scrollY, [0, 1000], [0, -150]);
    const rotate1 = useTransform(scrollY, [0, 1000], [0, 45]);
    const opacity = useTransform(scrollY, [0, 500], [0.5, 0.2]);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none bg-[#fdfbf7]">
            {/* Base Texture - Subtle Grid */}
            <div 
                className="absolute inset-0 opacity-[0.06]"
                style={{
                    backgroundImage: `linear-gradient(#a8a29e 1px, transparent 1px), linear-gradient(90deg, #a8a29e 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />

            {/* Animated Gradient Blobs */}
            <motion.div 
                style={{ y: y1, rotate: rotate1 }}
                className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-amber-200/20 blur-3xl mix-blend-multiply"
            />
            
            <motion.div 
                style={{ y: y2 }}
                className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-teal-200/20 blur-3xl mix-blend-multiply"
            />

            <motion.div 
                style={{ opacity }}
                className="absolute top-[40%] left-[20%] w-[30vw] h-[30vw] rounded-full bg-slate-300/20 blur-3xl mix-blend-multiply"
            />

            {/* Subtle Noise Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.5] mix-blend-overlay"
                 style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />
        </div>
    );
}

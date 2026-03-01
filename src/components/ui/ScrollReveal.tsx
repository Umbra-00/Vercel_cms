"use client";

import React, { useRef, useEffect } from "react";
import { motion, useInView, useAnimation, Variant } from "framer-motion";

interface ScrollRevealProps {
    children: React.ReactNode;
    width?: "fit-content" | "100%";
    delay?: number;
    duration?: number;
    yOffset?: number;
    threshold?: number;
    className?: string;
    animation?: "slideUp" | "fadeIn" | "scaleUp" | "blurIn" | "slideLeft" | "slideRight";
}

export default function ScrollReveal({
    children,
    width = "fit-content",
    delay = 0,
    duration = 0.8,
    yOffset = 50,
    threshold = 0.2,
    className = "",
    animation = "slideUp",
}: ScrollRevealProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: `0px 0px -${threshold * 100}% 0px` as any });
    const controls = useAnimation();

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        }
    }, [isInView, controls]);

    const variants: Record<string, { hidden: Variant; visible: Variant }> = {
        slideUp: {
            hidden: { opacity: 0, y: yOffset },
            visible: { opacity: 1, y: 0 },
        },
        fadeIn: {
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
        },
        scaleUp: {
            hidden: { opacity: 0, scale: 0.95 },
            visible: { opacity: 1, scale: 1 },
        },
        blurIn: {
            hidden: { opacity: 0, filter: "blur(10px)" },
            visible: { opacity: 1, filter: "blur(0px)" },
        },
        slideLeft: {
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
        },
        slideRight: {
            hidden: { opacity: 0, x: 50 },
            visible: { opacity: 1, x: 0 },
        },
    };

    return (
        <div ref={ref} style={{ position: "relative", width, overflow: "hidden" }} className={className}>
            <motion.div
                variants={variants[animation]}
                initial="hidden"
                animate={controls}
                transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }} // Custom ease for smooth feel
            >
                {children}
            </motion.div>
        </div>
    );
}

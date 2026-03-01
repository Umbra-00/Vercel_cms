"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ZoomSectionProps {
  children: React.ReactNode;
  className?: string;
}

export default function ZoomSection({ children, className = "" }: ZoomSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Enhanced transformations with smoother fade
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0.8, 1, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.75, 1], [0, 1, 1, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [15, 0, 0, -5]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [80, 0, -30]);
  const blur = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [8, 0, 0, 4]);

  return (
    <div
      ref={containerRef}
      className={`perspective-[2000px] min-h-screen relative ${className}`}
      style={{ perspective: "2000px" }}
    >
      <motion.div
        style={{
          scale,
          opacity,
          rotateX,
          y,
          filter: blur,
          transformStyle: "preserve-3d",
        }}
        className="w-full h-full will-change-transform"
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 40,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

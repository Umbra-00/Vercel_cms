"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Initialize Lenis with enhanced settings for premium feel
    const lenis = new Lenis({
      duration: 1.2, // Reduced for snappier feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0, // Increased for more responsive scroll
      touchMultiplier: 2.0,
    });

    lenisRef.current = lenis;

    // Integrate with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Request animation frame loop
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    // Global access for stopping/starting scroll
    (window as any).lenis = lenis;

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      delete (window as any).lenis;
    };
  }, [pathname]);

  return <>{children}</>;
}

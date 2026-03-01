"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const commodities = [
  "SUGAR M-30",
  "WHEAT",
  "RICE",
  "CORN",
  "SOYBEAN",
  "COTTON",
  "COFFEE",
  "TEA",
];

export default function MarketTicker() {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isHovered = useRef(false);
  const skewProxy = useRef({ skew: 0 });

  useEffect(() => {
    if (!row1Ref.current || !row2Ref.current) return;

    const ctx = gsap.context(() => {
      const row1Animation = gsap.to(row1Ref.current, {
        xPercent: -100,
        repeat: -1,
        duration: 20,
        ease: "none",
      });

      const row2Animation = gsap.to(row2Ref.current, {
        xPercent: 100,
        repeat: -1,
        duration: 20,
        ease: "none",
      });

      const handleMouseEnter = () => {
        isHovered.current = true;
        row1Animation.pause();
        row2Animation.pause();
        gsap.to(skewProxy.current, {
          skew: 0,
          duration: 0.6,
          ease: "power2.out",
          onUpdate: () => {
            if (row1Ref.current && row2Ref.current) {
              row1Ref.current.style.transform = `translateX(${row1Animation.progress() * -100}%) skewX(${skewProxy.current.skew}deg)`;
              row2Ref.current.style.transform = `translateX(${row2Animation.progress() * 100}%) skewX(${skewProxy.current.skew}deg)`;
            }
          },
        });
      };

      const handleMouseLeave = () => {
        isHovered.current = false;
        row1Animation.resume();
        row2Animation.resume();
      };

      if (containerRef.current) {
        containerRef.current.addEventListener("mouseenter", handleMouseEnter);
        containerRef.current.addEventListener("mouseleave", handleMouseLeave);
      }

      return () => {
        row1Animation.kill();
        row2Animation.kill();
        if (containerRef.current) {
          containerRef.current.removeEventListener("mouseenter", handleMouseEnter);
          containerRef.current.removeEventListener("mouseleave", handleMouseLeave);
        }
      };
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const lenis = (window as any).lenis;
    if (!lenis) return;

    let animationFrameId: number;

    const updateSkew = () => {
      if (isHovered.current) {
        animationFrameId = requestAnimationFrame(updateSkew);
        return;
      }

      const velocity = lenis.velocity || 0;
      const targetSkew = Math.max(-20, Math.min(20, velocity * 0.05));

      skewProxy.current.skew += (targetSkew - skewProxy.current.skew) * 0.1;

      if (row1Ref.current && row2Ref.current) {
        row1Ref.current.style.transform = `translateX(${gsap.getProperty(row1Ref.current, "xPercent")}%) skewX(${skewProxy.current.skew}deg)`;
        row2Ref.current.style.transform = `translateX(${gsap.getProperty(row2Ref.current, "xPercent")}%) skewX(${skewProxy.current.skew}deg)`;
      }

      animationFrameId = requestAnimationFrame(updateSkew);
    };

    animationFrameId = requestAnimationFrame(updateSkew);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-20 bg-black overflow-hidden cursor-pointer"
    >
      <div className="space-y-8">
        <div className="relative overflow-hidden">
          <div
            ref={row1Ref}
            className="flex gap-12 whitespace-nowrap"
            style={{ willChange: "transform" }}
          >
            {[...commodities, ...commodities].map((commodity, i) => (
              <span
                key={i}
                className="text-[8vw] font-bold text-white uppercase tracking-tight"
              >
                {commodity}
              </span>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div
            ref={row2Ref}
            className="flex gap-12 whitespace-nowrap -translate-x-full"
            style={{ willChange: "transform" }}
          >
            {[...commodities, ...commodities].map((commodity, i) => (
              <span
                key={i}
                className="text-[8vw] font-bold text-white uppercase tracking-tight"
              >
                {commodity}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black via-transparent to-black" />
    </section>
  );
}

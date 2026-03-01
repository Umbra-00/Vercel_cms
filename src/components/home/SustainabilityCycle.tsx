"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const cycleStages = [
  { label: "Sowing", angle: 0 },
  { label: "Harvest", angle: 120 },
  { label: "Distribution", angle: 240 },
];

export default function SustainabilityCycle() {
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);
  const nodesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current || !circleRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      tl.to(circleRef.current, {
        rotation: 360,
        transformOrigin: "center center",
        ease: "none",
      });

      nodesRef.current.forEach((node) => {
        if (node) {
          tl.to(
            node,
            {
              rotation: 360,
              transformOrigin: "center center",
              ease: "none",
            },
            0
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-neutral-950 flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          width="600"
          height="600"
          viewBox="0 0 600 600"
          className="w-full max-w-2xl"
        >
          <circle
            ref={circleRef}
            cx="300"
            cy="300"
            r="250"
            fill="none"
            stroke="white"
            strokeWidth="2"
            opacity="0.3"
          />
        </svg>
      </div>

      <div className="relative w-full max-w-2xl aspect-square">
        {cycleStages.map((stage, index) => {
          const angleRad = (stage.angle * Math.PI) / 180;
          const radius = 250;
          const x = Math.cos(angleRad) * radius;
          const y = Math.sin(angleRad) * radius;

          return (
            <div
              key={stage.label}
              ref={(el) => {
                nodesRef.current[index] = el;
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
              }}
            >
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-neutral-950 flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {index + 1}
                    </span>
                  </div>
                </div>
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 whitespace-nowrap mt-16"
                  style={{
                    transform: `translate(-50%, -50%) translateY(4rem) rotate(${-stage.angle}deg)`,
                  }}
                >
                  <span className="text-white text-2xl font-bold uppercase tracking-wider">
                    {stage.label}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center">
        <h2 className="text-white text-5xl font-bold mb-4">
          Sustainability Cycle
        </h2>
        <p className="text-white/60 text-lg max-w-2xl">
          From field to table, our integrated supply chain ensures quality at
          every stage
        </p>
      </div>
    </section>
  );
}

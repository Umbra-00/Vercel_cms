"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface PartnerCard {
  id: number;
  name: string;
  category: string;
  initialZ: number;
}

const generatePartners = (): PartnerCard[] => {
  const categories = ["Logistics", "Warehousing", "Transport", "Cold Chain"];
  const partners: PartnerCard[] = [];

  for (let i = 0; i < 20; i++) {
    partners.push({
      id: i,
      name: `Partner ${i + 1}`,
      category: categories[i % categories.length],
      initialZ: Math.random() * -1000,
    });
  }

  return partners;
};

export default function LogisticsTunnel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const partners = useRef(generatePartners());

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        const partner = partners.current[index];
        const startZ = partner.initialZ;
        const endZ = 500;

        gsap.set(card, {
          z: startZ,
          opacity: 1,
        });

        gsap.to(card, {
          z: endZ,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
            onUpdate: (self) => {
              const currentZ = startZ + (endZ - startZ) * self.progress;
              if (currentZ > 500) {
                gsap.set(card, { opacity: 0 });
              } else if (currentZ > 300) {
                const fadeProgress = (currentZ - 300) / 200;
                gsap.set(card, { opacity: 1 - fadeProgress });
              } else {
                gsap.set(card, { opacity: 1 });
              }
            },
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[200vh] bg-black overflow-hidden"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div
          className="relative w-full h-full"
          style={{
            perspective: "1000px",
            perspectiveOrigin: "50% 50%",
          }}
        >
          <div className="absolute inset-0 grid grid-cols-4 gap-8 p-12">
            {partners.current.map((partner, index) => {
              const row = Math.floor(index / 4);
              const col = index % 4;

              return (
                <div
                  key={partner.id}
                  ref={(el) => {
                    cardsRef.current[index] = el;
                  }}
                  className="relative"
                  style={{
                    transformStyle: "preserve-3d",
                    gridColumn: col + 1,
                    gridRow: row + 1,
                  }}
                >
                  <div className="w-full aspect-square bg-neutral-900 rounded-2xl border border-neutral-800 flex flex-col items-center justify-center p-6 backdrop-blur-sm">
                    <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
                      <span className="text-white text-2xl font-bold">
                        {partner.id + 1}
                      </span>
                    </div>
                    <h3 className="text-white text-xl font-bold mb-2 text-center">
                      {partner.name}
                    </h3>
                    <p className="text-white/60 text-sm text-center">
                      {partner.category}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none z-10">
        <h2 className="text-white text-6xl font-bold mb-4">
          Logistics Network
        </h2>
        <p className="text-white/60 text-xl max-w-2xl">
          Connecting partners across the supply chain
        </p>
      </div>
    </section>
  );
}

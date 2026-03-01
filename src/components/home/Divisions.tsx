'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import SplitText from '@/components/ui/SplitText';
import { animateSplitTextOnScroll, fadeInUpOnScroll, animateSectionLeave } from '@/lib/animations';

gsap.registerPlugin(ScrollTrigger);

const divisions = [
  {
    title: 'Agro-Commodities',
    description: 'Strategic procurement and distribution of essential food grains.',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1000&auto=format&fit=crop',
    colSpan: 'md:col-span-2',
  },
  {
    title: 'Logistics',
    description: 'Pan-India supply chain network.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000&auto=format&fit=crop',
    colSpan: 'md:col-span-1',
  },
  {
    title: 'Quality Control',
    description: 'State-of-the-art testing laboratories.',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=1000&auto=format&fit=crop',
    colSpan: 'md:col-span-1',
  },
  {
    title: 'Storage',
    description: 'Climate-controlled warehousing infrastructure.',
    image: 'https://images.unsplash.com/photo-1590247813693-5541d1c609fd?q=80&w=1000&auto=format&fit=crop',
    colSpan: 'md:col-span-2',
  },
];

export default function Divisions() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      animateSplitTextOnScroll('#divisions-heading', {
        trigger: containerRef.current,
      });
      fadeInUpOnScroll('#divisions-divider', {
        trigger: containerRef.current,
        start: 'top 80%',
      });

      const cards = gsap.utils.toArray('.division-card');

      cards.forEach((card: any, i) => {
        gsap.fromTo(card,
          {
            y: 100,
            opacity: 0,
            scale: 0.9,
          },
          {
            scrollTrigger: {
              trigger: card,
              start: 'top bottom-=100',
              toggleActions: 'play none none reverse',
            },
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: 'power4.out',
            delay: i * 0.15,
          }
        );
      });

      // Add section leave animation
      animateSectionLeave('#divisions');
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="divisions" ref={containerRef} className="px-8 md:px-20 py-24 bg-neutral-900 text-neutral-50">
      <div className="mb-16">
        <SplitText
          id="divisions-heading"
          as="h2"
          text="Our Divisions"
          className="text-4xl md:text-6xl font-bold uppercase tracking-tight mb-4"
          letterClassName="uppercase"
        />
        <div id="divisions-divider" className="w-full h-[1px] bg-neutral-800"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {divisions.map((div, i) => (
          <div
            key={i}
            className={`division-card relative h-[400px] rounded-lg overflow-hidden group ${div.colSpan}`}
          >
            <div className="absolute inset-0 z-10 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
            <Image
              src={div.image}
              alt={div.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute bottom-0 left-0 z-20 p-8 w-full">
              <h3 className="text-2xl font-bold uppercase mb-2">{div.title}</h3>
              <p className="text-neutral-300 text-sm max-w-xs translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                {div.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

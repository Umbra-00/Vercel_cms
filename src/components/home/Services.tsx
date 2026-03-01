"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import SplitText from "@/components/ui/SplitText";
import { animateSplitTextOnScroll, fadeInUpOnScroll, animateSectionLeave } from "@/lib/animations";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: '01',
    name: 'Bulk Procurement',
    desc: 'Direct-from-farm sourcing ensuring fair pricing for farmers and quality for consumers.',
  },
  {
    id: '02',
    name: 'Supply Chain Management',
    desc: 'End-to-end logistics handling from warehouse to distribution centers.',
  },
  {
    id: '03',
    name: 'Price Stabilization',
    desc: 'Market intervention to maintain affordable pricing for essential commodities.',
  },
  {
    id: '04',
    name: 'Export Operations',
    desc: 'Facilitating international trade of surplus high-quality grains.',
  },
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      animateSplitTextOnScroll("#services-heading", {
        trigger: containerRef.current,
      });

      fadeInUpOnScroll("#services-subtext", {
        trigger: containerRef.current,
        start: "top 75%",
        delay: 0.1,
      });

      const rows = gsap.utils.toArray('.service-row');
      
      rows.forEach((row: any, index: number) => {
        gsap.fromTo(row, 
          {
            x: -50,
            opacity: 0,
            scale: 0.98,
          },
          {
            scrollTrigger: {
              trigger: row,
              start: 'top bottom-=50',
              toggleActions: 'play none none reverse',
            },
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power4.out',
            delay: index * 0.1,
          }
        );
      });

      // Add section leave animation
      animateSectionLeave('#services');
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={containerRef} className="px-8 md:px-20 py-24 bg-neutral-50">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20">
        <SplitText
          id="services-heading"
          as="h2"
          text="Services"
          className="text-4xl md:text-6xl font-bold uppercase tracking-tight text-neutral-900"
          letterClassName="uppercase"
        />
        <p id="services-subtext" className="text-neutral-500 max-w-md mt-4 md:mt-0">
          Comprehensive solutions for the national agricultural ecosystem.
        </p>
      </div>

      <div className="flex flex-col">
        {services.map((service) => (
          <div 
            key={service.id} 
            className="service-row group border-t border-neutral-300 py-12 flex flex-col md:flex-row justify-between items-start md:items-center cursor-pointer transition-colors hover:bg-neutral-100 px-4"
          >
            <div className="flex items-center gap-8 mb-4 md:mb-0">
              <span className="text-sm font-mono text-neutral-400">{service.id}</span>
              <h3 className="text-2xl md:text-4xl font-light uppercase tracking-wide group-hover:translate-x-4 transition-transform duration-300">
                {service.name}
              </h3>
            </div>
            
            <div className="flex items-center gap-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="hidden md:block text-sm text-neutral-500 max-w-xs text-right">
                {service.desc}
              </p>
              <div className="w-10 h-10 rounded-full border border-neutral-900 flex items-center justify-center -rotate-45 group-hover:rotate-0 transition-transform duration-300">
                <ArrowRight size={16} />
              </div>
            </div>
          </div>
        ))}
        <div className="border-t border-neutral-300"></div>
      </div>
    </section>
  );
}

'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function DigitalInfrastructure() {
  const sectionRef = useRef<HTMLElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const dashboard = dashboardRef.current;
    if (!section || !dashboard) return;

    // 3D Tilt on Mouse Move (The "Physics" feel)
    const xTo = gsap.quickTo(dashboard, 'rotateY', { duration: 0.5, ease: 'power3' });
    const yTo = gsap.quickTo(dashboard, 'rotateX', { duration: 0.5, ease: 'power3' });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      // Calculate rotation range (-15 to 15 degrees)
      const xPos = (clientX / innerWidth - 0.5) * 30;
      const yPos = (clientY / innerHeight - 0.5) * -30;

      xTo(xPos);
      yTo(yPos);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center bg-neutral-100 overflow-hidden py-20">
      <div className="absolute inset-0 grid grid-cols-[repeat(20,1fr)] opacity-[0.03] pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="border-r border-black h-full" />
        ))}
      </div>

      <div className="container px-6 text-center perspective-2000 z-10">
         <div className="mb-12">
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-neutral-500 mb-4">Logistics Tech</h2>
            <h3 className="text-4xl md:text-6xl font-bold uppercase text-neutral-900">
              Real-Time<br />Supply Visibility
            </h3>
         </div>

         {/* The "Floating Device" Mockup */}
         <div
            ref={dashboardRef}
            className="relative w-full max-w-5xl mx-auto aspect-[16/9] bg-neutral-900 rounded-xl shadow-2xl border border-neutral-800 overflow-hidden transform-style-3d will-change-transform"
            style={{ transform: 'rotateX(10deg)' }} // Initial position
         >
            {/* Screen Content (Placeholder for Dashboard Image) */}
            <div className="absolute inset-1 bg-neutral-800 rounded-lg overflow-hidden">
               <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] bg-[length:250%_250%] animate-shine" />

               {/* Mock UI Elements */}
               <div className="p-8 grid grid-cols-12 gap-4 h-full">
                  <div className="col-span-3 bg-neutral-700/30 h-full rounded animate-pulse" />
                  <div className="col-span-9 grid grid-rows-3 gap-4">
                     <div className="row-span-2 bg-neutral-700/30 rounded" />
                     <div className="grid grid-cols-3 gap-4">
                        <div className="bg-neutral-700/30 rounded" />
                        <div className="bg-neutral-700/30 rounded" />
                        <div className="bg-neutral-700/30 rounded" />
                     </div>
                  </div>
               </div>
            </div>

            {/* Reflection Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none mix-blend-overlay" />
         </div>
      </div>
    </section>
  );
}

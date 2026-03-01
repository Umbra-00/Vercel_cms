'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Real commodity data for NCSCI
const commodities = [
  { name: 'SUGAR M-30', price: '₹3,450', trend: 'up' },
  { name: 'WHEAT LOKWAN', price: '₹2,800', trend: 'down' },
  { name: 'PARIMAL RICE', price: '₹4,200', trend: 'stable' },
  { name: 'SOYBEAN OIL', price: '₹9,200', trend: 'up' },
  { name: 'CHANA DAL', price: '₹5,100', trend: 'up' },
  { name: 'MAIZE FEED', price: '₹2,150', trend: 'down' },
];

export default function Ticker() {
  const tickerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Duplicate content for seamless loop
    const content = track.innerHTML;
    track.innerHTML = content + content + content;

    const items = track.querySelectorAll('.ticker-item');
    const totalWidth = Array.from(items).reduce((acc, item) => acc + (item as HTMLElement).offsetWidth, 0);
    
    // Infinite loop animation
    const loop = gsap.to(track, {
      x: -totalWidth / 3, // Move by one set's width
      duration: 20,
      ease: 'none',
      repeat: -1,
    });

    // Speed up on scroll (Physics effect from the video)
    ScrollTrigger.create({
      trigger: document.body,
      onUpdate: (self) => {
        const velocity = Math.abs(self.getVelocity());
        const timeScale = 1 + velocity / 100; // Increase speed based on scroll
        gsap.to(loop, { timeScale: timeScale, duration: 0.5, overwrite: true });
        // Return to normal speed
        gsap.to(loop, { timeScale: 1, duration: 1, delay: 0.5 });
      },
    });

    return () => {
      loop.kill();
    };
  }, []);

  return (
    <div 
      ref={tickerRef} 
      className="w-full bg-neutral-900 text-neutral-50 border-y border-neutral-800 overflow-hidden py-3 select-none"
    >
      <div ref={trackRef} className="flex whitespace-nowrap w-max">
        {commodities.map((item, i) => (
          <div key={i} className="ticker-item flex items-center gap-3 px-8">
            <span className="font-mono text-xs text-neutral-500 tracking-widest">
              NCSCI:{item.name.split(' ')[0]}
            </span>
            <span className="font-bold uppercase text-sm">{item.name}</span>
            <span className="font-mono text-sm flex items-center gap-1">
              {item.price}
              <span className={`text-xs ${
                item.trend === 'up' ? 'text-green-400' : 
                item.trend === 'down' ? 'text-red-400' : 'text-neutral-400'
              }`}>
                {item.trend === 'up' ? '▲' : item.trend === 'down' ? '▼' : '−'}
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface LoadingScreenProps {
  onComplete?: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [isLoading, setIsLoading] = useState(true);
  const pathRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Only show loading screen once per session
    const hasShownLoading = sessionStorage.getItem('hasShownLoading');
    if (hasShownLoading) {
      setIsLoading(false);
      return;
    }

    // Mark as shown for this session
    sessionStorage.setItem('hasShownLoading', 'true');

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Calculate curve height based on screen size
    let multiplier = 0.3;
    if (width < 600) multiplier = 0.15;
    else if (width < 900) multiplier = 0.2;

    const curveHeight = height + height * multiplier;

    const initialPath = `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${curveHeight} 0 ${height} L0 0`;
    const targetPath = `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${height} 0 ${height} L0 0`;

    if (pathRef.current) {
      pathRef.current.setAttribute('d', initialPath);
    }

    // Animate loading text
    const tl = gsap.timeline({});

    // Fade in text container
    tl.fromTo(
      '.loading-text-container',
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: 'circ.inOut' }
    );

    // Animate loading text elements
    tl.to('.loading-text', {
      y: 0,
      duration: 1,
      ease: 'power2.inOut',
      delay: 0.5,
      stagger: 0.1,
      onComplete: () => {
        gsap.to('.loading-text', {
          delay: 1.2,
          opacity: 0,
          duration: 1,
          ease: 'power2.inOut',
          onComplete: () => {
            gsap.set('.loading-text', {
              y: '100%',
              opacity: 1,
            });
          },
        });
      },
    });

    // Main loading screen animation
    tl.to(containerRef.current, {
      delay: 3,
      bottom: '100%',
      duration: 1,
      ease: 'power2.inOut',
      onStart: () => {
        setTimeout(() => {
          setIsLoading(false);
          onComplete?.();
          document.body.classList.remove('overflow-hidden');
          window.scrollTo(0, 0);
        }, 120);
      },
    });

    // SVG path morphing animation
    tl.to(
      pathRef.current,
      {
        duration: 1,
        attr: { d: targetPath },
        ease: 'power2.inOut',
        onComplete: () => {
          if (containerRef.current) {
            containerRef.current.style.display = 'none';
          }
        },
      },
      '<20%'
    );

    // Prevent scrolling during loading
    document.body.classList.add('overflow-hidden');

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [onComplete]);

  if (!isLoading) return null;

  return (
    <div
      ref={containerRef}
      className="fixed bottom-0 z-[99999] flex h-full w-full cursor-wait items-center justify-center"
      style={{ transform: 'translateZ(0px)' }}
    >
      <svg
        width="100%"
        height="200%"
        className="absolute top-0 z-0 h-[calc(100%_+_300px)] fill-neutral-800 brightness-50"
      >
        <path ref={pathRef} className="w-full" />
      </svg>

      <div className="loading-text-container relative z-10 flex h-full w-full flex-col items-center justify-center text-center text-4xl font-bold text-neutral-50/75 opacity-0 md:text-6xl">
        <h3 className="overflow-hidden">
          <span className="loading-text inline-block translate-y-full will-change-transform">
            NCSCI
          </span>
        </h3>

        <p className="overflow-hidden">
          <span className="loading-text inline-block translate-y-full opacity-70 will-change-transform">
            &copy; NCSCI {new Date().getFullYear()}
          </span>
        </p>

        <div className="absolute bottom-10 left-5 right-5 flex justify-between text-sm font-normal sm:left-14 sm:right-14">
          <span className="loading-text font-mono">
            Est. 1979
          </span>
          <span className="loading-text animate-pulse font-mono">
            Loading...
          </span>
        </div>
      </div>
    </div>
  );
}

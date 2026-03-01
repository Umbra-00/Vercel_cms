'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on desktop
    if (window.matchMedia('(pointer: coarse)').matches) return;

    // Hide default cursor
    document.body.style.cursor = 'none';
    
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    
    // GSAP quickTo is much more performant than standard .to() for mouse movement
    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.1, ease: 'power3' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.1, ease: 'power3' });
    
    const xToFollower = gsap.quickTo(follower, 'x', { duration: 0.6, ease: 'power3' });
    const yToFollower = gsap.quickTo(follower, 'y', { duration: 0.6, ease: 'power3' });

    const moveCursor = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      xToFollower(e.clientX);
      yToFollower(e.clientY);
    };
    
    // Add hover effects for interactive elements
    const handleLinkHover = () => {
      gsap.to(cursor, { scale: 0, duration: 0.2 });
      gsap.to(follower, { scale: 3, backgroundColor: 'rgba(23, 23, 23, 0.1)', duration: 0.2 });
    };

    const handleLinkLeave = () => {
      gsap.to(cursor, { scale: 1, duration: 0.2 });
      gsap.to(follower, { scale: 1, backgroundColor: 'transparent', duration: 0.2 });
    };

    window.addEventListener('mousemove', moveCursor);
    
    // Attach listeners to all links and buttons
    const links = document.querySelectorAll('a, button, .cursor-hover');
    links.forEach(link => {
      link.addEventListener('mouseenter', handleLinkHover);
      link.addEventListener('mouseleave', handleLinkLeave);
    });

    return () => {
      document.body.style.cursor = 'auto';
      window.removeEventListener('mousemove', moveCursor);
      links.forEach(link => {
        link.removeEventListener('mouseenter', handleLinkHover);
        link.removeEventListener('mouseleave', handleLinkLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Primary Dot */}
      <div 
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neutral-900 z-[100] mix-blend-difference bg-white" 
      />
      {/* Trailing Ring */}
      <div 
        ref={followerRef}
        className="pointer-events-none fixed left-0 top-0 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-neutral-900/30 z-[99] transition-colors duration-300" 
      />
    </>
  );
}
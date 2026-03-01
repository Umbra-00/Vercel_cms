'use client';

import { useRef, useEffect } from 'react';
import { attachEnhancedMagneticHover } from '@/lib/animations';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  magnetoStrength?: number;
  magnetoTextStrength?: number;
  duration?: number;
}

export default function MagneticButton({ 
  children, 
  className = '', 
  onClick,
  magnetoStrength = 70,
  magnetoTextStrength = 50,
  duration = 1
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!buttonRef.current || !textRef.current) return;

    const detach = attachEnhancedMagneticHover(
      buttonRef.current,
      textRef.current,
      { magnetoStrength, magnetoTextStrength, duration }
    );

    return detach;
  }, [magnetoStrength, magnetoTextStrength, duration]);

  return (
    <button
      ref={buttonRef}
      className={`${className} relative overflow-hidden`}
      onClick={onClick}
    >
      <span 
        ref={textRef}
        className="relative z-10 block will-change-transform"
      >
        {children}
      </span>
    </button>
  );
}

'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type BlurRevealTextProps = {
    text: string;
    id?: string;
    description?: string;
    className?: string;
};

export default function BlurRevealText({
    text,
    id,
    description,
    className = '',
}: BlurRevealTextProps) {
    const textRef = useRef<HTMLHeadingElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        if (!textRef.current) return;

        const ctx = gsap.context(() => {
            // Initial blurred state
            gsap.set(textRef.current, {
                filter: 'blur(20px)',
                opacity: 0,
            });

            // Sharp reveal animation when reaching viewport center
            gsap.to(textRef.current, {
                filter: 'blur(0px)',
                opacity: 1,
                duration: 0.3,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: textRef.current,
                    start: 'center center',
                    end: 'center center',
                    toggleActions: 'play none none reverse',
                },
            });

            // Fade in description after blur reveal
            if (descRef.current) {
                gsap.fromTo(
                    descRef.current,
                    { opacity: 0, y: 20 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: textRef.current,
                            start: 'center center',
                            end: 'center center',
                            toggleActions: 'play none none reverse',
                        },
                        delay: 0.2,
                    }
                );
            }
        });

        return () => ctx.revert();
    }, []);

    return (
        <section
            id={id}
            className={`relative min-h-screen flex flex-col items-center justify-center px-6 md:px-16 ${className}`}
        >
            <div className="max-w-6xl mx-auto text-center space-y-12">
                <h2
                    ref={textRef}
                    className="text-6xl md:text-9xl font-bold tracking-tighter leading-[0.9] government-contrast will-change-transform"
                >
                    {text}
                </h2>
                {description && (
                    <p
                        ref={descRef}
                        className="text-lg md:text-2xl text-neutral-300 max-w-3xl mx-auto leading-relaxed opacity-0"
                    >
                        {description}
                    </p>
                )}
            </div>
        </section>
    );
}

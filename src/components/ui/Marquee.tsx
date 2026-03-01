"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface MarqueeProps {
    children: React.ReactNode;
    direction?: "left" | "right";
    baseVelocity?: number;
    className?: string;
}

export default function Marquee({
    children,
    direction = "left",
    baseVelocity = 5,
    className = "",
}: MarqueeProps) {
    const marqueeRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const marquee = marqueeRef.current;
        const inner = innerRef.current;

        if (!marquee || !inner) return;

        let xPercent = 0;
        let velocity = baseVelocity * (direction === "left" ? -1 : 1);
        let scrollVelocity = 0;

        // Clone children for infinite loop
        // We need enough copies to fill the screen + buffer
        // For simplicity in this implementation, we'll assume the user provides enough content
        // or we can duplicate the inner content here if needed.
        // A robust marquee usually duplicates content 2-3 times.

        const update = () => {
            // Move content
            xPercent += velocity + scrollVelocity;

            // Reset if out of bounds
            if (xPercent <= -100) {
                xPercent = 0;
            }
            if (xPercent > 0) {
                xPercent = -100;
            }

            gsap.set(inner, { xPercent });

            // Decay scroll velocity
            scrollVelocity *= 0.9;

            requestAnimationFrame(update);
        };

        const animation = requestAnimationFrame(update);

        // Couple with scroll velocity
        ScrollTrigger.create({
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            onUpdate: (self) => {
                const vel = self.getVelocity();
                // Add scroll velocity to marquee velocity
                // Normalize and scale it
                scrollVelocity = (vel / 50) * (direction === "left" ? -1 : 1);
            },
        });

        // Hover to pause
        const handleMouseEnter = () => {
            gsap.to(marquee, { timeScale: 0, duration: 0.5, overwrite: true });
            // Note: We are manually animating via RAF, so timeScale on the element won't work directly
            // unless we wrap the update logic in a GSAP ticker or tween.
            // Let's use a simpler approach: set velocity to 0
            velocity = 0;
        };

        const handleMouseLeave = () => {
            velocity = baseVelocity * (direction === "left" ? -1 : 1);
        };

        marquee.addEventListener("mouseenter", handleMouseEnter);
        marquee.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            cancelAnimationFrame(animation);
            marquee.removeEventListener("mouseenter", handleMouseEnter);
            marquee.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [baseVelocity, direction]);

    return (
        <div
            ref={marqueeRef}
            className={`overflow-hidden whitespace-nowrap flex ${className}`}
        >
            <div ref={innerRef} className="flex">
                {children}
                {children} {/* Duplicate for loop */}
                {children} {/* Triplicate for safety */}
            </div>
        </div>
    );
}

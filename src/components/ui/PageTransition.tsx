"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

export default function PageTransition() {
    const curtainRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const ctx = gsap.context(() => {
            const tl = gsap.timeline();
            tl.to(curtainRef.current, {
                yPercent: -100,
                duration: 0.8,
                ease: "expo.out",
            }, 0)
            .to(textRef.current, {
                yPercent: -150,
                duration: 0.8,
                ease: "expo.out",
            }, 0);
        });

        return () => ctx.revert();
    }, [pathname]);

    useEffect(() => {
        (window as any).playPageExit = (pageTitle: string, onComplete: () => void) => {
            if (textRef.current) {
                textRef.current.textContent = pageTitle;
            }
            
            gsap.set(curtainRef.current, { yPercent: 100 });
            gsap.set(textRef.current, { yPercent: 100 });
            
            const tl = gsap.timeline({
                onComplete,
            });
            
            tl.to(curtainRef.current, {
                yPercent: 0,
                duration: 0.8,
                ease: "expo.in",
            }, 0)
            .to(textRef.current, {
                yPercent: 50,
                duration: 0.8,
                ease: "expo.in",
            }, 0);
        };

        return () => {
            delete (window as any).playPageExit;
        };
    }, []);

    return (
        <div
            ref={curtainRef}
            className="fixed inset-0 z-[9999] bg-black pointer-events-none translate-y-full overflow-hidden"
        >
            <div
                ref={textRef}
                className="absolute inset-0 flex items-center justify-center text-white font-bold text-[12vw] leading-none uppercase tracking-tight"
                style={{ willChange: "transform" }}
            />
        </div>
    );
}

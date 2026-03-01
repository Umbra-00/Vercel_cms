"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { attachMagneticHover } from "@/lib/animations";

interface OrganicButtonProps {
    href: string;
    children: React.ReactNode;
    className?: string;
}

export default function OrganicButton({
    href,
    children,
    className = "",
}: OrganicButtonProps) {
    const buttonRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        const button = buttonRef.current;
        if (!button) return;

        // Softer physics for "organic" feel
        const cleanup = attachMagneticHover(button, {
            movement: 15, // Reduced movement
            duration: 1.5, // Slower return (more viscous)
        });

        return () => cleanup();
    }, []);

    return (
        <Link
            href={href}
            ref={buttonRef}
            className={`inline-flex items-center justify-center px-8 py-4 rounded-full transition-colors duration-300 ${className}`}
        >
            {children}
        </Link>
    );
}

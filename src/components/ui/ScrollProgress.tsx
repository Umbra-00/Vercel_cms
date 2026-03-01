"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function ScrollProgress() {
    const [activeSection, setActiveSection] = useState<string>("");
    const pathname = usePathname();

    useEffect(() => {
        if (pathname !== "/") return;

        const sections = document.querySelectorAll("section[id]");

        const observer = new IntersectionObserver(
            (entries) => {
                let maxRatio = 0;
                let mostVisibleSection = "";

                entries.forEach((entry) => {
                    if (entry.intersectionRatio > maxRatio) {
                        maxRatio = entry.intersectionRatio;
                        mostVisibleSection = entry.target.id;
                    }
                });

                if (mostVisibleSection) {
                    setActiveSection(mostVisibleSection);
                }
            },
            {
                threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
                rootMargin: "-10% 0px -10% 0px", // Better sensitivity
            }
        );

        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, [pathname]);

    const handleScrollTo = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    if (pathname !== "/") return null;

    // Updated section IDs to match current layout
    const navItems = [
        { id: "hero", label: "HOME" },
        { id: "products", label: "PRODUCTS" },
        { id: "partners", label: "PARTNERS" },
        { id: "quality", label: "QUALITY" },
        { id: "market-intelligence", label: "MARKET" },
        { id: "sustainability", label: "GREEN" },
        { id: "contact", label: "CONTACT" },
    ];

    return (
        <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-6 items-end mix-blend-difference">
            {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                    <button
                        key={item.id}
                        onClick={() => handleScrollTo(item.id)}
                        className="group flex items-center gap-4 cursor-pointer"
                    >
                        <span
                            className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-500 ${isActive
                                ? "text-white opacity-100 translate-x-0"
                                : "text-white/60 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0"
                                }`}
                        >
                            {item.label}
                        </span>
                        <div className="relative">
                            {/* Outer glow ring */}
                            <div
                                className={`absolute inset-0 rounded-full transition-all duration-500 ${isActive
                                    ? "w-3 h-3 bg-white/20 blur-sm scale-150"
                                    : "w-0 h-0 opacity-0"
                                    }`}
                            />
                            {/* Main dot */}
                            <div
                                className={`rounded-full transition-all duration-500 ${isActive
                                    ? "w-3 h-3 bg-white shadow-lg shadow-white/50"
                                    : "w-2 h-2 bg-white/40 group-hover:w-2.5 group-hover:h-2.5 group-hover:bg-white/60"
                                    }`}
                            />
                        </div>
                    </button>
                );
            })}
        </div>
    );
}

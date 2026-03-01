'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Spec = {
    label: string;
    value: string;
    benchmark: string;
};

type SpecCategory = {
    name: string;
    specs: Spec[];
};

type MacroCommodityViewProps = {
    productName: string;
    imagePath: string;
    categories: SpecCategory[];
};

export default function MacroCommodityView({
    productName,
    imagePath,
    categories,
}: MacroCommodityViewProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Animate each category panel as user scrolls
            categories.forEach((_, index) => {
                const panels = gsap.utils.toArray(`.spec-panel-${index}`);

                gsap.fromTo(
                    panels,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        stagger: 0.05,
                        scrollTrigger: {
                            trigger: `#category-${index}`,
                            start: 'top 70%',
                            end: 'top 30%',
                            scrub: 1,
                        },
                    }
                );

                // Fade out previous category when next one comes in
                if (index > 0) {
                    gsap.to(`.spec-panel-${index - 1}`, {
                        opacity: 0.3,
                        scrollTrigger: {
                            trigger: `#category-${index}`,
                            start: 'top 60%',
                            end: 'top 40%',
                            scrub: 1,
                        },
                    });
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [categories]);

    // Track mouse position for lighting effect
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!imageRef.current) return;

        const rect = imageRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

        setMousePosition({ x, y });
    };

    return (
        <section
            ref={sectionRef}
            className="relative min-h-[400vh] py-24 bg-neutral-900"
            onMouseMove={handleMouseMove}
        >
            <div className="container mx-auto px-6">
                {/* Product Title */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                        {productName}
                    </h2>
                    <p className="text-neutral-400 text-sm tracking-[0.3em] uppercase mt-4">
                        Laboratory-Grade Analysis
                    </p>
                </div>

                {/* Sticky Image Container */}
                <div className="relative">
                    <div
                        ref={imageRef}
                        className="sticky top-1/2 -translate-y-1/2 flex items-center justify-center h-[60vh] mb-24"
                    >
                        <div
                            className="relative w-full max-w-2xl aspect-square"
                            style={{
                                filter: `drop-shadow(${mousePosition.x * 20}px ${mousePosition.y * 20}px 40px rgba(255, 255, 255, 0.3))`,
                                transition: 'filter 0.1s ease-out',
                            }}
                        >
                            <Image
                                src={imagePath}
                                alt={productName}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-contain"
                                priority
                            />
                        </div>
                    </div>

                    {/* Floating Spec Categories */}
                    <div className="space-y-[100vh]">
                        {categories.map((category, categoryIndex) => (
                            <div
                                key={category.name}
                                id={`category-${categoryIndex}`}
                                className="relative"
                            >
                                {/* Category Title */}
                                <div className="text-center mb-12">
                                    <h3 className="text-2xl md:text-4xl font-bold text-white">
                                        {category.name}
                                    </h3>
                                </div>

                                {/* Spec Panels Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                                    {category.specs.map((spec) => (
                                        <div
                                            key={spec.label}
                                            className={`spec-panel-${categoryIndex} hud-panel opacity-0`}
                                        >
                                            <div className="space-y-3">
                                                <p className="text-xs tracking-[0.3em] text-neutral-500 uppercase">
                                                    {spec.label}
                                                </p>
                                                <div className="flex items-baseline justify-between">
                                                    <p className="text-3xl font-bold text-white">
                                                        {spec.value}
                                                    </p>
                                                    <p className="text-sm text-neutral-400">
                                                        {spec.benchmark}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import infrastructureData from '@/data/infrastructure-data.json';

gsap.registerPlugin(ScrollTrigger);

type InfrastructureStage = {
    id: string;
    type: string;
    title: string;
    location: string;
    description: string;
    coordinates: { x: number; y: number };
    stats: Array<{ label: string; value: string }>;
    commodities?: string[];
    facilities?: Array<{ name: string; capacity: string; specialization: string }>;
    coverage?: string[];
};

const stages = infrastructureData as InfrastructureStage[];

export default function InfrastructureJourney() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 1024px)", () => {
            if (!sectionRef.current || !containerRef.current || !mapRef.current) return;

            // Calculate total width for horizontal scroll
            const totalWidth = stages.length * 100;

            // Main horizontal scroll animation
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    pin: true,
                    start: "top top",
                    end: `+=${totalWidth * 30}`, // Adjust scroll distance
                    scrub: 1,
                    anticipatePin: 1,
                },
            });

            // Animate container horizontally
            tl.to(containerRef.current, {
                x: () => -(containerRef.current!.scrollWidth - window.innerWidth),
                ease: "none",
            });

            // Parallax effect on background map (slower movement)
            gsap.to(mapRef.current, {
                x: -200,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: `+=${totalWidth * 30}`,
                    scrub: 1,
                },
            });

            // Fade in each stage as it comes into view
            stages.forEach((stage, index) => {
                gsap.fromTo(
                    `#${stage.id}`,
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1,
                        y: 0,
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: `top+=${index * 25}% top`,
                            end: `top+=${(index + 1) * 25}% top`,
                            scrub: 1,
                            containerAnimation: tl,
                        },
                    }
                );
            });

            return () => {
                ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
            };
        });

        // Mobile: vertical scroll fallback
        mm.add("(max-width: 1023px)", () => {
            stages.forEach((stage) => {
                gsap.fromTo(
                    `#${stage.id}`,
                    { opacity: 0, y: 60 },
                    {
                        opacity: 1,
                        y: 0,
                        scrollTrigger: {
                            trigger: `#${stage.id}`,
                            start: "top 80%",
                            end: "top 50%",
                            scrub: 1,
                        },
                    }
                );
            });
        });

        return () => mm.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="horizontal-scroll-section relative overflow-hidden bg-neutral-900"
        >
            {/* Background India Map - Parallax Layer */}
            <div
                ref={mapRef}
                className="absolute inset-0 opacity-5"
                style={{ willChange: 'transform' }}
            >
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwMCIgaGVpZ2h0PSIxMDAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik01MDAgMTBMNjAwIDQwMEw5OTAgNTAwTDYwMCA2MDBMNTK5IDk5MEw0MDAgNjAwTDEwIDUwMEw0MDAgNDAwWiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9zdmc+')] bg-center bg-no-repeat opacity-20" />
            </div>

            {/* Horizontal Scroll Container */}
            <div
                ref={containerRef}
                className="horizontal-scroll-container flex h-screen items-center lg:flex-nowrap flex-wrap lg:w-max w-full"
                style={{ willChange: 'transform' }}
            >
                {stages.map((stage, index) => (
                    <div
                        key={stage.id}
                        id={stage.id}
                        className="stage-card flex-shrink-0 flex items-center justify-center px-8 md:px-16 lg:w-screen w-full min-h-screen lg:min-h-0"
                    >
                        <div className="max-w-2xl space-y-8">
                            {/* Stage Number */}
                            <div className="flex items-center gap-4">
                                <span className="text-sm tracking-[0.4em] text-neutral-500 uppercase">
                                    Stage {String(index + 1).padStart(2, '0')}
                                </span>
                                <div className="h-px flex-1 bg-neutral-700" />
                            </div>

                            {/* Title & Location */}
                            <div className="space-y-2">
                                <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
                                    {stage.title}
                                </h2>
                                <p className="text-xl text-neutral-400 tracking-wider uppercase">
                                    {stage.location}
                                </p>
                            </div>

                            {/* Description */}
                            <p className="text-lg text-neutral-300 leading-relaxed max-w-xl">
                                {stage.description}
                            </p>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-6 border-t border-neutral-700">
                                {stage.stats.map((stat) => (
                                    <div key={stat.label} className="space-y-2">
                                        <p className="text-xs tracking-[0.3em] text-neutral-500 uppercase">
                                            {stat.label}
                                        </p>
                                        <p className="text-3xl font-semibold text-white">
                                            {stat.value}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Commodities (if applicable) */}
                            {stage.commodities && (
                                <div className="space-y-3">
                                    <p className="text-xs tracking-[0.3em] text-neutral-500 uppercase">
                                        Key Commodities
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {stage.commodities.map((commodity) => (
                                            <span
                                                key={commodity}
                                                className="px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-full text-sm text-neutral-300"
                                            >
                                                {commodity}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Facilities (if applicable) */}
                            {stage.facilities && (
                                <div className="space-y-3">
                                    <p className="text-xs tracking-[0.3em] text-neutral-500 uppercase">
                                        Major Facilities
                                    </p>
                                    <div className="space-y-3">
                                        {stage.facilities.map((facility) => (
                                            <div
                                                key={facility.name}
                                                className="flex justify-between items-center p-4 bg-neutral-800/50 border border-neutral-700 rounded-lg"
                                            >
                                                <div>
                                                    <p className="text-white font-medium">{facility.name}</p>
                                                    <p className="text-sm text-neutral-400">{facility.specialization}</p>
                                                </div>
                                                <p className="text-lg font-semibold text-white">{facility.capacity}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Coverage (if applicable) */}
                            {stage.coverage && (
                                <div className="space-y-3">
                                    <p className="text-xs tracking-[0.3em] text-neutral-500 uppercase">
                                        Coverage Areas
                                    </p>
                                    <div className="grid grid-cols-2 gap-2">
                                        {stage.coverage.map((area) => (
                                            <div
                                                key={area}
                                                className="px-4 py-3 bg-neutral-800/30 border border-neutral-700 text-neutral-300 text-center rounded"
                                            >
                                                {area}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

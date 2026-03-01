'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type TimelineEvent = {
    year: string;
    title: string;
    description: string;
};

type TimelineSectionProps = {
    events: TimelineEvent[];
};

export default function TimelineSection({ events }: TimelineSectionProps) {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Animate each timeline event
            events.forEach((_, index) => {
                gsap.fromTo(
                    `#timeline-event-${index}`,
                    { opacity: 0, x: -30 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.8,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: `#timeline-event-${index}`,
                            start: 'top 85%',
                            end: 'top 60%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );

                // Animate the connecting line
                gsap.fromTo(
                    `#timeline-line-${index}`,
                    { scaleY: 0 },
                    {
                        scaleY: 1,
                        duration: 0.6,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: `#timeline-event-${index}`,
                            start: 'top 80%',
                            end: 'top 60%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [events]);

    return (
        <section
            ref={sectionRef}
            className="relative py-24 px-6 md:px-16 bg-black text-white"
        >
            <div className="max-w-5xl mx-auto">
                {/* Section Title */}
                <div className="mb-20 text-center">
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                        Historical Milestones
                    </h2>
                    <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
                        Over five decades of building India's most trusted commodity infrastructure
                    </p>
                </div>

                {/* Timeline */}
                <div className="relative space-y-16">
                    {/* Vertical Timeline Line */}
                    <div className="absolute left-8 md:left-32 top-0 bottom-0 w-0.5 bg-neutral-800" />

                    {events.map((event, index) => (
                        <div
                            key={event.year}
                            id={`timeline-event-${index}`}
                            className="relative opacity-0"
                        >
                            <div className="flex gap-8 md:gap-16">
                                {/* Year Marker */}
                                <div className="flex-shrink-0 w-24 md:w-32 text-right">
                                    <div className="relative z-10 inline-block">
                                        <div className="font-mono text-3xl md:text-4xl font-bold text-white bg-black px-2">
                                            {event.year}
                                        </div>
                                    </div>
                                </div>

                                {/* Event Content */}
                                <div className="flex-1 pb-12 space-y-3">
                                    {/* Dot Marker */}
                                    <div className="absolute left-8 md:left-32 -translate-x-1/2 w-4 h-4 bg-white rounded-full border-4 border-black" />

                                    {/* Connecting Line (segment) */}
                                    <div
                                        id={`timeline-line-${index}`}
                                        className="absolute left-8 md:left-32 top-4 w-0.5 h-full bg-white origin-top"
                                        style={{ transform: 'scaleY(0)' }}
                                    />

                                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
                                        {event.title}
                                    </h3>
                                    <p className="text-neutral-400 text-base md:text-lg leading-relaxed max-w-2xl">
                                        {event.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

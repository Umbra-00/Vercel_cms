"use client";

import { useEffect, useRef } from "react";
import { createHorizontalScrollPin } from "@/lib/animations";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Microscope, FlaskConical, FileCheck } from "lucide-react";

const steps = [
    {
        id: 1,
        title: "Visual Inspection",
        description:
            "Every consignment undergoes a rigorous initial physical inspection to verify grade, color, and grain consistency against NCSCI standards.",
        icon: Microscope,
        image: "/images/quality/inspection.jpg", // Placeholder, will use color block if image missing
    },
    {
        id: 2,
        title: "Chemical Analysis",
        description:
            "Samples are sent to our ISO 22000 certified labs for comprehensive chemical testing, including moisture content, polarization, and purity checks.",
        icon: FlaskConical,
        image: "/images/quality/lab-testing.jpg",
    },
    {
        id: 3,
        title: "Final Certification",
        description:
            "Only batches that meet 100% of the specifications receive the NCSCI Seal of Quality and are cleared for dispatch to our partners.",
        icon: FileCheck,
        image: "/images/quality/certification.jpg",
    },
];

export default function QualityProcess() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (sectionRef.current && containerRef.current) {
            const ctx = createHorizontalScrollPin({
                trigger: sectionRef.current,
                container: containerRef.current,
                scrollDistance: 2 / 3, // Move 200vw (2/3 of 300vw container)
                end: "+=2000",
            });

            return () => {
                ctx.kill();
            };
        }
    }, []);

    return (
        <section ref={sectionRef} className="relative h-screen overflow-hidden bg-neutral-900 text-white">
            <div className="absolute top-12 left-6 md:left-16 z-10">
                <ScrollReveal delay={0.2}>
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white/90">
                        The Process
                    </h2>
                </ScrollReveal>
            </div>

            <div
                ref={containerRef}
                className="flex h-full items-center pl-6 md:pl-16 pt-24"
                style={{ width: "300%" }} // 3 panels
            >
                {steps.map((step) => (
                    <div key={step.id} className="w-screen h-full flex flex-col md:flex-row items-center justify-center gap-12 px-6 md:px-16 shrink-0">
                        <div className="w-full md:w-1/2 space-y-6">
                            <div className="w-16 h-16 rounded-full bg-neutral-800 flex items-center justify-center border border-neutral-700">
                                <step.icon className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-3xl md:text-5xl font-bold">
                                <span className="text-neutral-500 text-xl block mb-2">0{step.id}</span>
                                {step.title}
                            </h3>
                            <p className="text-lg text-neutral-400 max-w-md leading-relaxed">
                                {step.description}
                            </p>
                        </div>

                        <div className="w-full md:w-1/2 h-[50vh] md:h-[60vh] relative bg-neutral-800 rounded-2xl overflow-hidden border border-neutral-700/50">
                            {/* Placeholder for image */}
                            <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center">
                                <step.icon className="w-32 h-32 text-neutral-700 opacity-20" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

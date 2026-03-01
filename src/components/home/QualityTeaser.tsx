'use client';

import TransitionLink from '@/components/ui/TransitionLink';
import ScrollReveal from '@/components/ui/ScrollReveal';



export default function QualityTeaser() {
    return (
        <section className="relative h-[80vh] w-full overflow-hidden text-white border-t border-neutral-200">
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
                <ScrollReveal width="100%">
                    <div className="max-w-4xl mx-auto space-y-8">
                        <h2 className="text-xs md:text-sm font-extrabold uppercase tracking-[0.3em] text-blue-400 drop-shadow-md">
                            Scientific Precision
                        </h2>

                        <h3 className="text-3xl md:text-5xl font-extrabold tracking-tighter leading-[0.9] drop-shadow-lg">
                            Quality Control <br />
                            <span className="text-neutral-200">Infrastructure</span>
                        </h3>

                        <p className="text-base md:text-lg text-white max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-md">
                            Every commodity undergoes rigorous 3-stage testing in our NABL accredited laboratories to ensure zero-defect compliance.
                        </p>

                        <div className="pt-8">
                            <TransitionLink
                                href="/quality-control"
                                className="inline-block px-8 py-4 border-2 border-white rounded-full hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-widest text-sm font-bold"
                            >
                                Explore Standards
                            </TransitionLink>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}

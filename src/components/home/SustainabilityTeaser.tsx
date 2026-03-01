'use client';

import TransitionLink from '@/components/ui/TransitionLink';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function SustainabilityTeaser() {
    return (
        <section className="relative h-[80vh] w-full bg-transparent text-black overflow-hidden border-t border-neutral-200">
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 text-black">
                <ScrollReveal width="100%">
                    <div className="max-w-5xl mx-auto space-y-8">
                        <h2 className="text-xs md:text-sm font-extrabold uppercase tracking-[0.3em] text-green-700 drop-shadow-sm">
                            Responsible Growth
                        </h2>

                        <h3 className="text-3xl md:text-5xl font-extrabold tracking-tighter leading-[0.9] drop-shadow-md">
                            Sustainable <br />
                            <span className="text-neutral-700">Future</span>
                        </h3>

                        <p className="text-base md:text-lg text-black max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-sm">
                            Empowering 50,000+ farmers through fair trade practices and climate-resilient agriculture.
                        </p>

                        <div className="pt-8">
                            <TransitionLink
                                href="/sustainability"
                                className="inline-block px-8 py-4 border-2 border-black rounded-full hover:bg-black hover:text-white transition-all duration-300 uppercase tracking-widest text-sm font-extrabold"
                            >
                                Our Impact
                            </TransitionLink>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}

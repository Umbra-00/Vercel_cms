'use client';

import TransitionLink from '@/components/ui/TransitionLink';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function MarketIntelligenceTeaser() {
    return (
        <section className="relative h-[80vh] w-full bg-transparent text-white overflow-hidden border-t border-neutral-200">
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
                <ScrollReveal width="100%">
                    <div className="max-w-5xl mx-auto space-y-8">
                        <h2 className="text-xs md:text-sm font-extrabold uppercase tracking-[0.3em] text-green-400 drop-shadow-md">
                            Live Insights
                        </h2>

                        <h3 className="text-3xl md:text-5xl font-extrabold tracking-tighter leading-[0.9] drop-shadow-lg">
                            Market <br />
                            <span className="text-neutral-200">Intelligence</span>
                        </h3>

                        <p className="text-base md:text-lg text-white max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-md">
                            Real-time pricing algorithms and global supply chain analytics to empower your procurement decisions.
                        </p>

                        <div className="pt-8">
                            <TransitionLink
                                href="/market-intelligence"
                                className="inline-block px-8 py-4 bg-white text-black rounded-full hover:bg-neutral-200 transition-all duration-300 uppercase tracking-widest text-sm font-extrabold shadow-lg"
                            >
                                Access Terminal
                            </TransitionLink>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}

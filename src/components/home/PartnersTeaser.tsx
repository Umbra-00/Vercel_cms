'use client';

import { motion } from "framer-motion";
import TransitionLink from "@/components/ui/TransitionLink";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function PartnersTeaser() {

    return (
        <section
            id="partners"
            className="relative min-h-screen w-full overflow-hidden bg-transparent text-black flex flex-col justify-center py-32"
        >
            {/* Content */}
            <div className="relative z-10 container mx-auto px-6 text-center">
                <ScrollReveal width="100%">
                    <motion.div
                        className="space-y-10 flex flex-col items-center py-20 px-12"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="overflow-hidden">
                            <motion.h2
                                className="text-5xl md:text-7xl font-extrabold tracking-tighter hover:tracking-wide transition-all duration-700 drop-shadow-lg"
                                whileHover={{ scale: 1.05 }}
                            >
                                Trusted <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 inline-block hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-500">
                                    Network
                                </span>
                            </motion.h2>
                        </div>

                        <div className="overflow-hidden">
                            <p className="text-xl text-black max-w-lg leading-relaxed hover:text-neutral-700 transition-colors duration-500 font-medium">
                                Partnering with industry leaders to ensure seamless execution across
                                the supply chain.
                            </p>
                        </div>

                        {/* Partner Count Stats */}
                        <div className="grid grid-cols-2 gap-8 mt-6">
                            <motion.div
                                className="group px-8 py-5 rounded-xl border-2 border-neutral-900 transition-all duration-500 cursor-pointer"
                                whileHover={{
                                    scale: 1.1,
                                    backgroundColor: "rgba(0,0,0,0.05)"
                                }}
                            >
                                <p className="text-4xl font-extrabold text-black group-hover:text-blue-600 transition-colors">50+</p>
                                <p className="text-sm text-neutral-600 uppercase tracking-wide font-semibold">Partners</p>
                            </motion.div>
                            <motion.div
                                className="group px-8 py-5 rounded-xl border-2 border-neutral-900 transition-all duration-500 cursor-pointer"
                                whileHover={{
                                    scale: 1.1,
                                    backgroundColor: "rgba(0,0,0,0.05)"
                                }}
                            >
                                <p className="text-4xl font-extrabold text-black group-hover:text-purple-600 transition-colors">15+</p>
                                <p className="text-sm text-neutral-600 uppercase tracking-wide font-semibold">Countries</p>
                            </motion.div>
                        </div>

                        <div className="mt-4">
                            <TransitionLink
                                href="/partners"
                                className="group inline-flex items-center justify-center px-10 py-5 bg-black text-white rounded-full text-lg font-medium uppercase tracking-wide hover:bg-neutral-800 transition-all duration-500 hover:scale-110"
                            >
                                <span className="relative z-10 flex items-center gap-3">
                                    View Partners
                                    <motion.span
                                        className="inline-block"
                                        animate={{ x: [0, 5, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        →
                                    </motion.span>
                                </span>
                            </TransitionLink>
                        </div>
                    </motion.div>
                </ScrollReveal>
            </div>
        </section>
    );
}

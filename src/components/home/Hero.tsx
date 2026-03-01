'use client';

import Link from 'next/link';
import { motion, useScroll } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const heroStats = [
  { label: 'Pan-India Mandis', value: '160+' },
  { label: 'Active Warehouses', value: '42' },
  { label: 'Monthly Throughput', value: '85K MT' },
];

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [showExpanded, setShowExpanded] = useState(false);

  // Removed unused scrollYProgress
  useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // 2-second delay before expanding
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isHovered) {
      // First animate underline, then after 2 seconds, expand text
      timer = setTimeout(() => {
        setShowExpanded(true);
      }, 2000);
    } else {
      // Avoid synchronous state update warning
      timer = setTimeout(() => setShowExpanded(false), 0);
    }
    return () => clearTimeout(timer);
  }, [isHovered]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen px-6 md:px-20 lg:px-32 pt-40 pb-32 flex flex-col justify-center overflow-hidden"
    >

      <div className="w-full max-w-[1600px] mx-auto">

        {/* Main Content */}
        <div className="flex flex-col gap-16">
          {/* NCSCI with letter expansion transformation */}
          <div
            className="cursor-default relative inline-block w-fit overflow-visible"
            style={{ minHeight: '12vw' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative whitespace-nowrap flex items-baseline">
              {/* Text that expands - capital letters stay large, rest appears smaller */}
              <motion.h1
                className="text-[10vw] lg:text-[6vw] font-black leading-[0.85] text-white drop-shadow-lg flex items-baseline"
                animate={{
                  columnGap: showExpanded ? '1.5vw' : '0.02em',
                  letterSpacing: showExpanded ? '0.02em' : '-0.02em'
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <span>
                  N<motion.span
                    className="text-[4vw] lg:text-[2.5vw] font-light"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{
                      width: showExpanded ? 'auto' : 0,
                      opacity: showExpanded ? 1 : 0
                    }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'baseline' }}
                  >ational</motion.span>
                </span>
                <span>C<motion.span
                  className="text-[4vw] lg:text-[2.5vw] font-light"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{
                    width: showExpanded ? 'auto' : 0,
                    opacity: showExpanded ? 1 : 0
                  }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                  style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'baseline' }}
                >ommodity</motion.span>
                </span>
                <span>S<motion.span
                  className="text-[4vw] lg:text-[2.5vw] font-light"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{
                    width: showExpanded ? 'auto' : 0,
                    opacity: showExpanded ? 1 : 0
                  }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                  style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'baseline' }}
                >upply</motion.span>
                </span>
                <span>C<motion.span
                  className="text-[4vw] lg:text-[2.5vw] font-light"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{
                    width: showExpanded ? 'auto' : 0,
                    opacity: showExpanded ? 1 : 0
                  }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                  style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'baseline' }}
                >orporation</motion.span>
                </span>
                <motion.span
                  className="text-[4vw] lg:text-[2.5vw] font-light"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{
                    width: showExpanded ? 'auto' : 0,
                    opacity: showExpanded ? 1 : 0
                  }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: 0.4 }}
                  style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'baseline' }}
                >of</motion.span>
                <span>I<motion.span
                  className="text-[4vw] lg:text-[2.5vw] font-light"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{
                    width: showExpanded ? 'auto' : 0,
                    opacity: showExpanded ? 1 : 0
                  }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
                  style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'baseline' }}
                >ndia</motion.span>
                </span>
              </motion.h1>

              {/* Underline - completes first, then stays while text expands */}
              <motion.span
                className="absolute -bottom-2 left-0 h-0.5 bg-white origin-left shadow-lg"
                animate={{
                  width: isHovered ? '100%' : '0%'
                }}
                transition={{
                  duration: 1.8,
                  ease: "easeInOut"
                }}
              />
            </div>
          </div>

          <motion.div
            className="flex flex-col gap-12 max-w-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <motion.p
              className="text-xl md:text-2xl text-white leading-relaxed font-light tracking-wide drop-shadow-md"
              whileHover={{ letterSpacing: '0.02em' }}
              transition={{ duration: 0.3 }}
            >
              Forging the Future of Commodities — Sugar, Rice, Wheat & Oils Delivered with Unrivalled Clarity
            </motion.p>

            <div className="flex flex-wrap gap-6">
              <Link href="/contact">
                <motion.button
                  className="group relative px-10 py-5 bg-white text-black rounded-none overflow-hidden border border-white"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 text-xs uppercase tracking-[0.2em] font-bold">
                    Start Trading
                  </span>
                </motion.button>
              </Link>
              <Link href="/products">
                <motion.button
                  className="px-10 py-5 border-2 border-white text-white rounded-none text-xs uppercase tracking-[0.2em] font-bold hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View Commodities
                </motion.button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-3 gap-12 mt-12 pt-12 border-t border-white/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {heroStats.map((stat) => (
              <motion.div
                key={stat.label}
                className="space-y-2 group cursor-pointer"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <p className="text-4xl md:text-5xl font-light text-white tracking-tight group-hover:text-blue-400 transition-colors drop-shadow-md">{stat.value}</p>
                <p className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-neutral-300 group-hover:text-white transition-colors font-medium drop-shadow-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}

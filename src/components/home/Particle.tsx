'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Particle() {
  const [randomValues, setRandomValues] = useState({
    x: 0,
    y: 0,
    yEnd: -100,
    duration: 2,
    delay: 0,
  });

  useEffect(() => {
    setRandomValues({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      yEnd: Math.random() * -200 - 100,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    });
  }, []);

  return (
    <motion.div
      className="absolute w-1 h-1 bg-white/20 rounded-full"
      initial={{ x: randomValues.x, y: randomValues.y }}
      animate={{
        y: [null, randomValues.yEnd],
        opacity: [0, 1, 0],
      }}
      transition={{
        duration: randomValues.duration,
        repeat: Infinity,
        delay: randomValues.delay,
      }}
    />
  );
}

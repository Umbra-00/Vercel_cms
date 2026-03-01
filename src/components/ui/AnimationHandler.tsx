"use client";

import React, { useEffect, useRef } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { motion, useAnimation, useInView, Variants } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type AnimationType = "lottie" | "gsap" | "framer";
type TriggerType = "scroll" | "hover" | "click" | "autoplay";

interface AnimationHandlerProps {
  type: AnimationType;
  trigger?: TriggerType;
  animationData?: any; // For Lottie
  lottieRef?: React.RefObject<LottieRefCurrentProps | null>;
  className?: string;
  children?: React.ReactNode; // For Framer/GSAP wrappers
  
  // Framer Motion specific
  framerVariants?: Variants;
  framerTransition?: any;
  
  // GSAP specific
  gsapConfig?: any; // Custom GSAP config
  
  // General
  delay?: number;
  duration?: number;
  loop?: boolean;
  autoplay?: boolean;
}

const AnimationHandler: React.FC<AnimationHandlerProps> = ({
  type,
  trigger = "autoplay",
  animationData,
  lottieRef,
  className = "",
  children,
  framerVariants,
  framerTransition,
  gsapConfig,
  delay = 0,
  duration = 1,
  loop = true,
  autoplay = true,
}) => {
  // --- Lottie Implementation ---
  if (type === "lottie" && animationData) {
    return (
      <div className={className} onMouseEnter={trigger === 'hover' ? () => lottieRef?.current?.play() : undefined} onMouseLeave={trigger === 'hover' ? () => lottieRef?.current?.stop() : undefined} onClick={trigger === 'click' ? () => lottieRef?.current?.play() : undefined}>
        <Lottie
          lottieRef={lottieRef}
          animationData={animationData}
          loop={loop}
          autoplay={trigger === "autoplay" && autoplay}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    );
  }

  // --- Framer Motion Implementation ---
  if (type === "framer") {
    const controls = useAnimation();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: !loop, margin: "-100px" });

    useEffect(() => {
      if (trigger === "scroll" && isInView) {
        controls.start("visible");
      } else if (trigger === "autoplay") {
        controls.start("visible");
      }
    }, [controls, isInView, trigger]);

    const defaultVariants: Variants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    };

    return (
      <motion.div
        ref={ref}
        className={className}
        initial="hidden"
        animate={controls}
        whileHover={trigger === "hover" ? "visible" : undefined}
        whileTap={trigger === "click" ? "visible" : undefined}
        variants={framerVariants || defaultVariants}
        transition={framerTransition || { duration: duration, delay: delay, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    );
  }

  // --- GSAP Implementation ---
  if (type === "gsap") {
    const elRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!elRef.current) return;

      const ctx = gsap.context(() => {
        if (trigger === "scroll") {
          gsap.fromTo(
            elRef.current,
            gsapConfig?.from || { opacity: 0, y: 50 },
            {
              ...gsapConfig?.to,
              opacity: 1,
              y: 0,
              duration: duration,
              delay: delay,
              scrollTrigger: {
                trigger: elRef.current,
                start: "top 80%",
                toggleActions: loop ? "play none none reverse" : "play none none none",
                ...gsapConfig?.scrollTrigger,
              },
            }
          );
        } else if (trigger === "autoplay") {
            gsap.fromTo(
                elRef.current,
                gsapConfig?.from || { opacity: 0, y: 50 },
                {
                    ...gsapConfig?.to,
                    opacity: 1,
                    y: 0,
                    duration: duration,
                    delay: delay,
                }
            );
        }
        // Implement hover/click via standard React events or GSAP event listeners if needed
      }, elRef);

      return () => ctx.revert();
    }, [trigger, duration, delay, loop, gsapConfig]);

    return (
      <div ref={elRef} className={className}>
        {children}
      </div>
    );
  }

  return <>{children}</>;
};

export default AnimationHandler;

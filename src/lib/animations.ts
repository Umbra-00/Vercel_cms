"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
}

type SplitTextOptions = {
  trigger?: string | Element | null;
  start?: string;
  once?: boolean;
  delay?: number;
  duration?: number;
  stagger?: number;
  ease?: string;
};

export const animateSplitTextOnScroll = (
  selector: string,
  {
    trigger = selector,
    start = "top 80%",
    once = true,
    delay = 0,
    duration = 0.9,
    stagger = 0.02,
    ease = "power3.out",
  }: SplitTextOptions = {},
) => {
  return gsap.to(`${selector} .split-letter`, {
    scrollTrigger: {
      trigger,
      start,
      toggleActions: once ? "play none none none" : "play none none reverse",
    },
    delay,
    duration,
    y: 0,
    opacity: 1,
    ease,
    stagger,
  });
};

type SplitTextLoadOptions = {
  delay?: number;
  duration?: number;
  stagger?: number;
  ease?: string;
  y?: number;
};

export const animateSplitTextOnLoad = (
  selector: string,
  {
    delay = 0,
    duration = 1,
    stagger = 0.015,
    ease = "power4.out",
    y = 0,
  }: SplitTextLoadOptions = {},
) => {
  return gsap.to(`${selector} .split-letter`, {
    delay,
    duration,
    y,
    opacity: 1,
    ease,
    stagger,
  });
};

type FadeInOptions = {
  trigger?: string | Element | null;
  start?: string;
  once?: boolean;
  delay?: number;
  duration?: number;
  y?: number;
  stagger?: number;
  ease?: string;
};

export const fadeInUpOnScroll = (
  target: string,
  {
    trigger = target,
    start = "top 85%",
    once = true,
    delay = 0,
    duration = 0.9,
    y = 40,
    stagger = 0,
    ease = "power3.out",
  }: FadeInOptions = {},
) => {
  return gsap.fromTo(
    target,
    {
      y,
      opacity: 0,
    },
    {
      scrollTrigger: {
        trigger,
        start,
        toggleActions: once ? "play none none none" : "play none none reverse",
      },
      delay,
      duration,
      y: 0,
      opacity: 1,
      ease,
      stagger,
    },
  );
};

type MagneticOptions = {
  movement?: number;
  duration?: number;
};

export const attachMagneticHover = (
  element: HTMLElement | null,
  { movement = 25, duration = 1 }: MagneticOptions = {},
) => {
  if (!element) return () => { };

  const xTo = gsap.quickTo(element, "x", {
    duration,
    ease: "elastic.out(1, 0.4)",
  });
  const yTo = gsap.quickTo(element, "y", {
    duration,
    ease: "elastic.out(1, 0.4)",
  });

  const handleMouseMove = (event: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const relX = ((event.clientX - rect.left) / rect.width - 0.5) * movement;
    const relY = ((event.clientY - rect.top) / rect.height - 0.5) * movement;
    xTo(relX);
    yTo(relY);
  };

  const handleMouseLeave = () => {
    xTo(0);
    yTo(0);
  };

  element.addEventListener("mousemove", handleMouseMove);
  element.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    element.removeEventListener("mousemove", handleMouseMove);
    element.removeEventListener("mouseleave", handleMouseLeave);
  };
};

// Enhanced magnetic effect with text separation
type EnhancedMagneticOptions = {
  magnetoStrength?: number;
  magnetoTextStrength?: number;
  duration?: number;
};

export const attachEnhancedMagneticHover = (
  element: HTMLElement | null,
  textElement: HTMLElement | null,
  { magnetoStrength = 70, magnetoTextStrength = 50, duration = 1 }: EnhancedMagneticOptions = {},
) => {
  if (!element || !textElement) return () => { };

  const xDivTo = gsap.quickTo(element, "x", {
    duration,
    ease: "elastic.out(1, 0.3)",
  });
  const yDivTo = gsap.quickTo(element, "y", {
    duration,
    ease: "elastic.out(1, 0.3)",
  });
  const xTextTo = gsap.quickTo(textElement, "x", {
    duration,
    ease: "elastic.out(1, 0.3)",
  });
  const yTextTo = gsap.quickTo(textElement, "y", {
    duration,
    ease: "elastic.out(1, 0.3)",
  });

  const handleMouseMove = (event: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const { clientX, clientY } = event;
    const { width, height, left, top } = rect;

    const newX = ((clientX - left) / width - 0.5) * magnetoStrength;
    const newY = ((clientY - top) / height - 0.5) * magnetoTextStrength;

    xDivTo(newX);
    yDivTo(newY);
    xTextTo(newX);
    yTextTo(newY);
  };

  const handleMouseLeave = () => {
    xDivTo(0);
    yDivTo(0);
    xTextTo(0);
    yTextTo(0);
  };

  element.addEventListener("mousemove", handleMouseMove);
  element.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    element.removeEventListener("mousemove", handleMouseMove);
    element.removeEventListener("mouseleave", handleMouseLeave);
  };
};

// Navbar scale animation
export const animateNavbarScale = (selector: string, trigger: string) => {
  return gsap.to(selector, {
    scrollTrigger: {
      trigger: trigger,
      start: "bottom center",
      toggleActions: "play none none reverse",
    },
    duration: 0.6,
    scale: 1,
    ease: "power1",
  });
};

// Enhanced section leave animation
export const animateSectionLeave = (selector: string) => {
  return gsap.to(selector, {
    yPercent: -10,
    scale: 0.95,
    ease: "power1",
    scrollTrigger: {
      trigger: selector,
      start: "75% bottom",
      scrub: 1,
    },
  });
};

// Reset utilities
export const resetOpacity = (selector: string, opacity: number = 0) => {
  gsap.set(selector, { opacity });
};

export const resetY = (selector: string, y: string = "100%") => {
  gsap.set(selector, { y });
};

export const resetX = (selector: string, x: string = "100%") => {
  gsap.set(selector, { x });
};

// Smooth transitions
export const yToZero = (selector: string, duration: number = 0.4) => {
  return gsap.to(selector, {
    y: 0,
    duration,
    ease: "power1.inOut",
    stagger: 0.1,
  });
};

export const xToZero = (selector: string) => {
  return gsap.to(selector, {
    x: 0,
    duration: 0.4,
    ease: "power1.inOut",
    stagger: 0.1,
    scrollTrigger: {
      trigger: selector,
      toggleActions: "play none none reverse",
    },
  });
};

// NEW: Horizontal scroll pin utility
type HorizontalScrollOptions = {
  trigger: string | Element;
  container: string | Element;
  scrollDistance?: number;
  start?: string;
  end?: string;
  scrub?: number | boolean;
};

export const createHorizontalScrollPin = ({
  trigger,
  container,
  scrollDistance = 3,
  start = "top top",
  end = "+=300%",
  scrub = 1,
}: HorizontalScrollOptions) => {
  return gsap.to(container, {
    xPercent: -100 * scrollDistance,
    ease: "none",
    scrollTrigger: {
      trigger,
      pin: true,
      start,
      end,
      scrub,
      anticipatePin: 1,
    },
  });
};

// NEW: Parallax layer utility
type ParallaxLayerConfig = {
  selector: string;
  speed: number;
};

export const createParallaxLayer = (
  layers: ParallaxLayerConfig[],
  trigger: string | Element,
) => {
  const animations: gsap.core.Tween[] = [];

  layers.forEach(({ selector, speed }) => {
    const tween = gsap.to(selector, {
      xPercent: -100 * speed,
      ease: "none",
      scrollTrigger: {
        trigger,
        start: "top top",
        end: "+=300%",
        scrub: 1,
      },
    });
    animations.push(tween);
  });

  return animations;
};

// NEW: Blur reveal animation
type BlurRevealOptions = {
  trigger?: string | Element;
  start?: string;
  blurStart?: number;
  blurEnd?: number;
  duration?: number;
  ease?: string;
};

export const createBlurReveal = (
  selector: string | Element,
  {
    trigger = selector,
    start = "top center",
    blurStart = 20,
    blurEnd = 0,
    duration = 0.3,
    ease = "power4.out",
  }: BlurRevealOptions = {},
) => {
  // Set initial state
  gsap.set(selector, {
    filter: `blur(${blurStart}px)`,
    opacity: 0,
  });

  return gsap.to(selector, {
    filter: `blur(${blurEnd}px)`,
    opacity: 1,
    duration,
    ease,
    scrollTrigger: {
      trigger,
      start,
      toggleActions: "play none none reverse",
    },
  });
};

// NEW: Clip-path image reveal
type RevealImageOptions = {
  trigger?: string | Element;
  start?: string;
  duration?: number;
  delay?: number;
  ease?: string;
  direction?: "bottom" | "center" | "left" | "right";
};

export const revealImage = (
  selector: string | Element,
  {
    trigger = selector,
    start = "top 85%",
    duration = 1.2,
    delay = 0,
    ease = "power3.inOut",
    direction = "bottom",
  }: RevealImageOptions = {},
) => {
  let clipPathStart = "inset(100% 0 0 0)";
  const clipPathEnd = "inset(0% 0 0 0)";

  if (direction === "center") clipPathStart = "inset(50% 0 50% 0)";
  if (direction === "left") clipPathStart = "inset(0 100% 0 0)";
  if (direction === "right") clipPathStart = "inset(0 0 0 100%)";

  gsap.set(selector, { clipPath: clipPathStart });

  return gsap.to(selector, {
    clipPath: clipPathEnd,
    duration,
    delay,
    ease,
    scrollTrigger: {
      trigger,
      start,
      toggleActions: "play none none reverse",
    },
  });
};

// NEW: Simple Parallax Image
type ParallaxImageOptions = {
  trigger?: string | Element;
  yPercent?: number;
  scale?: number;
};

export const parallaxImage = (
  selector: string | Element,
  { trigger = selector, yPercent = 20, scale = 1.1 }: ParallaxImageOptions = {},
) => {
  gsap.set(selector, { scale });

  return gsap.to(selector, {
    yPercent: -yPercent,
    ease: "none",
    scrollTrigger: {
      trigger,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
};

// NEW: Staggered Text Reveal (Lines/Words)
type StaggerTextOptions = {
  trigger?: string | Element;
  start?: string;
  stagger?: number;
  y?: number;
  duration?: number;
};

export const staggerText = (
  selector: string, // Target the parent container or specific elements
  {
    trigger = selector,
    start = "top 85%",
    stagger = 0.05,
    y = 50,
    duration = 1,
  }: StaggerTextOptions = {},
) => {
  // Assumes children are the lines/words/chars
  return gsap.fromTo(
    selector,
    { y, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration,
      stagger,
      ease: "power3.out",
      scrollTrigger: {
        trigger,
        start,
        toggleActions: "play none none reverse",
      },
    },
  );
};

// NEW: Velocity Skew Animation
export const animateSkewOnVelocity = (
  selector: string | Element,
  { maxSkew = 20, sensitivity = 300 }: { maxSkew?: number; sensitivity?: number } = {}
) => {
  const proxy = { skew: 0 };
  const skewSetter = gsap.quickSetter(selector, "skewY", "deg");
  const clamp = gsap.utils.clamp(-maxSkew, maxSkew);

  return ScrollTrigger.create({
    trigger: document.body, // Global scroll velocity
    start: "top top",
    end: "bottom bottom",
    onUpdate: (self) => {
      const skew = clamp(self.getVelocity() / -sensitivity);
      if (Math.abs(skew) > Math.abs(proxy.skew)) {
        proxy.skew = skew;
        gsap.to(proxy, {
          skew: 0,
          duration: 0.8,
          ease: "power3",
          overwrite: true,
          onUpdate: () => skewSetter(proxy.skew),
        });
      }
    },
  });
};

// NEW: Line Draw Animation (SVG Path)
export const animateLineDraw = (
  selector: string | Element,
  { trigger, start = "top 80%", duration = 1.5 }: { trigger?: string | Element; start?: string; duration?: number } = {}
) => {
  const element = typeof selector === "string" ? document.querySelector(selector) : selector;
  if (!element) return;

  const length = (element as SVGPathElement).getTotalLength();

  gsap.set(element, {
    strokeDasharray: length,
    strokeDashoffset: length,
  });

  return gsap.to(element, {
    strokeDashoffset: 0,
    duration,
    ease: "power2.inOut",
    scrollTrigger: {
      trigger: trigger || element,
      start,
      toggleActions: "play none none reverse",
    },
  });
};

// NEW: Enhanced Magnetic Card Effect
type MagneticCardOptions = {
  magnetStrength?: number;
  duration?: number;
  ease?: string;
  scaleOnHover?: number;
};

export const createMagneticCard = (
  element: HTMLElement | null,
  {
    magnetStrength = 40,
    duration = 0.6,
    ease = "power2.out",
    scaleOnHover = 1.02,
  }: MagneticCardOptions = {}
) => {
  if (!element) return () => { };

  const xTo = gsap.quickTo(element, "x", { duration, ease });
  const yTo = gsap.quickTo(element, "y", { duration, ease });

  const handleMouseMove = (event: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const relX = ((event.clientX - rect.left) / rect.width - 0.5) * magnetStrength;
    const relY = ((event.clientY - rect.top) / rect.height - 0.5) * magnetStrength;

    xTo(relX);
    yTo(relY);
    gsap.to(element, { scale: scaleOnHover, duration: 0.3, ease: "power2.out" });
  };

  const handleMouseLeave = () => {
    xTo(0);
    yTo(0);
    gsap.to(element, { scale: 1, duration: 0.3, ease: "power2.out" });
  };

  element.addEventListener("mousemove", handleMouseMove);
  element.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    element.removeEventListener("mousemove", handleMouseMove);
    element.removeEventListener("mouseleave", handleMouseLeave);
  };
};

// NEW: Counter Animation for Statistics
type CounterOptions = {
  duration?: number;
  ease?: string;
  decimals?: number;
  suffix?: string;
  prefix?: string;
};

export const animateCounter = (
  element: HTMLElement | null,
  targetValue: number,
  {
    duration = 2,
    ease = "power2.out",
    decimals = 0,
    suffix = "",
    prefix = "",
  }: CounterOptions = {}
) => {
  if (!element) return;

  const counter = { value: 0 };

  return gsap.to(counter, {
    value: targetValue,
    duration,
    ease,
    onUpdate: () => {
      const displayValue = decimals > 0
        ? counter.value.toFixed(decimals)
        : Math.round(counter.value);
      element.textContent = `${prefix}${displayValue}${suffix}`;
    },
    scrollTrigger: {
      trigger: element,
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
  });
};

// NEW: Floating Animation for Badges/Icons
type FloatingOptions = {
  yRange?: number;
  duration?: number;
  ease?: string;
  delay?: number;
};

export const createFloatingAnimation = (
  selector: string | Element,
  {
    yRange = 10,
    duration = 2.5,
    ease = "power1.inOut",
    delay = 0,
  }: FloatingOptions = {}
) => {
  return gsap.to(selector, {
    y: `+=${yRange}`,
    duration,
    ease,
    delay,
    repeat: -1,
    yoyo: true,
  });
};

// NEW: 3D Depth Hover Effect
type DepthHoverOptions = {
  rotateX?: number;
  rotateY?: number;
  scale?: number;
  shadowIntensity?: number;
};

export const createDepthHover = (
  element: HTMLElement | null,
  {
    rotateX = 10,
    rotateY = 10,
    scale = 1.05,
    shadowIntensity = 0.3,
  }: DepthHoverOptions = {}
) => {
  if (!element) return () => { };

  const handleMouseMove = (event: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const percentX = (event.clientX - centerX) / (rect.width / 2);
    const percentY = (event.clientY - centerY) / (rect.height / 2);

    gsap.to(element, {
      rotationY: percentX * rotateY,
      rotationX: -percentY * rotateX,
      scale,
      transformPerspective: 1000,
      boxShadow: `0 ${20 * shadowIntensity}px ${40 * shadowIntensity}px rgba(0,0,0,${0.2 * shadowIntensity})`,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(element, {
      rotationY: 0,
      rotationX: 0,
      scale: 1,
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      duration: 0.5,
      ease: "power2.out",
    });
  };

  element.addEventListener("mousemove", handleMouseMove);
  element.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    element.removeEventListener("mousemove", handleMouseMove);
    element.removeEventListener("mouseleave", handleMouseLeave);
  };
};

// NEW: Sparkline Animation (SVG Path)
export const animateSparkline = (
  pathElement: SVGPathElement | null,
  {
    duration = 1.5,
    delay = 0,
    ease = "power2.inOut",
  }: { duration?: number; delay?: number; ease?: string } = {}
) => {
  if (!pathElement) return;

  const length = pathElement.getTotalLength();

  gsap.set(pathElement, {
    strokeDasharray: length,
    strokeDashoffset: length,
  });

  return gsap.to(pathElement, {
    strokeDashoffset: 0,
    duration,
    delay,
    ease,
    scrollTrigger: {
      trigger: pathElement,
      start: "top 90%",
      toggleActions: "play none none reverse",
    },
  });
};

// NEW: Smooth Number Transition
export const animateNumberChange = (
  element: HTMLElement | null,
  newValue: number,
  { duration = 0.8, decimals = 0 }: { duration?: number; decimals?: number } = {}
) => {
  if (!element) return;

  const currentValue = parseFloat(element.textContent || "0");
  const counter = { value: currentValue };

  return gsap.to(counter, {
    value: newValue,
    duration,
    ease: "power2.out",
    onUpdate: () => {
      const displayValue = decimals > 0
        ? counter.value.toFixed(decimals)
        : Math.round(counter.value);
      element.textContent = displayValue.toString();
    },
  });
};


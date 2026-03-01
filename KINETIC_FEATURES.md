# Umbra Kinetic Features Implementation

## Overview
Four high-kinetic animation features have been implemented for the Umbra platform, focusing on physics-based interactions and velocity distortion effects.

---

## 🎬 Task 1: Page Transition (Global)

**File:** `src/components/ui/PageTransition.tsx`

### Features:
- **Black curtain slide-up animation** using `expo.in/out` easing
- **Parallax text effect** - page title moves slower than background
- **Smooth route transitions** - animation completes before navigation

### Usage:
```tsx
// Already integrated in your layout
// Use TransitionLink for navigation:
import TransitionLink from "@/components/ui/TransitionLink";

<TransitionLink href="/market-intelligence" pageTitle="MARKET">
  Go to Market Intelligence
</TransitionLink>
```

### How it works:
1. Click triggers exit animation (black div slides up from bottom)
2. Page title appears in massive white text with parallax effect
3. After screen is fully black, router navigates to new page
4. On new page, black div slides up and away

---

## 📊 Task 2: Market Intelligence Ticker

**File:** `src/components/home/MarketTicker.tsx`

### Features:
- **Infinite marquee** - Row 1 moves left, Row 2 moves right
- **Velocity-based skew** - Text leans based on scroll speed (max 20deg)
- **Hover interaction** - Pauses marquee and resets skew
- **Lenis integration** - Hooks into smooth scroll velocity

### Usage:
```tsx
import MarketTicker from "@/components/home/MarketTicker";

<MarketTicker />
```

### Customization:
Edit the `commodities` array to change displayed items:
```tsx
const commodities = [
  "SUGAR M-30",
  "WHEAT",
  "RICE",
  // Add more...
];
```

---

## ♻️ Task 3: Sustainability Cycle

**File:** `src/components/home/SustainabilityCycle.tsx`

### Features:
- **Pinned section** - Stays fixed for 200% viewport height
- **360° rotation** - Circle rotates as user scrolls through
- **Counter-rotating text** - Stage labels stay upright
- **Three stages** - Sowing, Harvest, Distribution

### Usage:
```tsx
import SustainabilityCycle from "@/components/home/SustainabilityCycle";

<SustainabilityCycle />
```

### Customization:
Modify the `cycleStages` array:
```tsx
const cycleStages = [
  { label: "Sowing", angle: 0 },
  { label: "Harvest", angle: 120 },
  { label: "Distribution", angle: 240 },
  // Add more stages with different angles
];
```

---

## 🚚 Task 4: Logistics Tunnel

**File:** `src/components/home/LogisticsTunnel.tsx`

### Features:
- **3D perspective** - CSS `perspective: 1000px`
- **Z-axis animation** - Cards fly forward from `-1000px` to `500px`
- **Fade out effect** - Cards disappear when passing `z > 500`
- **Scroll-driven** - Animation synced with scroll progress
- **Grid layout** - 4x5 partner cards

### Usage:
```tsx
import LogisticsTunnel from "@/components/home/LogisticsTunnel";

<LogisticsTunnel />
```

### Customization:
Adjust the number of partners or categories:
```tsx
const categories = ["Logistics", "Warehousing", "Transport", "Cold Chain"];

// Change loop count for more/fewer cards
for (let i = 0; i < 20; i++) {
  // ...
}
```

---

## 🎨 Technical Details

### Animation Stack:
- **GSAP 3.13** - Core animation engine
- **ScrollTrigger** - Scroll-based animations
- **Lenis 1.3** - Smooth scroll integration
- **Tailwind CSS 4** - Styling

### Performance Optimizations:
- `willChange: "transform"` on animated elements
- `gsap.context()` for proper cleanup
- `transformStyle: "preserve-3d"` for 3D transforms
- RAF (requestAnimationFrame) for velocity tracking

### Browser Compatibility:
- Modern browsers with CSS transforms support
- Hardware acceleration enabled
- Fallback for non-3D transform browsers

---

## 🚀 Example Integration

Create a demo page to showcase all features:

```tsx
// src/app/kinetic-demo/page.tsx
import MarketTicker from "@/components/home/MarketTicker";
import SustainabilityCycle from "@/components/home/SustainabilityCycle";
import LogisticsTunnel from "@/components/home/LogisticsTunnel";

export default function KineticDemo() {
  return (
    <main>
      <MarketTicker />
      <SustainabilityCycle />
      <LogisticsTunnel />
    </main>
  );
}
```

---

## 📝 Notes

1. **PageTransition** is global - already integrated in your layout
2. **MarketTicker** requires Lenis to be initialized (already done in SmoothScroll)
3. **SustainabilityCycle** works best with 200vh+ scroll space
4. **LogisticsTunnel** requires 200vh minimum height for full effect

All components use `gsap.context()` for automatic cleanup and follow React best practices.

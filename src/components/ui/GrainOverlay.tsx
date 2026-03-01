export default function GrainOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[60] opacity-[0.03] mix-blend-overlay pointer-events-none">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <filter id="noiseFilter">
                <feTurbulence type="fractalNoise" baseFrequency="0.6" stitchTiles="stitch"/>
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)"/>
        </svg>
    </div>
  );
}

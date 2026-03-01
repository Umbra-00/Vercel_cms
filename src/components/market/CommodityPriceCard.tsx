"use client";

import { useEffect, useRef } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { createMagneticCard, animateSparkline } from "@/lib/animations";
import type { CommodityPrice } from "@/data/market-data";

interface CommodityPriceCardProps {
    commodity: CommodityPrice;
    index?: number;
}

export default function CommodityPriceCard({ commodity, index = 0 }: CommodityPriceCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const sparklinePathRef = useRef<SVGPathElement>(null);

    useEffect(() => {
        // Magnetic card effect
        let cleanup: (() => void) | undefined;
        if (cardRef.current) {
            cleanup = createMagneticCard(cardRef.current, {
                magnetStrength: 25,
                scaleOnHover: 1.03,
            });
        }

        // Sparkline animation
        if (sparklinePathRef.current) {
            animateSparkline(sparklinePathRef.current, {
                duration: 1.5,
                delay: index * 0.1,
            });
        }

        return () => {
            if (cleanup) cleanup();
        };
    }, [index]);

    const getTrendIcon = () => {
        if (commodity.trend === "up") return <TrendingUp className="w-5 h-5" />;
        if (commodity.trend === "down") return <TrendingDown className="w-5 h-5" />;
        return <Minus className="w-5 h-5" />;
    };

    const getTrendColor = () => {
        if (commodity.trend === "up") return "text-green-500";
        if (commodity.trend === "down") return "text-red-500";
        return "text-slate-500";
    };

    const getChangeColor = () => {
        if (commodity.changePercent > 0) return "text-green-500 bg-green-500/10";
        if (commodity.changePercent < 0) return "text-red-500 bg-red-500/10";
        return "text-slate-500 bg-slate-500/10";
    };

    // Generate SVG path from sparkline data
    const generateSparklinePath = () => {
        const points = commodity.sparklineData;
        const width = 100;
        const height = 40;
        const minValue = Math.min(...points);
        const maxValue = Math.max(...points);
        const range = maxValue - minValue || 1;

        const pathData = points
            .map((value, i) => {
                const x = (i / (points.length - 1)) * width;
                const y = height - ((value - minValue) / range) * height;
                return i === 0 ? `M ${x},${y}` : `L ${x},${y}`;
            })
            .join(" ");

        return pathData;
    };

    return (
        <div
            ref={cardRef}
            className="group relative bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-all duration-300 cursor-pointer overflow-hidden"
            style={{ transformStyle: "preserve-3d" }}
        >
            {/* Background Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Content */}
            <div className="relative z-10">
                {/* Header Row */}
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h3 className="text-xl font-bold text-white mb-1">{commodity.name}</h3>
                        <p className="text-sm text-slate-400 uppercase tracking-wider">{commodity.region}</p>
                    </div>
                    <div className={`${getTrendColor()}`}>
                        {getTrendIcon()}
                    </div>
                </div>

                {/* Price Row */}
                <div className="mb-4">
                    <div className="text-3xl font-bold text-white mb-1">
                        ₹{commodity.currentPrice.toLocaleString("en-IN")}
                    </div>
                    <div className="text-sm text-slate-400">{commodity.unit}</div>
                </div>

                {/* Change Row */}
                <div className="flex items-center gap-2 mb-4">
                    <span className={`px-2 py-1 rounded-md text-sm font-semibold ${getChangeColor()}`}>
                        {commodity.changePercent > 0 && "+"}
                        {commodity.changePercent.toFixed(2)}%
                    </span>
                    <span className="text-sm text-slate-400">
                        {commodity.change > 0 && "+"}
                        ₹{commodity.change}
                    </span>
                </div>

                {/* Sparkline Chart */}
                <div className="relative h-10 mb-4">
                    <svg
                        className="w-full h-full"
                        viewBox="0 0 100 40"
                        preserveAspectRatio="none"
                    >
                        <path
                            ref={sparklinePathRef}
                            d={generateSparklinePath()}
                            fill="none"
                            stroke={commodity.trend === "up" ? "#22c55e" : commodity.trend === "down" ? "#ef4444" : "#64748b"}
                            strokeWidth="2"
                            vectorEffect="non-scaling-stroke"
                        />
                    </svg>
                </div>

                {/* Footer Row */}
                <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Volume: {commodity.volume.toLocaleString("en-IN")} MT</span>
                    <span className="uppercase">{commodity.category}</span>
                </div>
            </div>

            {/* Hover Glow Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl" />
            </div>
        </div>
    );
}

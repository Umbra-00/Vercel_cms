"use client";

import { useEffect, useRef, useState } from "react";
import { animateLineDraw } from "@/lib/animations";

interface LiveChartProps {
    commodity?: string;
    currentPrice?: number;
}

export default function LiveChart({ commodity = "Wheat", currentPrice = 2850 }: LiveChartProps) {
    const chartPathRef = useRef<SVGPathElement>(null);
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const [historicalData, setHistoricalData] = useState<{ date: string; price: number }[]>([]);

    useEffect(() => {
        // Generate historical data based on currentPrice
        const data = [];
        const basePrice = currentPrice;
        
        for (let i = 30; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            // Random variation +/- 5% plus some trend
            const randomVariation = (Math.random() - 0.5) * (basePrice * 0.1); 
            // Simulate a trend or just noise
            const price = basePrice + randomVariation; 
            
            data.push({
                date: date.toISOString().split('T')[0],
                price: Math.round(price)
            });
        }
        setHistoricalData(data);
    }, [commodity, currentPrice]);

    useEffect(() => {
        if (chartPathRef.current && historicalData.length > 0) {
            animateLineDraw(chartPathRef.current, {
                duration: 2,
                start: "top 70%",
            });
        }
    }, [historicalData]);

    // Generate SVG path from historical data
    const generateChartPath = () => {
        if (historicalData.length === 0) return "";
        
        const points = historicalData;
        const width = 600;
        const height = 300;
        const minValue = Math.min(...points.map(p => p.price));
        const maxValue = Math.max(...points.map(p => p.price));
        const range = maxValue - minValue || 1;

        const pathData = points
            .map((point, i) => {
                const x = (i / (points.length - 1)) * width;
                const y = height - ((point.price - minValue) / range) * (height - 40) - 20;
                return i === 0 ? `M ${x},${y}` : `L ${x},${y}`;
            })
            .join(" ");

        return pathData;
    };

    // Format date labels
    const getDateLabels = () => {
        const step = Math.floor(historicalData.length / 6);
        return historicalData
            .filter((_, i) => i % step === 0)
            .map(point => {
                const date = new Date(point.date);
                return date.toLocaleDateString("en-IN", { month: "short", day: "numeric" });
            });
    };

    const getPriceLabels = () => {
        if (historicalData.length === 0) return [];
        const prices = historicalData.map(p => p.price);
        const min = Math.min(...prices);
        const max = Math.max(...prices);
        const step = (max - min) / 4;
        return Array.from({ length: 5 }, (_, i) => Math.round(min + step * i));
    };

    return (
        <div ref={chartContainerRef} className="relative w-full h-full bg-slate-900/50 rounded-xl border border-slate-800 p-6">
            <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                    {commodity} Price Trend
                </h3>
                <p className="text-sm text-slate-400">Last 30 Days</p>
            </div>

            {/* Chart Container */}
            <div className="relative w-full aspect-video">
                {/* Grid Background */}
                <div className="absolute inset-0 grid grid-cols-6 grid-rows-5">
                    {Array.from({ length: 30 }).map((_, i) => (
                        <div key={i} className="border border-slate-800/30" />
                    ))}
                </div>

                {/* Price Labels (Y-Axis) */}
                <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-slate-500 pr-2">
                    {getPriceLabels().reverse().map((price, i) => (
                        <span key={i}>₹{price.toLocaleString("en-IN")}</span>
                    ))}
                </div>

                {/* SVG Chart */}
                <svg
                    className="absolute inset-0 w-full h-full pl-16 pr-4 pt-2 pb-8"
                    viewBox="0 0 600 300"
                    preserveAspectRatio="none"
                >
                    {/* Area Fill */}
                    <defs>
                        <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    {historicalData.length > 0 && (
                        <>
                            <path
                                d={`${generateChartPath()} L 600,300 L 0,300 Z`}
                                fill="url(#chartGradient)"
                            />

                            {/* Line */}
                            <path
                                ref={chartPathRef}
                                d={generateChartPath()}
                                fill="none"
                                stroke="#3b82f6"
                                strokeWidth="3"
                                vectorEffect="non-scaling-stroke"
                            />
                        </>
                    )}

                    {/* Data Points */}
                    {historicalData.map((point, i) => {
                         if (historicalData.length === 0) return null;
                        const x = (i / (historicalData.length - 1)) * 600;
                        const minValue = Math.min(...historicalData.map(p => p.price));
                        const maxValue = Math.max(...historicalData.map(p => p.price));
                        const range = maxValue - minValue || 1;
                        const y = 300 - ((point.price - minValue) / range) * 260 - 20;

                        return (
                            <circle
                                key={i}
                                cx={x}
                                cy={y}
                                r="4"
                                fill="#3b82f6"
                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                            />
                        );
                    })}
                </svg>

                {/* Date Labels (X-Axis) */}
                <div className="absolute bottom-0 left-16 right-4 flex justify-between text-xs text-slate-500 pt-2">
                    {getDateLabels().map((label, i) => (
                        <span key={i}>{label}</span>
                    ))}
                </div>
            </div>

            {/* Legend */}
            <div className="mt-6 flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                    <span className="text-slate-400">Market Price</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-px h-4 bg-slate-700" />
                    <span className="text-slate-500">Grid: Daily</span>
                </div>
            </div>
        </div>
    );
}

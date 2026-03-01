"use client";

import { useEffect, useRef } from "react";
import { AlertCircle, TrendingUp, TrendingDown } from "lucide-react";
import { createBlurReveal } from "@/lib/animations";
import type { MarketInsight } from "@/data/market-data";

interface MarketInsightCardProps {
    insight: MarketInsight;
    index?: number;
}

export default function MarketInsightCard({ insight, index = 0 }: MarketInsightCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (cardRef.current) {
            createBlurReveal(cardRef.current, {
                blurStart: 10,
                blurEnd: 0,
                duration: 0.8,
                start: "top 85%",
            });
        }
    }, []);

    const getCategoryColor = () => {
        switch (insight.category) {
            case "bullish":
                return "from-green-500 to-emerald-500";
            case "bearish":
                return "from-red-500 to-rose-500";
            case "alert":
                return "from-orange-500 to-amber-500";
            default:
                return "from-blue-500 to-cyan-500";
        }
    };

    const getCategoryIcon = () => {
        switch (insight.category) {
            case "bullish":
                return <TrendingUp className="w-5 h-5" />;
            case "bearish":
                return <TrendingDown className="w-5 h-5" />;
            case "alert":
                return <AlertCircle className="w-5 h-5" />;
            default:
                return <TrendingUp className="w-5 h-5" />;
        }
    };

    const getImpactBadgeColor = () => {
        switch (insight.impact) {
            case "high":
                return "bg-red-500/20 text-red-400 border-red-500/30";
            case "medium":
                return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
            default:
                return "bg-blue-500/20 text-blue-400 border-blue-500/30";
        }
    };

    return (
        <div
            ref={cardRef}
            className="relative bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-all duration-300"
            style={{
                transitionDelay: `${index * 50}ms`,
            }}
        >
            {/* Gradient Header */}
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${getCategoryColor()} rounded-t-xl`} />

            {/* Header Row */}
            <div className="flex items-start justify-between mb-4 mt-2">
                <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${getCategoryColor()}`}>
                        <div className="text-white">
                            {getCategoryIcon()}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white mb-1">
                            {insight.title}
                        </h3>
                        <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded-md border text-xs font-semibold uppercase ${getImpactBadgeColor()}`}>
                                {insight.impact} Impact
                            </span>
                            <span className="text-xs text-slate-500">
                                {new Date(insight.date).toLocaleDateString("en-IN", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric"
                                })}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Description */}
            <p className="text-slate-300 leading-relaxed mb-4">
                {insight.description}
            </p>

            {/* Affected Commodities */}
            <div>
                <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">
                    Affected Commodities
                </div>
                <div className="flex flex-wrap gap-2">
                    {insight.commodities.map((commodity, i) => (
                        <span
                            key={i}
                            className="px-3 py-1 bg-slate-800/50 border border-slate-700 rounded-full text-sm text-slate-300"
                        >
                            {commodity}
                        </span>
                    ))}
                </div>
            </div>

            {/* Hover Glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl overflow-hidden">
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${getCategoryColor()} opacity-20 rounded-full blur-3xl`} />
            </div>
        </div>
    );
}

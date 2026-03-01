"use client";

import { useEffect, useRef } from "react";
import { Warehouse, TrendingUp, Package } from "lucide-react";
import { animateCounter } from "@/lib/animations";
import { SupplyChainMetric } from "@/data/market-data";

interface SupplyChainDashboardProps {
    metrics: SupplyChainMetric[];
}

export default function SupplyChainDashboard({ metrics }: SupplyChainDashboardProps) {
    const statsRefs = useRef<(HTMLSpanElement | null)[]>([]);

    useEffect(() => {
        // Animate counters
        metrics.forEach((metric, i) => {
            const ref = statsRefs.current[i];
            if (ref) {
                animateCounter(ref, metric.utilizationPercent, {
                    duration: 2,
                    suffix: "%",
                    decimals: 0,
                });
            }
        });
    }, []);

    return (
        <section className="py-20 px-6 bg-gradient-to-b from-slate-950 to-slate-900">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Supply Chain Intelligence
                    </h2>
                    <p className="text-lg text-slate-400">
                        Real-time warehouse metrics and logistics across India
                    </p>
                </div>

                {/* Warehouse Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {metrics.map((metric, index) => (
                        <div
                            key={index}
                            className="group relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-all duration-300"
                        >
                            {/* Header */}
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Warehouse className="w-5 h-5 text-blue-400" />
                                        <h3 className="text-xl font-bold text-white">
                                            {metric.warehouse}
                                        </h3>
                                    </div>
                                    <p className="text-sm text-slate-400">{metric.location}</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-3xl font-bold text-white">
                                        <span ref={(el) => { statsRefs.current[index] = el; }}>0</span>
                                    </div>
                                    <div className="text-xs text-slate-500 uppercase">Utilization</div>
                                </div>
                            </div>

                            {/* Utilization Bar */}
                            <div className="relative h-3 bg-slate-800 rounded-full overflow-hidden mb-6">
                                <div
                                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-1000"
                                    style={{
                                        width: `${metric.utilizationPercent}%`,
                                        transitionDelay: `${index * 100}ms`,
                                    }}
                                />
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-3 gap-4 mb-6">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-white mb-1">
                                        {(metric.stockLevel / 1000).toFixed(0)}K
                                    </div>
                                    <div className="text-xs text-slate-500 uppercase">Stock MT</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-white mb-1">
                                        {(metric.capacity / 1000).toFixed(0)}K
                                    </div>
                                    <div className="text-xs text-slate-500 uppercase">Capacity</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-cyan-400 mb-1">
                                        {(metric.inTransit / 1000).toFixed(1)}K
                                    </div>
                                    <div className="text-xs text-slate-500 uppercase">In Transit</div>
                                </div>
                            </div>

                            {/* Commodities Breakdown */}
                            <div>
                                <div className="text-xs text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <Package className="w-4 h-4" />
                                    Commodity Breakdown
                                </div>
                                <div className="space-y-2">
                                    {metric.commodities.slice(0, 3).map((commodity, i) => {
                                        const percentage = (commodity.quantity / metric.stockLevel) * 100;
                                        return (
                                            <div key={i} className="flex items-center justify-between text-sm">
                                                <span className="text-slate-400">{commodity.name}</span>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-blue-500 rounded-full transition-all duration-700"
                                                            style={{
                                                                width: `${percentage}%`,
                                                                transitionDelay: `${(index + i) * 100}ms`,
                                                            }}
                                                        />
                                                    </div>
                                                    <span className="text-white font-semibold w-16 text-right">
                                                        {commodity.quantity.toLocaleString("en-IN")} {commodity.unit}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Status Indicator */}
                            <div className="absolute top-4 right-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-xs text-slate-500">Live</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Summary Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6 text-center">
                        <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-3" />
                        <div className="text-3xl font-bold text-white mb-1">
                            {metrics.reduce((sum, m) => sum + m.stockLevel, 0).toLocaleString("en-IN")}
                        </div>
                        <div className="text-sm text-slate-400">Total Stock (MT)</div>
                    </div>
                    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6 text-center">
                        <Package className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                        <div className="text-3xl font-bold text-white mb-1">
                            {metrics.length}
                        </div>
                        <div className="text-sm text-slate-400">Active Warehouses</div>
                    </div>
                    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6 text-center">
                        <Warehouse className="w-8 h-8 text-cyan-500 mx-auto mb-3" />
                        <div className="text-3xl font-bold text-white mb-1">
                            {Math.round(
                                metrics.reduce((sum, m) => sum + m.utilizationPercent, 0) /
                                metrics.length || 0
                            )}%
                        </div>
                        <div className="text-sm text-slate-400">Avg Utilization</div>
                    </div>
                </div>
            </div>
        </section>
    );
}

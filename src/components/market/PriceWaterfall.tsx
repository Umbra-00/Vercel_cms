"use client";

import { CommodityPrice } from "@/data/market-data";

interface PriceWaterfallProps {
    prices: CommodityPrice[];
}

export default function PriceWaterfall({ prices }: PriceWaterfallProps) {
    return (
        <section className="py-16 px-6 bg-slate-950 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                    Live Market Prices
                </h2>

                {/* Column Headers */}
                <div className="grid grid-cols-4 md:grid-cols-5 gap-4 px-4 py-3 border-b border-slate-800 text-xs md:text-sm text-slate-400 uppercase tracking-wider font-semibold mb-4">
                    <div className="col-span-2 md:col-span-1">Commodity</div>
                    <div className="hidden md:block">Region</div>
                    <div className="text-right">Price</div>
                    <div className="text-right">Change</div>
                    <div className="hidden md:block text-right">Volume</div>
                </div>

                {/* Price Feed */}
                <div className="space-y-2">
                    {prices.map((item) => {
                        const isPositive = item.changePercent > 0;
                        const isNegative = item.changePercent < 0;

                        return (
                            <div
                                key={item.id}
                                className="group grid grid-cols-4 md:grid-cols-5 gap-4 px-4 py-4 bg-slate-900/50 hover:bg-slate-900 border border-slate-800/50 hover:border-slate-700 rounded-lg transition-all duration-300 cursor-pointer"
                            >
                                {/* Commodity Name */}
                                <div className="col-span-2 md:col-span-1 flex flex-col justify-center">
                                    <span className="text-white font-semibold text-base md:text-lg truncate">
                                        {item.name}
                                    </span>
                                    <span className="text-xs text-slate-500 md:hidden">{item.region}</span>
                                </div>

                                {/* Region (Desktop Only) */}
                                <div className="hidden md:flex items-center text-slate-400 text-sm">
                                    {item.region}
                                </div>

                                {/* Price */}
                                <div className="flex flex-col items-end justify-center">
                                    <span className="text-white font-bold text-base md:text-xl">
                                        ₹{item.currentPrice.toLocaleString("en-IN")}
                                    </span>
                                    <span className="text-xs text-slate-500">{item.unit}</span>
                                </div>

                                {/* Change */}
                                <div className="flex flex-col items-end justify-center">
                                    <span
                                        className={`font-semibold text-sm md:text-base ${isPositive
                                                ? "text-green-500"
                                                : isNegative
                                                    ? "text-red-500"
                                                    : "text-slate-400"
                                            }`}
                                    >
                                        {isPositive && "+"}
                                        {item.changePercent.toFixed(2)}%
                                    </span>
                                    <span className="text-xs text-slate-500">
                                        {isPositive && "+"}₹{item.change}
                                    </span>
                                </div>

                                {/* Volume (Desktop Only) */}
                                <div className="hidden md:flex items-center justify-end text-slate-400 text-sm">
                                    {item.volume.toLocaleString("en-IN")} MT
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

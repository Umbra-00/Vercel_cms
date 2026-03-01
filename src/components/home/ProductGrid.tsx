"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/products/ProductCard";
import { products as allProducts, Product } from "@/data/products";
import { motion } from "framer-motion";
import Link from "next/link";
import AnimationHandler from "@/components/ui/AnimationHandler";

export default function ProductGrid() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate fetch
        const timer = setTimeout(() => {
            setProducts(allProducts.slice(0, 4));
            setLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="py-20 px-6 md:px-12">
                <div className="max-w-[1800px] mx-auto">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 border-4 border-neutral-200 border-t-neutral-900 rounded-full animate-spin"></div>
                        <p className="text-neutral-500 font-medium">Loading commodities...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="py-20 px-6 md:px-12">
            <div className="max-w-[1800px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight text-white mb-4 drop-shadow-lg">
                        Premium Commodities
                    </h2>
                    <p className="text-neutral-200 max-w-2xl mx-auto text-lg drop-shadow-md">
                        Explore our premium selection of agro-commodities and edible oils
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {products.map((product, index) => (
                        <AnimationHandler
                            key={product.id}
                            type="framer"
                            trigger="scroll"
                            delay={index * 0.1}
                            duration={0.6}
                            framerVariants={{
                                hidden: { opacity: 0, y: 50, scale: 0.95 },
                                visible: { opacity: 1, y: 0, scale: 1 }
                            }}
                            className="h-[450px]"
                        >
                            <ProductCard product={product as any} />
                        </AnimationHandler>
                    ))}
                </div>

                <div className="text-center">
                    <AnimationHandler
                        type="framer"
                        trigger="hover"
                        className="inline-block"
                        framerVariants={{
                            hidden: { scale: 1 },
                            visible: { scale: 1.05 }
                        }}
                    >
                        <Link
                            href="/products"
                            className="inline-flex items-center gap-2 bg-white hover:bg-neutral-200 text-black px-8 py-4 rounded-lg font-bold uppercase tracking-wider transition-all duration-300 shadow-lg"
                        >
                            View All Products
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </Link>
                    </AnimationHandler>
                </div>
            </div>
        </div>
    );
}

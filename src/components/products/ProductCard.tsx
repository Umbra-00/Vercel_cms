'use client';

import { motion } from 'framer-motion';
import { ShoppingCart, Eye } from 'lucide-react';

interface ProductProps {
    id: string;
    name: string;
    category: string;
    price: string | number;
    image: string;
    commodity?: string;
    grade?: string;
    stockStatus?: string;
    origin?: string;
    cropYear?: string;
    packaging?: string;
    [key: string]: unknown;
}

interface ProductCardProps {
    product: ProductProps;
}

import { useRouter } from 'next/navigation';

// ... imports

export default function ProductCard({ product }: ProductCardProps) {
    const router = useRouter();
    const displayPrice = typeof product.price === 'number'
        ? `₹${product.price.toLocaleString()}`
        : product.price;

    const handleCardClick = () => {
        router.push(`/commodities/${product.id}`);
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={handleCardClick}
            className="group relative bg-white rounded-lg overflow-hidden border border-neutral-200 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5 cursor-pointer"
        >
            {/* Image Container */}
            <div className="aspect-[4/3] relative overflow-hidden bg-neutral-50 flex items-center justify-center">
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-60 group-hover:opacity-50 transition-opacity duration-300 z-10" />

                {/* Abstract Pattern / Placeholder */}
                <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

                {/* Commodity Icon/Text */}
                <div className="relative z-0 text-center px-4">
                    <div className="w-16 h-16 mx-auto mb-2 bg-white border border-neutral-100 rounded-full flex items-center justify-center text-3xl shadow-sm">
                        🌾
                    </div>
                    <span className="text-sm font-bold text-neutral-500 uppercase tracking-widest">
                        {product.commodity || product.category}
                    </span>
                </div>

                {/* Actions Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20 flex gap-2">
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            handleCardClick();
                        }}
                        className="flex-1 bg-white text-neutral-900 py-2 rounded font-medium text-xs uppercase tracking-wide flex items-center justify-center gap-2 hover:bg-neutral-50 transition-colors shadow-lg border border-neutral-100"
                    >
                        <Eye className="w-3.5 h-3.5" /> View Specs
                    </button>
                    <button className="flex-1 bg-blue-600 text-white py-2 rounded font-medium text-xs uppercase tracking-wide flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-lg">
                        <ShoppingCart className="w-3.5 h-3.5" /> Quote
                    </button>
                </div>

                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-10">
                    <div className="flex flex-col items-start gap-1">
                        <span className="bg-white/90 backdrop-blur-md text-neutral-900 text-[10px] font-bold px-2 py-1 rounded border border-neutral-200 uppercase tracking-wide shadow-sm">
                            Grade: {product.grade || 'Standard'}
                        </span>
                    </div>
                    {product.stockStatus === 'Limited Stock' && (
                        <span className="bg-red-50 text-red-600 border border-red-100 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide shadow-sm flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                            Limited
                        </span>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                <div className="mb-3">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-[9px] font-bold text-blue-600 uppercase tracking-widest border border-blue-100 bg-blue-50 px-1.5 py-0.5 rounded">
                            {product.category.split(' ')[0]}
                        </span>
                        <span className="text-[9px] font-medium text-neutral-400 uppercase tracking-wider">
                            Ref: NCSCI-{product.id}
                        </span>
                    </div>
                    <h3 className="text-base font-bold text-neutral-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                        {product.name}
                    </h3>
                </div>

                {/* B2B Details Grid */}
                <div className="grid grid-cols-2 gap-y-2 gap-x-2 mb-4 text-[11px] text-neutral-600 bg-neutral-50 p-2 rounded border border-neutral-100">
                    <div className="flex flex-col">
                        <span className="text-[9px] text-neutral-400 uppercase">Origin</span>
                        <span className="font-medium text-neutral-900 truncate">{product.origin || 'India'}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[9px] text-neutral-400 uppercase">Crop Year</span>
                        <span className="font-medium text-neutral-900">{product.cropYear || '2024'}</span>
                    </div>
                    <div className="flex flex-col col-span-2">
                        <span className="text-[9px] text-neutral-400 uppercase">Packaging</span>
                        <span className="font-medium text-neutral-900 truncate">{product.packaging || 'Standard'}</span>
                    </div>
                </div>

                <div className="flex items-end justify-between pt-2 border-t border-neutral-100">
                    <div>
                        <p className="text-[10px] text-neutral-400 uppercase tracking-wide font-medium">MSP / Indicative</p>
                        <p className="text-lg font-bold text-neutral-900">
                            {displayPrice}
                            <span className="text-[10px] font-normal text-neutral-400 ml-1">/ Qtl</span>
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

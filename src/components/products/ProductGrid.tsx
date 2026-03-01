'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/data/products';
import ProductCard from './ProductCard';


interface ProductGridProps {
    products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
    const [visibleCount, setVisibleCount] = useState(12);

    // Reset visible count when products array changes (e.g. filters applied)
    useEffect(() => {
        setVisibleCount(12);
    }, [products]);

    const visibleProducts = products.slice(0, visibleCount);
    const hasMore = visibleCount < products.length;

    const loadMore = () => {
        setVisibleCount((prev) => prev + 12);
    };

    if (products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl">🔍</span>
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">No products found</h3>
                <p className="text-neutral-500 max-w-md">
                    We couldn&apos;t find any products matching your current filters. Try adjusting your search or filter criteria.
                </p>
            </div>
        );
    }

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                {visibleProducts.map((product) => (
                    <ProductCard key={product.id} product={product as any} />
                ))}
            </div>

            {hasMore && (
                <div className="mt-12 flex justify-center">
                    <button
                        onClick={loadMore}
                        className="px-8 py-3 bg-white border border-neutral-200 text-neutral-900 font-medium rounded-full hover:bg-neutral-50 transition-colors shadow-sm"
                    >
                        Load More Products ({products.length - visibleCount} remaining)
                    </button>
                </div>
            )}
        </>
    );
}

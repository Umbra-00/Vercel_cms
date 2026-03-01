"use client";



interface ProductFiltersProps {
    categories: string[];
    selectedCategory: string | null;
    onSelectCategory: (category: string | null) => void;
}

export default function ProductFilters({
    categories,
    selectedCategory,
    onSelectCategory,
}: ProductFiltersProps) {
    return (
        <div className="space-y-8">
            <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 mb-4">
                    Categories
                </h3>
                <div className="space-y-2">
                    <button
                        onClick={() => onSelectCategory(null)}
                        className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedCategory === null
                                ? "bg-neutral-900 text-white font-medium"
                                : "text-neutral-600 hover:bg-neutral-100"
                            }`}
                    >
                        All Products
                    </button>
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => onSelectCategory(category)}
                            className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedCategory === category
                                    ? "bg-neutral-900 text-white font-medium"
                                    : "text-neutral-600 hover:bg-neutral-100"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Price Range Mock */}
            <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 mb-4">
                    Price Range
                </h3>
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <input
                            type="range"
                            min="0"
                            max="10000"
                            className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-neutral-900"
                        />
                    </div>
                    <div className="flex justify-between text-xs text-neutral-500">
                        <span>$0</span>
                        <span>$10,000+</span>
                    </div>
                </div>
            </div>

            {/* Availability Mock */}
            <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 mb-4">
                    Availability
                </h3>
                <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900" />
                        <span className="text-sm text-neutral-600">In Stock Only</span>
                    </label>
                </div>
            </div>
        </div>
    );
}

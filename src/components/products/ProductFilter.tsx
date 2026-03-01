'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NextImage from 'next/image';
import { Product } from '@/data/products';
import { ChevronDown, ChevronUp, X, Filter, Search, Check } from 'lucide-react';

interface FilterState {
    search: string;
    divisions: string[]; // Business divisions
    commodities: string[];
    origins: string[];
    cropYears: string[];
}

interface ProductFilterProps {
    products: Product[]; // Products from CMS
    onFilterChange: (filteredProducts: Product[]) => void;
    isOpen: boolean;
    onClose: () => void;
}

// Map purpose to business divisions
const DIVISION_MAP: Record<string, string> = {
    'Domestic Use': 'Internal Trade',
    'Export Quality': 'International Trade',
    'PDS/Welfare': 'Govt Operations (PSS/MIS)',
    'Industrial': 'Industrial Activities'
};

export default function ProductFilter({ products, onFilterChange, isOpen, onClose }: ProductFilterProps) {
    const [filters, setFilters] = useState<FilterState>({
        search: '',
        divisions: [],
        commodities: [],
        origins: [],
        cropYears: [],
    });

    // Derive available options from actual CMS products
    const options = useMemo(() => {
        // Get all divisions from products
        const allDivisions = Array.from(new Set(
            products.map(p => DIVISION_MAP[p.purpose] || 'Other').filter(Boolean)
        )).sort();

        // Filter by divisions first
        const divisionFiltered = filters.divisions.length > 0
            ? products.filter(p => filters.divisions.includes(DIVISION_MAP[p.purpose] || 'Other'))
            : products;

        const commodities = Array.from(new Set(divisionFiltered.map(p => p.commodity).filter(Boolean))).sort();

        // Filter by commodity
        const commodityFiltered = filters.commodities.length > 0
            ? divisionFiltered.filter(p => filters.commodities.includes(p.commodity))
            : divisionFiltered;

        const origins = Array.from(new Set(commodityFiltered.map(p => p.origin).filter(Boolean))).sort();
        const cropYears = Array.from(new Set(commodityFiltered.map(p => p.cropYear).filter(Boolean))).sort();

        return { allDivisions, commodities, origins, cropYears };
    }, [products, filters.divisions, filters.commodities]);

    // Apply filters
    useEffect(() => {
        const filtered = products.filter((product) => {
            const matchSearch = product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                product.commodity?.toLowerCase().includes(filters.search.toLowerCase());
            const matchDivision = filters.divisions.length === 0 || filters.divisions.includes(DIVISION_MAP[product.purpose] || 'Other');
            const matchCommodity = filters.commodities.length === 0 || filters.commodities.includes(product.commodity);
            const matchOrigin = filters.origins.length === 0 || filters.origins.includes(product.origin);
            const matchYear = filters.cropYears.length === 0 || filters.cropYears.includes(product.cropYear);

            return matchSearch && matchDivision && matchCommodity && matchOrigin && matchYear;
        });
        onFilterChange(filtered);
    }, [filters, products, onFilterChange]);

    const toggleFilter = (key: keyof FilterState, value: string) => {
        setFilters((prev) => {
            const current = prev[key] as string[];
            const updated = current.includes(value)
                ? current.filter((item) => item !== value)
                : [...current, value];

            if (key === 'divisions') {
                return { ...prev, [key]: updated, commodities: [] };
            }

            return { ...prev, [key]: updated };
        });
    };

    const clearFilters = () => {
        setFilters({
            search: '',
            divisions: [],
            commodities: [],
            origins: [],
            cropYears: [],
        });
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
                    />
                )}
            </AnimatePresence>

            <aside
                className={`fixed inset-y-0 left-0 z-[60] w-80 bg-white border-r border-neutral-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)] ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
                style={{ overscrollBehavior: 'contain' }}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="p-6 border-b border-neutral-200 flex justify-between items-start flex-shrink-0 bg-blue-50">
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <NextImage
                                    src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
                                    alt="Government of India"
                                    width={12}
                                    height={20}
                                    className="w-3 h-auto opacity-80"
                                />
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-600">
                                    Government of India
                                </p>
                            </div>
                            <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-3">
                                <Filter className="w-5 h-5 text-blue-700" strokeWidth={2.5} />
                                Filter Commodities
                            </h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="lg:hidden p-2 hover:bg-neutral-100 rounded-full transition-colors text-neutral-600"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Scrollable Content - ISOLATED SCROLL */}
                    <div
                        className="flex-1 overflow-y-auto overscroll-contain p-6 space-y-8 pb-32 custom-scrollbar"
                        onWheel={(e) => e.stopPropagation()}
                    >
                        {/* Search */}
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 group-focus-within:text-blue-600 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search commodity, variety..."
                                value={filters.search}
                                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                                className="w-full pl-11 pr-4 py-3 bg-white border border-neutral-200 rounded-xl text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"
                            />
                        </div>

                        {/* Business Division */}
                        {options.allDivisions.length > 0 && (
                            <FilterSection title="Business Division" count={filters.divisions.length}>
                                {options.allDivisions.map((division) => (
                                    <Checkbox
                                        key={division}
                                        label={division}
                                        checked={filters.divisions.includes(division)}
                                        onChange={() => toggleFilter('divisions', division)}
                                    />
                                ))}
                            </FilterSection>
                        )}

                        {/* Commodity */}
                        {options.commodities.length > 0 && (
                            <FilterSection title="Commodity" count={filters.commodities.length}>
                                <div className="max-h-[200px] overflow-y-auto overscroll-contain space-y-3 pr-2 custom-scrollbar">
                                    {options.commodities.map((item) => (
                                        <Checkbox
                                            key={item}
                                            label={item}
                                            checked={filters.commodities.includes(item)}
                                            onChange={() => toggleFilter('commodities', item)}
                                        />
                                    ))}
                                </div>
                            </FilterSection>
                        )}

                        {/* State of Origin */}
                        {options.origins.length > 0 && (
                            <FilterSection title="State of Origin" count={filters.origins.length}>
                                {options.origins.map((item) => (
                                    <Checkbox
                                        key={item}
                                        label={item}
                                        checked={filters.origins.includes(item)}
                                        onChange={() => toggleFilter('origins', item)}
                                    />
                                ))}
                            </FilterSection>
                        )}

                        {/* Crop Year */}
                        {options.cropYears.length > 0 && (
                            <FilterSection title="Crop Year" count={filters.cropYears.length}>
                                {options.cropYears.map((item) => (
                                    <Checkbox
                                        key={item}
                                        label={item}
                                        checked={filters.cropYears.includes(item)}
                                        onChange={() => toggleFilter('cropYears', item)}
                                    />
                                ))}
                            </FilterSection>
                        )}

                        {/* Empty State */}
                        {products.length === 0 && (
                            <div className="text-center py-8 text-neutral-500">
                                <p className="text-sm">No products available in CMS.</p>
                                <p className="text-xs mt-1">Add products via the Admin Panel.</p>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="pt-6 border-t border-neutral-200 space-y-3">
                            <button className="w-full py-3.5 bg-blue-700 text-white rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-blue-800 transition-colors flex items-center justify-center gap-2 shadow-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                    <polyline points="7 10 12 15 17 10" />
                                    <line x1="12" x2="12" y1="15" y2="3" />
                                </svg>
                                Download Daily Rates
                            </button>

                            <button
                                onClick={clearFilters}
                                className="w-full py-3 text-sm text-neutral-500 hover:text-neutral-900 border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-all font-medium"
                            >
                                Reset All Filters
                            </button>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}

function FilterSection({ title, children, count }: { title: string; children: React.ReactNode; count: number }) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="border-b border-neutral-100 pb-6 last:border-0 last:pb-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full py-1 text-left group"
            >
                <span className="font-bold text-neutral-800 text-[15px] flex items-center gap-3 group-hover:text-blue-700 transition-colors">
                    {title}
                    {count > 0 && (
                        <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-1.5 py-0.5 rounded">
                            {count}
                        </span>
                    )}
                </span>
                {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-neutral-400 group-hover:text-blue-700 transition-colors" />
                ) : (
                    <ChevronDown className="w-4 h-4 text-neutral-400 group-hover:text-blue-700 transition-colors" />
                )}
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="pt-4 space-y-3">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function Checkbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
    return (
        <label className="flex items-center gap-3 cursor-pointer group select-none py-0.5">
            <div className={`w-[18px] h-[18px] rounded-[4px] border flex items-center justify-center transition-all duration-200 ${checked
                    ? 'bg-blue-600 border-blue-600'
                    : 'border-neutral-300 bg-white group-hover:border-blue-400'
                }`}>
                {checked && <Check className="w-3 h-3 text-white" strokeWidth={4} />}
            </div>
            <input
                type="checkbox"
                className="hidden"
                checked={checked}
                onChange={onChange}
            />
            <span className={`text-[14px] transition-colors ${checked ? 'text-blue-700 font-medium' : 'text-neutral-600 group-hover:text-neutral-900'
                }`}>
                {label}
            </span>
        </label>
    );
}

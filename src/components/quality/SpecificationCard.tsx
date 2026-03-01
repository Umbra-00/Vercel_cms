"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

type Spec = {
  label: string;
  value: string;
  benchmark: string;
};

type SpecCategory = {
  name: string;
  specs: Spec[];
};

interface SpecificationCardProps {
  title: string;
  image: string;
  categories: SpecCategory[];
}

export default function SpecificationCard({ title, image, categories }: SpecificationCardProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group bg-white rounded-3xl overflow-hidden border border-neutral-200 hover:border-neutral-300 hover:shadow-2xl transition-all duration-500 flex flex-col"
    >
      {/* Image Section */}
      <div className="relative h-64 w-full bg-neutral-100 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
        <div className="absolute bottom-6 left-6 text-white">
          <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
          <p className="text-xs font-medium opacity-80 uppercase tracking-widest mt-1">Specification Sheet</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Tabs */}
        <div className="flex gap-4 border-b border-neutral-200 pb-4 mb-6 overflow-x-auto">
          {categories.map((cat, idx) => (
            <button
              key={cat.name}
              onClick={() => setActiveTab(idx)}
              className={`text-xs font-bold uppercase tracking-wider whitespace-nowrap pb-1 transition-colors ${
                activeTab === idx 
                  ? "text-neutral-900 border-b-2 border-neutral-900" 
                  : "text-neutral-400 hover:text-neutral-600"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Specs List */}
        <div className="space-y-4 flex-1">
          {categories[activeTab].specs.map((spec) => (
            <div key={spec.label} className="flex justify-between items-baseline border-b border-neutral-100 last:border-0 pb-2 last:pb-0">
              <span className="text-xs font-medium text-neutral-500 uppercase tracking-wide">{spec.label}</span>
              <div className="text-right">
                <span className="block text-sm font-bold text-neutral-900">{spec.value}</span>
                {spec.benchmark && (
                  <span className="block text-[10px] text-green-600 font-medium">{spec.benchmark}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="mt-8 pt-6 border-t border-neutral-100">
          <button className="w-full py-3 bg-neutral-900 text-white rounded-xl text-sm font-semibold tracking-wide hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2">
            <span>Download Analysis Report</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

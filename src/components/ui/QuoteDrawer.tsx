'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

// Create a simple global store (or use Context) to trigger this
// For now, export the hook to be used in layout or header
export const useQuoteDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  return { isOpen, setIsOpen };
};

export default function QuoteDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[70]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full md:w-[500px] bg-neutral-50 z-[80] shadow-2xl border-l border-neutral-200 p-8 md:p-12 flex flex-col"
          >
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl font-bold uppercase tracking-tight">Request Quote</h2>
              <button onClick={onClose} className="p-2 hover:bg-neutral-200 rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form className="flex-1 flex flex-col gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Commodity</label>
                <select className="w-full bg-transparent border-b border-neutral-300 py-3 focus:outline-none focus:border-neutral-900 transition-colors">
                  <option>Sugar M-30</option>
                  <option>Parimal Rice</option>
                  <option>Wheat Lokwan</option>
                  <option>Soybean Oil</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Quantity (MT)</label>
                <input 
                  type="number" 
                  placeholder="e.g. 500"
                  className="w-full bg-transparent border-b border-neutral-300 py-3 focus:outline-none focus:border-neutral-900 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Email</label>
                <input 
                  type="email" 
                  placeholder="purchasing@company.com"
                  className="w-full bg-transparent border-b border-neutral-300 py-3 focus:outline-none focus:border-neutral-900 transition-colors"
                />
              </div>

              <button className="mt-auto w-full bg-neutral-900 text-white py-4 uppercase tracking-widest text-sm font-bold hover:bg-neutral-800 transition-colors">
                Submit Request
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
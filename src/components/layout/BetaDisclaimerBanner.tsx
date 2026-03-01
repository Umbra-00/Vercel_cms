'use client';

import { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';

export default function BetaDisclaimerBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-yellow-500 text-black px-4 py-2 flex items-center justify-between text-xs sm:text-sm font-medium relative border-b border-yellow-600 shadow-sm shadow-yellow-500/20">
      <div className="flex items-center justify-center w-full gap-2">
        <AlertTriangle className="w-4 h-4 text-black flex-shrink-0" />
        <p className="text-center">
          <strong className="font-bold">DISCLAIMER:</strong> This is a privately operated organization and not affiliated with the Government of India.
        </p>
      </div>
      <button 
        onClick={() => setIsVisible(false)}
        className="text-black/70 hover:text-black transition-colors p-1"
        aria-label="Close disclaimer"
      >
        <X className="w-4 h-4 flex-shrink-0" />
      </button>
    </div>
  );
}

'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-r from-[#1e3a5f] to-[#2d5a8e] text-white border-t-4 border-yellow-500 pt-12 pb-6">
      <div className="w-full px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Column 1: Brand & About */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                 <Image 
                   src="/images/ncsci-logo.svg" 
                   alt="NCSCI Logo" 
                   width={40}
                   height={40}
                   className="w-full h-full object-contain"
                 />
              </div>
              <div className="flex flex-col">
                <h2 className="text-lg font-bold leading-tight font-[Times_New_Roman]">NCSCI</h2>
              </div>
            </div>
            <p className="text-xs text-blue-100 leading-relaxed opacity-90">
              The nodal agency for strategic procurement, storage, and distribution of essential agricultural commodities in India. Ensuring food security and market stability.
            </p>
          </div>

          {/* Column 2: Organization & Commodities */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider mb-4 text-yellow-400">Organization</h3>
            <ul className="space-y-2 text-xs text-blue-100">
              <li><Link href="/about" className="hover:text-white hover:underline transition-all">About Us</Link></li>
              <li><Link href="/history" className="hover:text-white hover:underline transition-all">History</Link></li>
              <li><Link href="/strategies" className="hover:text-white hover:underline transition-all">Strategies</Link></li>
              <li><Link href="/partners" className="hover:text-white hover:underline transition-all">Partners</Link></li>
              <li><Link href="/sustainability" className="hover:text-white hover:underline transition-all">Sustainability</Link></li>
              <li><Link href="/legal" className="hover:text-white hover:underline transition-all">Legal</Link></li>
            </ul>
          </div>

          {/* Column 3: Operations */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider mb-4 text-yellow-400">Operations</h3>
            <ul className="space-y-2 text-xs text-blue-100">
              <li><Link href="/commodities" className="hover:text-white hover:underline transition-all">Commodities</Link></li>
              <li><Link href="/trade" className="hover:text-white hover:underline transition-all">Trade</Link></li>
              <li><Link href="/warehouse" className="hover:text-white hover:underline transition-all">Warehouse Network</Link></li>
              <li><Link href="/quality-control" className="hover:text-white hover:underline transition-all">Quality Control</Link></li>
              <li><Link href="/market-intelligence" className="hover:text-white hover:underline transition-all">Market Intel</Link></li>
            </ul>
          </div>

          {/* Column 4: Resources & Quick Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider mb-4 text-yellow-400">Resources</h3>
            <ul className="space-y-2 text-xs text-blue-100">
              <li><Link href="/payment-gateway" className="hover:text-white hover:underline transition-all">e-Payment Gateway</Link></li>
              <li><Link href="/news" className="hover:text-white hover:underline transition-all">News & Updates</Link></li>
              <li><Link href="/citizen-charter" className="hover:text-white hover:underline transition-all">Citizen Charter</Link></li>
              <li><Link href="/e-procurement" className="hover:text-white hover:underline transition-all">e-Procurement</Link></li>
              <li><Link href="/downloads" className="hover:text-white hover:underline transition-all">Downloads</Link></li>
              <li><Link href="/faqs" className="hover:text-white hover:underline transition-all">FAQs & Support</Link></li>
            </ul>
          </div>

          {/* Column 5: Contact */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider mb-4 text-yellow-400">Contact Us</h3>
            <div className="space-y-3 text-xs text-blue-100">
              <p>
                <strong className="text-white block mb-0.5">Head Office:</strong>
                8-Samajbhushan layout, Flat no. 102,<br />
                Ridhi Sadnika, Gajanan Nagar,<br />
                Wardha Road, Nagpur-440015
              </p>
              <p>
                <strong className="text-white block mb-0.5">Phone:</strong>
                <a href="tel:+911123456789" className="hover:text-white transition-colors">+91 11 2345 6789</a>
              </p>
              <p>
                <strong className="text-white block mb-0.5">Email:</strong>
                <a href="mailto:contact@ncsci.gov.in" className="hover:text-white transition-colors">contact@ncsci.gov.in</a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-6 flex flex-col md:flex-col gap-4 text-[10px] text-blue-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 w-full">
            <p>© 2025 National Commodity Supply Corporation of India. All Rights Reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
              <Link href="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
            </div>
          </div>
          <div className="w-full text-center">
             <p className="text-[9px] text-blue-200/50 mt-2">
              Platform technology developed by independent IT service provider. All content, data collection, and business operations are strictly managed by NCSCI. By using this site, you agree to the Developer Disclaimer outlined in the <Link href="/terms" className="underline hover:text-white">Terms of Use</Link>.
             </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

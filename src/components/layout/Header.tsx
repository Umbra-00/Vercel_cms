'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Globe, Menu, X, User, Settings, LogOut, Shield } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Header() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  const navStructure = [
    {
      label: t('nav.organization'),
      items: [
        { name: t('nav.about'), href: '/about' },
        { name: 'History', href: '/history' },
        { name: t('nav.strategies'), href: '/strategies' },
        { name: t('nav.partners'), href: '/partners' },
        { name: t('nav.sustainability'), href: '/sustainability' },
        { name: t('nav.legal'), href: '/legal' },
      ]
    },
    {
      label: t('nav.commodities'),
      href: '/commodities'
    },
    {
      label: t('nav.operations'),
      items: [
        { name: t('nav.trade'), href: '/trade' },
        { name: t('nav.warehouse'), href: '/warehouse' },
        { name: t('nav.quality'), href: '/quality-control' },
        { name: t('nav.market_intel'), href: '/market-intelligence' },
        { name: t('nav.analysis'), href: '/analysis' },
      ]
    },
    {
      label: t('nav.resources'),
      items: [
        { name: t('nav.news'), href: '/news' },
        { name: t('nav.gallery'), href: '/gallery' },
        { name: t('nav.logs'), href: '/logs' },
        { name: t('nav.accounts'), href: '/accounts' },
      ]
    },
    {
      label: t('nav.quick_links'),
      items: [
        { name: 'e-Payment Gateway', href: '/payment-gateway' },
        { name: t('nav.citizen_charter'), href: '/citizen-charter' },
        { name: t('nav.eprocurement'), href: '/e-procurement' },
        { name: t('nav.faqs'), href: '/faqs' },
        { name: t('nav.downloads'), href: '/downloads' },
      ]
    },
    {
      label: t('nav.contact'),
      href: '/contact'
    }
  ];

  return (
    <header className="relative w-full z-50 bg-[#003366] text-white shadow-lg border-b-4 border-yellow-500">
      <div className="w-full px-4 lg:px-8 py-2">
        <div className="flex items-center justify-between">
          {/* Logo & Branding */}
          <Link href="/" className="flex items-center gap-4 group flex-shrink-0">
            {/* Logo Icon */}
            <div className="w-12 h-12 lg:w-14 lg:h-14 flex items-center justify-center flex-shrink-0">
               <Image 
                 src="/images/ncsci-logo.svg" 
                 alt="National Commodity Supply Corporation of India Logo" 
                 width={56}
                 height={56}
                 className="w-full h-full object-contain"
                 priority
               />
            </div>
            
            <div className="flex flex-col justify-center">
              <h1 className="font-bold leading-none tracking-tight font-[Times_New_Roman] text-white text-lg lg:text-2xl whitespace-nowrap">
                NATIONAL COMMODITY SUPPLY CORPORATION OF INDIA
              </h1>
            </div>
          </Link>

          <div className="flex items-center gap-2 lg:gap-4">
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navStructure.map((category, idx) => (
                <div
                  key={idx}
                  className="relative px-3 py-2"
                  onMouseEnter={() => setHoveredCategory(category.label)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  {hoveredCategory === category.label && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white/10 rounded-lg backdrop-blur-sm border border-white/10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  
                  {category.items ? (
                    <button className="flex items-center gap-1 text-[10px] lg:text-xs xl:text-sm font-bold tracking-wider text-white hover:text-yellow-400 transition-colors relative z-10 group whitespace-nowrap">
                      {category.label}
                      <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${hoveredCategory === category.label ? 'rotate-180 text-yellow-400' : ''}`} />
                    </button>
                  ) : (
                    <Link 
                      href={category.href!}
                      className="text-[10px] lg:text-xs xl:text-sm font-bold tracking-wider text-white hover:text-yellow-400 transition-colors relative z-10 block whitespace-nowrap"
                    >
                      {category.label}
                    </Link>
                  )}

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {category.items && hoveredCategory === category.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 w-64 bg-[#1e3a5f]/95 backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden py-2 border border-white/10 mt-2"
                      >
                        {category.items.map((item, i) => (
                          <Link
                            key={i}
                            href={item.href}
                            className="block px-5 py-3 text-sm text-blue-100 hover:bg-white/10 hover:text-yellow-400 transition-all font-medium border-b border-white/5 last:border-0"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Hamburger Menu for Settings */}
            <div className="relative z-50">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors border border-white/20"
              >
                {isMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
              </button>

              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    className="absolute top-full right-0 mt-4 w-64 bg-[#1e3a5f]/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/10 overflow-hidden"
                  >
                    {/* User Profile Placeholder */}
                    <div className="p-4 border-b border-white/10 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-[#1e3a5f] font-bold">
                        AG
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">Akshar Guha</div>
                        <div className="text-xs text-blue-200">Admin</div>
                      </div>
                    </div>

                    {/* Settings Items */}
                    <div className="p-2">
                      <button
                        onClick={toggleLanguage}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-sm font-medium text-white"
                      >
                        <div className="flex items-center gap-3">
                          <Globe className="w-4 h-4 text-yellow-400" />
                          <span>Language</span>
                        </div>
                        <span className="text-xs bg-white/20 px-2 py-1 rounded uppercase">
                          {language === 'en' ? 'English' : 'Hindi'}
                        </span>
                      </button>

                      <Link href="/admin" className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-sm font-medium text-white">
                        <Shield className="w-4 h-4 text-yellow-400" />
                        <span>Admin Panel</span>
                      </Link>

                      <Link href="/settings" className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-sm font-medium text-white">
                        <Settings className="w-4 h-4 text-yellow-400" />
                        <span>Settings</span>
                      </Link>

                      <Link href="/profile" className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-sm font-medium text-white">
                        <User className="w-4 h-4 text-yellow-400" />
                        <span>Profile</span>
                      </Link>
                      
                      <div className="h-px bg-white/10 my-1" />

                      <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-500/20 text-red-300 hover:text-red-200 transition-colors text-sm font-medium">
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

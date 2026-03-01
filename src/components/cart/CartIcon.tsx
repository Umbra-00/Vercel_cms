"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";

export default function CartIcon() {
    const { itemCount } = useCart();
    const [mounted, setMounted] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <AnimatePresence>
            {itemCount > 0 && (
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="fixed bottom-8 right-8 z-50"
                    id="cart-icon-container"
                >
                    <Link
                        href="/cart"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        className="flex items-center bg-yellow-400 text-neutral-900 rounded-full shadow-2xl overflow-hidden h-16 relative"
                    >
                        <motion.div 
                            layout
                            className="flex items-center px-4"
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        >
                            <motion.div
                                animate={{
                                    rotate: isHovered ? [0, -10, 10, -10, 10, 0] : 0,
                                }}
                                transition={{
                                    duration: 0.5,
                                    ease: "easeInOut"
                                }}
                                className="flex-shrink-0"
                            >
                                <ShoppingBag className="w-8 h-8" />
                            </motion.div>

                            <AnimatePresence>
                                {isHovered && (
                                    <motion.span
                                        initial={{ width: 0, opacity: 0, marginLeft: 0 }}
                                        animate={{ width: "auto", opacity: 1, marginLeft: 12 }}
                                        exit={{ width: 0, opacity: 0, marginLeft: 0 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        className="font-bold text-lg whitespace-nowrap overflow-hidden"
                                    >
                                        View Cart
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </motion.div>
                        
                        <motion.span 
                            layout
                            className="absolute top-1 right-1 bg-red-600 text-white text-xs font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm z-10"
                        >
                            {itemCount}
                        </motion.span>
                    </Link>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

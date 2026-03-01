"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CartAnimationContextType {
    startAnimation: (rect: DOMRect, imageSrc: string) => void;
}

const CartAnimationContext = createContext<CartAnimationContextType | undefined>(undefined);

export function CartAnimationProvider({ children }: { children: ReactNode }) {
    const [flyingItems, setFlyingItems] = useState<{ id: number; rect: DOMRect; imageSrc: string }[]>([]);

    const startAnimation = useCallback((rect: DOMRect, imageSrc: string) => {
        const id = Date.now();
        setFlyingItems((prev) => [...prev, { id, rect, imageSrc }]);

        // Remove item after animation
        setTimeout(() => {
            setFlyingItems((prev) => prev.filter((item) => item.id !== id));
        }, 1000);
    }, []);

    return (
        <CartAnimationContext.Provider value={{ startAnimation }}>
            {children}
            <AnimatePresence>
                {flyingItems.map((item) => (
                    <FlyingItem key={item.id} item={item} />
                ))}
            </AnimatePresence>
        </CartAnimationContext.Provider>
    );
}

function FlyingItem({ item }: { item: { id: number; rect: DOMRect; imageSrc: string } }) {
    const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

    React.useLayoutEffect(() => {
        const targetElement = document.getElementById("cart-icon-container");
        if (targetElement) {
            const rect = targetElement.getBoundingClientRect();
            setTargetRect(rect);
        } else {

        }
    }, []);

    if (!targetRect) return null;

    return (
        <motion.img
            src={item.imageSrc}
            initial={{
                position: "fixed",
                top: item.rect.top,
                left: item.rect.left,
                width: item.rect.width,
                height: item.rect.height,
                opacity: 1,
                zIndex: 9999,
                pointerEvents: "none",
            }}
            animate={{
                top: targetRect.top + targetRect.height / 2 - 10, // Center on cart icon
                left: targetRect.left + targetRect.width / 2 - 10,
                width: 20,
                height: 20,
                opacity: 0.5,
                scale: 0.5,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="rounded-full object-cover shadow-lg"
        />
    );
}

export function useCartAnimation() {
    const context = useContext(CartAnimationContext);
    if (context === undefined) {
        throw new Error("useCartAnimation must be used within a CartAnimationProvider");
    }
    return context;
}

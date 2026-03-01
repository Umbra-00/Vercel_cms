"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface TransitionLinkProps {
    href: string;
    children: ReactNode;
    className?: string;
    onClick?: (e: React.MouseEvent) => void;
    pageTitle?: string;
}

export default function TransitionLink({
    href,
    children,
    className,
    onClick,
    pageTitle,
}: TransitionLinkProps) {
    const router = useRouter();

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (onClick) onClick(e);

        const title = pageTitle || href.split('/').filter(Boolean).pop()?.toUpperCase() || 'PAGE';

        if ((window as any).playPageExit) {
            (window as any).playPageExit(title, () => {
                router.push(href);
            });
        } else {
            router.push(href);
        }
    };

    return (
        <Link href={href} className={className} onClick={handleClick}>
            {children}
        </Link>
    );
}

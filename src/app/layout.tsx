import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NCSCI | National Commodities Supply Corporation of India",
  description: "Premier trading house for agro commodities and edible oils. Based in Nagpur, established 1979.",
  icons: {
    icon: '/images/ncsci-logo.svg',
    apple: '/images/ncsci-logo.svg',
  },
};

// Root layout is a pass-through - each route group provides its own HTML structure
// This is required because Payload CMS's RootLayout renders its own <html>
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}





import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

// CMS-only config — deployed to Vercel (NOT static export)
const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "http", hostname: "localhost" },
      { protocol: "https", hostname: "grainy-gradients.vercel.app" },
    ],
  },
};

export default withPayload(nextConfig);

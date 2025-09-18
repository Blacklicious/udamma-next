import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: process.env.NEXT_PUBLIC_API_HOST_1 || "localhost",
        port: process.env.NEXT_PUBLIC_API_PORT || "8000",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "t3.ftcdn.net",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;

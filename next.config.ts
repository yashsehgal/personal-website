import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/apps",
        destination: "/photos",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

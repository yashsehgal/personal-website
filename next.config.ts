import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/photography",
        destination: "/apps/gallery",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

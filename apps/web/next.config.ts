import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["10.0.0.170"],
  transpilePackages: ["@latchclub/db", "@latchclub/utils"],
};

export default nextConfig;

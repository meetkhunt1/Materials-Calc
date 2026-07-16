import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Static export for Hostinger shared hosting (no Node server available)
  output: "export",
  trailingSlash: true,
  turbopack: {
    // Pin the workspace root (a stray lockfile exists in the user directory)
    root: path.join(__dirname),
  },
  images: {
    // The default next/image optimizer needs a server; serve originals instead
    unoptimized: true,
  },
};

export default nextConfig;

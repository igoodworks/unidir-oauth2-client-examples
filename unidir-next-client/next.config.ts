import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // This tells Next.js to treat the linked package as local source code
  transpilePackages: ["@unidir/unidir-nextjs"],
  turbopack: {
    // Ensure you use an absolute path for the root
    root: path.join(__dirname, "../../"),
  },
  // Experimental: If using Turbopack, ensure it resolves the symlink
  experimental: {
    externalDir: true,
  },

  serverExternalPackages: [],
};

export default nextConfig;

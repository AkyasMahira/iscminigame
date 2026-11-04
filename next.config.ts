import type { NextConfig } from "next";

// output: "export" -> hasil build statis di /out, dipakai Capacitor (mobile) & hosting web
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

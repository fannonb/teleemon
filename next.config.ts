import type { NextConfig } from "next";

const isStaticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  output: isStaticExport ? "export" : undefined,
  // Route handlers (app/api/**/route.ts) can't be statically exported; on
  // static hosting they're served by public/.htaccess + PHP. Only .tsx/.jsx files
  // count as routes in that mode (two entries: Next mangles a one-item
  // list), so keep pages/layouts as .tsx.
  pageExtensions: isStaticExport ? ["tsx", "jsx"] : ["tsx", "ts", "jsx", "js"],
  images: {
    unoptimized: isStaticExport,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.qrserver.com",
        pathname: "/v1/create-qr-code/**",
      },
    ],
  },
};

export default nextConfig;

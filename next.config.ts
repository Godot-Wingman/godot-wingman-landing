// Next.js settings: the site is exported as plain static files (the out/ folder),
// which Cloudflare Pages serves for free with no server code.
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;

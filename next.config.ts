import type { NextConfig } from "next";

// Short links live in /links.json and are served by the /l/[slug] route, so
// vanity URLs are added there rather than here. The /mailme redirect below is
// kept only because that URL is already in circulation off-site.
const nextConfig: NextConfig = {
  async redirects() {
    return [{ source: "/mailme", destination: "/l/mailme", permanent: false }];
  },
};

export default nextConfig;

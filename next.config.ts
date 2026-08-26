import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/mailme",
        destination: "https://forms.gle/G4489e8ERFvpuY7V9",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;

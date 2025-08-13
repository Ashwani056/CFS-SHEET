/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: "export", // ✅ replaces old `next export`
};

export default nextConfig;

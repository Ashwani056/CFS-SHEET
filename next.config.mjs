/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ✅ Allows production builds to succeed even with ESLint errors
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

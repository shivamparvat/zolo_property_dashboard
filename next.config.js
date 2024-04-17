/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // unoptimized: true,
    domains: ["localhost","gpropertypay.com","192.168.1.5","undefined"],
  },
};

module.exports = nextConfig;

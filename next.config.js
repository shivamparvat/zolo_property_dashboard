/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  output: "export",
  distDir:"../zolo_property_dashboard/public/dashboard",
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    domains: ["localhost","gpropertypay.com","192.168.1.7","zoloproperty.s3.ap-south-1.amazonaws.com","zoloproperty.s3.amazonaws.com"],
  },
};

module.exports = nextConfig;


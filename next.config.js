/** @type {import('next').NextConfig} */

const nextConfig = {
  trailingSlash: true,
  output: "export",
  distDir: "../zolo_property_api/public/dashboard",
  // assetPrefix: process.env.NODE_ENV === 'production' ? 'http://13.235.78.238' : '',
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    unoptimized: true,
    domains: [
      "localhost",
      "gpropertypay.com",
      "192.168.1.7",
      "https://demo.gpropertypay.com",
      "zoloproperty.s3.ap-south-1.amazonaws.com",
      "zoloproperty.s3.amazonaws.com",
      "gprop-demo-server.s3.ap-south-1.amazonaws.com",
      "gprop-demo-server.s3.amazonaws.com",
    ]
  }
};

module.exports = nextConfig;

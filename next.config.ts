import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  experimental: {
    serverActions: {
      bodySizeLimit: '2mb', 
      allowedOrigins: ['http://localhost:3000'],  
    },
  },
};

export default nextConfig;

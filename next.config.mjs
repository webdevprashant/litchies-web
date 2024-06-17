/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // output: 'export',
  // distDir: 'dist',
  // trailingSlash: true,
  // assetPrefix: 'https://litchies.atf-labs.com/assets/',
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: '*.s3.ap-south-1.amazonaws.com',
      port: '',
      pathname: '**'
    }]
  }
};

export default nextConfig;

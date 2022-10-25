/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // crossOrigin: 'use-credentials',
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL
  }
}

module.exports = nextConfig

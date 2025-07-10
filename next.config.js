// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.watchOptions = {
      ignored: [
        "**/.git/**",
        "**/node_modules/**",
        "**/C:/Users/USER/Application Data/**", // Ignore restricted Windows path
      ],
    };
    return config;
  },
};

module.exports = nextConfig;

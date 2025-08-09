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

  // Modern build & image optimizations
  experimental: {
    modern: true, // Serve modern JavaScript to modern browsers
  },

  images: {
    formats: ["image/avif", "image/webp"], // Use modern formats for smaller size
    deviceSizes: [320, 420, 768, 1024, 1200], // Responsive image sizes
    imageSizes: [16, 32, 48, 64, 96],
  },

  // Enable compression for better transfer speed
  compress: true,

  // React strict mode for better debugging
  reactStrictMode: true,

  // Minify output using SWC
  swcMinify: true,
};

module.exports = nextConfig;

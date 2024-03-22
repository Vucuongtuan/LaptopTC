/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vtc-be-laptop.onrender.com",
        port: "",
        pathname: "/image/**",
      },
    ],
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "image.tmdb.org",
        path: "/t/p/w200/",
      },
    ],
  },
};

module.exports = nextConfig;

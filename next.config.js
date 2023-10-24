/** @type {import('next').NextConfig} */
const nextConfig = {
  //   output: "export",
  experimental: {
    serverActions: true,
  },
  transpilePackages: ['lucide-react'] // add this
};

module.exports = nextConfig;

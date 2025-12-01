/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  env: {
    // NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_STORE_NAME: process.env.NEXT_STORE_NAME,
    NEXT_STORE_LAST_NAME: process.env.NEXT_STORE_LAST_NAME,

  },
};

export default nextConfig;

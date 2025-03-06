import dotenv from "dotenv";
// import { dot } from "node:test/reporters";

/** @type {import('next').NextConfig} */

dotenv.config()


const nextConfig = {
    images: {
      domains: ['firebasestorage.googleapis.com'],
    },
  };
  
  export default nextConfig;
  

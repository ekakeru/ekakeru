/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

 import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';


/** @type {import("next").NextConfig} */
const config = {
  poweredByHeader: false,
  output: 'standalone',
  experimental: {
    optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
  },
};

if (process.env.NODE_ENV === 'development') {
   await setupDevPlatform();
 }

export default config;

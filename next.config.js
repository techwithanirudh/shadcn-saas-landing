/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import './src/env.js';

import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  experimental: {
    viewTransition: true,
  },
  serverExternalPackages: [
    'ts-morph',
    'typescript',
    'oxc-transform',
    'twoslash',
  ],
};

export default withMDX(config);

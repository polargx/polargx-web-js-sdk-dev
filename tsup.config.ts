import { defineConfig } from 'tsup';

export default defineConfig([
  // Standard builds for Node.js and module bundlers
  {
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    outDir: 'dist',
  },
  // Browser-specific build
  {
    entry: ['src/index.ts'],
    format: ['iife'],
    globalName: 'PolarSDK',
    platform: 'browser',
    sourcemap: true,
    outDir: 'dist/browser',
    outExtension: () => ({ js: '.js' }),
  }
]);
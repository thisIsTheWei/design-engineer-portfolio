import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['tests/**/*.{test,spec}.{js,ts,jsx,tsx}'],
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, '../src'),
    },
  },
});
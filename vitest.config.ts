import { defineConfig, defaultExclude } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/**/*.{test,spec}.ts'],
    exclude: [
      ...defaultExclude,
      '**/src/environments/**'
    ],
  },
});
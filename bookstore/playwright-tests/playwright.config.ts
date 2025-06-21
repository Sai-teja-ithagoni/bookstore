import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 0,
  use: {
    baseURL: 'http://127.0.0.1:8000', // fallback baseURL (not used due to config.ts)
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
    },
  },
  reporter: [
    ['allure-playwright'], // For Allure report
    ['html', { outputFolder: 'playwright-report', open: 'never' }] // Optional HTML fallback
  ],
});

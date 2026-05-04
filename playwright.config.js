const { defineConfig } = require('@playwright/test');
require('ts-node/register');
const { config } = require('./src/support/config.ts');

module.exports = defineConfig({
  testDir: './src',
  timeout: config.timeouts.scenario,
  fullyParallel: true,
  retries: config.retries,
  workers: config.parallel,
  reporter: [['list'], ['html', { outputFolder: 'playwright-report', open: 'never' }]],
  use: {
    baseURL: config.baseUrl,
    headless: config.headless,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: config.timeouts.action,
    navigationTimeout: config.timeouts.navigation
  },
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium'
      }
    }
  ],
  outputDir: 'test-results/playwright'
});

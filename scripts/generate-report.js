const fs = require('fs-extra');
const report = require('multiple-cucumber-html-reporter');

const jsonReport = 'reports/cucumber/cucumber-report.json';

if (!fs.existsSync(jsonReport)) {
  console.log('No Cucumber JSON report found. Skipping HTML report generation.');
  process.exit(0);
}

report.generate({
  jsonDir: 'reports/cucumber',
  reportPath: 'reports/html',
  reportName: 'Javascript Playwright E2E Report',
  pageTitle: 'Javascript Playwright E2E Report',
  displayDuration: true,
  metadata: {
    browser: {
      name: 'chromium'
    },
    device: 'Local or GitHub Actions runner',
    platform: {
      name: process.platform
    }
  },
  customData: {
    title: 'Run Info',
    data: [
      { label: 'Project', value: 'Javascript_Playwright' },
      { label: 'Base URL', value: process.env.BASE_URL || 'not provided' },
      { label: 'Headless', value: String(process.env.HEADLESS ?? process.env.CI === 'true') },
      { label: 'CI', value: String(process.env.CI === 'true') }
    ]
  }
});

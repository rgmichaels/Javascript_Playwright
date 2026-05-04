const { chromium } = require('@playwright/test');
const { config } = require('./config.ts');

let browser;

async function launchBrowser() {
  if (!browser) {
    browser = await chromium.launch({
      headless: config.headless
    });
  }
  return browser;
}

async function getBrowser() {
  if (!browser) {
    return launchBrowser();
  }
  return browser;
}

async function closeBrowser() {
  if (browser) {
    await browser.close();
    browser = undefined;
  }
}

module.exports = {
  launchBrowser,
  getBrowser,
  closeBrowser
};

const { expect } = require('@playwright/test');
const { BasePage } = require('./base-page');

class StatusCodesPage extends BasePage {
  async open() {
    await this.goto('/status_codes');
  }

  async openStatus(code) {
    const responsePromise = this.page.waitForResponse((response) => response.url().endsWith(`/status_codes/${code}`));
    await this.clickSafe(this.page.getByRole('link', { name: String(code) }));
    const response = await responsePromise;
    expect(response.status()).toBe(Number(code));
  }

  async expectStatusPage(code) {
    await expect(this.page.locator('#content')).toContainText(`This page returned a ${code} status code`);
  }
}

module.exports = {
  StatusCodesPage
};

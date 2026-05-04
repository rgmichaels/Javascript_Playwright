const { expect } = require('@playwright/test');

class BasePage {
  constructor(page) {
    this.page = page;
  }

  async goto(path = '/') {
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
    await this.waitForStable();
  }

  async waitForStable() {
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForLoadState('networkidle').catch(() => undefined);
  }

  async clickSafe(locator) {
    await expect(locator).toBeVisible();
    await expect(locator).toBeEnabled();
    await locator.click();
    await this.waitForStable();
  }

  async expectHeading(text) {
    await expect(this.page.getByRole('heading', { name: text })).toBeVisible();
  }

  async expectPath(path) {
    await expect(this.page).toHaveURL(new RegExp(`${path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}/?$`));
  }
}

module.exports = {
  BasePage
};

const { expect } = require('@playwright/test');
const { BasePage } = require('./base-page');

class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.exampleLinks = page.locator('#content ul a');
  }

  async open() {
    await this.goto('/');
  }

  async linkNames() {
    return this.exampleLinks.allTextContents();
  }

  linkByName(name) {
    return this.page.locator('#content').getByRole('link', { name, exact: true });
  }

  async expectAllFixtureLinksVisible(links) {
    for (const link of links) {
      await expect(this.linkByName(link.name)).toBeVisible();
    }
  }

  async clickExample(name) {
    await this.clickSafe(this.linkByName(name).first());
  }
}

module.exports = {
  HomePage
};

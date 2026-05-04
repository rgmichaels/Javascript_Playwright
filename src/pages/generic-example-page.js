const { expect } = require('@playwright/test');
const { BasePage } = require('./base-page');

class GenericExamplePage extends BasePage {
  async expectPageLoaded(example) {
    await this.expectPath(example.path);
    if (example.heading) {
      await expect(this.page.getByRole('heading', { name: example.heading }).first()).toBeVisible();
    }
  }
}

module.exports = {
  GenericExamplePage
};

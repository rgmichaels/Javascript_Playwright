const { expect } = require('@playwright/test');
const { BasePage } = require('./base-page');

class DropdownPage extends BasePage {
  async open() {
    await this.goto('/dropdown');
  }

  async select(label) {
    await this.page.locator('#dropdown').selectOption({ label });
  }

  async expectSelected(label) {
    await expect(this.page.locator('#dropdown')).toHaveValue(label === 'Option 1' ? '1' : '2');
  }
}

module.exports = {
  DropdownPage
};

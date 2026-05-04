const { expect } = require('@playwright/test');
const { BasePage } = require('./base-page');

class InputsPage extends BasePage {
  async open() {
    await this.goto('/inputs');
  }

  async enterNumber(value) {
    await this.page.locator('input[type="number"]').fill(String(value));
  }

  async expectNumber(value) {
    await expect(this.page.locator('input[type="number"]')).toHaveValue(String(value));
  }
}

module.exports = {
  InputsPage
};

const { expect } = require('@playwright/test');
const { BasePage } = require('./base-page');

class CheckboxesPage extends BasePage {
  async open() {
    await this.goto('/checkboxes');
  }

  checkbox(index) {
    return this.page.locator('#checkboxes input[type="checkbox"]').nth(index - 1);
  }

  async setCheckbox(index, checked) {
    await this.checkbox(index).setChecked(checked);
  }

  async expectCheckbox(index, checked) {
    if (checked) {
      await expect(this.checkbox(index)).toBeChecked();
    } else {
      await expect(this.checkbox(index)).not.toBeChecked();
    }
  }
}

module.exports = {
  CheckboxesPage
};

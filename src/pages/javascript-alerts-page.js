const { expect } = require('@playwright/test');
const { BasePage } = require('./base-page');

class JavaScriptAlertsPage extends BasePage {
  async open() {
    await this.goto('/javascript_alerts');
  }

  async acceptAlert() {
    this.page.once('dialog', async (dialog) => {
      await dialog.accept();
    });
    await this.clickSafe(this.page.getByRole('button', { name: 'Click for JS Alert' }));
  }

  async expectResult(message) {
    await expect(this.page.locator('#result')).toHaveText(message);
  }
}

module.exports = {
  JavaScriptAlertsPage
};

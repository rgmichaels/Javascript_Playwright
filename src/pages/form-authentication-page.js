const { expect } = require('@playwright/test');
const { BasePage } = require('./base-page');

class FormAuthenticationPage extends BasePage {
  async open() {
    await this.goto('/login');
  }

  async login(username, password) {
    await this.page.locator('#username').fill(username);
    await this.page.locator('#password').fill(password);
    await this.clickSafe(this.page.getByRole('button', { name: /login/i }));
  }

  async expectSecureArea() {
    await expect(this.page.getByRole('heading', { name: 'Secure Area', exact: true })).toBeVisible();
    await expect(this.page.locator('#flash')).toContainText('You logged into a secure area!');
  }

  async logout() {
    await this.clickSafe(this.page.getByRole('link', { name: 'Logout' }));
  }
}

module.exports = {
  FormAuthenticationPage
};

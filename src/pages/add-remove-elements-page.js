const { expect } = require('@playwright/test');
const { BasePage } = require('./base-page');

class AddRemoveElementsPage extends BasePage {
  async open() {
    await this.goto('/add_remove_elements/');
  }

  async addElement() {
    await this.clickSafe(this.page.getByRole('button', { name: 'Add Element' }));
  }

  async addElements(count) {
    for (let index = 0; index < count; index += 1) {
      await this.addElement();
    }
  }

  async deleteElement() {
    await this.clickSafe(this.page.getByRole('button', { name: 'Delete' }).first());
  }

  async deleteElements(count) {
    for (let index = 0; index < count; index += 1) {
      await this.deleteElement();
    }
  }

  async expectDeleteButtonCount(count) {
    await expect(this.page.getByRole('button', { name: 'Delete' })).toHaveCount(count);
  }
}

module.exports = {
  AddRemoveElementsPage
};

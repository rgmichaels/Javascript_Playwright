const { expect } = require('@playwright/test');
const { BasePage } = require('./base-page');

class DragAndDropPage extends BasePage {
  constructor(page) {
    super(page);
    this.columnA = page.locator('#column-a');
    this.columnB = page.locator('#column-b');
  }

  async open() {
    await this.goto('/drag_and_drop');
  }

  async dragColumnAToColumnB() {
    await this.columnA.dragTo(this.columnB);
  }

  async expectColumnLabels(columnALabel, columnBLabel) {
    await expect(this.columnA.locator('header')).toHaveText(columnALabel);
    await expect(this.columnB.locator('header')).toHaveText(columnBLabel);
  }

  async expectColumnALabel(label) {
    await expect(this.columnA.locator('header')).toHaveText(label);
  }

  async expectColumnBLabel(label) {
    await expect(this.columnB.locator('header')).toHaveText(label);
  }
}

module.exports = {
  DragAndDropPage
};

const { Given, When, Then } = require('@cucumber/cucumber');
const { DragAndDropPage } = require('../pages/drag-and-drop-page');

Given('I am on the Drag and Drop page', async function () {
  this.dragAndDropPage = new DragAndDropPage(this.page);
  await this.dragAndDropPage.open();
});

When('I drag column A to column B', async function () {
  await this.dragAndDropPage.dragColumnAToColumnB();
});

Then('column A displays {string}', async function (label) {
  await this.dragAndDropPage.expectColumnALabel(label);
});

Then('column B displays {string}', async function (label) {
  await this.dragAndDropPage.expectColumnBLabel(label);
});

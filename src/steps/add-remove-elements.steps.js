const { Given, When, Then } = require('@cucumber/cucumber');
const { AddRemoveElementsPage } = require('../pages/add-remove-elements-page');

Given('I am viewing the Add\\/Remove Elements page', async function () {
  this.addRemoveElementsPage = new AddRemoveElementsPage(this.page);
  await this.addRemoveElementsPage.open();
});

When('I click the Add Element button {int} times', async function (count) {
  await this.addRemoveElementsPage.addElements(count);
});

Then('{int} Delete buttons are displayed', async function (count) {
  await this.addRemoveElementsPage.expectDeleteButtonCount(count);
});

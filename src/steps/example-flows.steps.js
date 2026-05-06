const { Given, When, Then } = require('@cucumber/cucumber');
const { AddRemoveElementsPage } = require('../pages/add-remove-elements-page');
const { CheckboxesPage } = require('../pages/checkboxes-page');
const { DropdownPage } = require('../pages/dropdown-page');
const { FormAuthenticationPage } = require('../pages/form-authentication-page');
const { InputsPage } = require('../pages/inputs-page');
const { JavaScriptAlertsPage } = require('../pages/javascript-alerts-page');
const { StatusCodesPage } = require('../pages/status-codes-page');
const { DragAndDropPage } = require('../pages/drag-and-drop-page');
const { loadFixture } = require('../utils/fixture-loader');

const users = loadFixture('users.json');
const data = loadFixture('example-data.json');

Given(/^I am on the Add\/Remove Elements page$/, async function () {
  this.addRemovePage = new AddRemoveElementsPage(this.page);
  await this.addRemovePage.open();
});

When('I add an element', async function () {
  await this.addRemovePage.addElement();
});

When('I delete an element', async function () {
  await this.addRemovePage.deleteElement();
});

Then('{int} delete button is displayed', async function (count) {
  await this.addRemovePage.expectDeleteButtonCount(count);
});

Then('{int} delete buttons are displayed', async function (count) {
  await this.addRemovePage.expectDeleteButtonCount(count);
});

Given('I am on the Checkboxes page', async function () {
  this.checkboxesPage = new CheckboxesPage(this.page);
  await this.checkboxesPage.open();
});

When('I check checkbox {int}', async function (index) {
  await this.checkboxesPage.setCheckbox(index, true);
});

When('I uncheck checkbox {int}', async function (index) {
  await this.checkboxesPage.setCheckbox(index, false);
});

Then('checkbox {int} is checked', async function (index) {
  await this.checkboxesPage.expectCheckbox(index, true);
});

Then('checkbox {int} is unchecked', async function (index) {
  await this.checkboxesPage.expectCheckbox(index, false);
});

Given('I am on the Dropdown page', async function () {
  this.dropdownPage = new DropdownPage(this.page);
  await this.dropdownPage.open();
});

When('I select the configured dropdown option', async function () {
  await this.dropdownPage.select(data.dropdown.option);
});

Then('the configured dropdown option is selected', async function () {
  await this.dropdownPage.expectSelected(data.dropdown.option);
});

Given('I am on the Form Authentication page', async function () {
  this.formAuthenticationPage = new FormAuthenticationPage(this.page);
  await this.formAuthenticationPage.open();
});

When('I log in as the valid fixture user', async function () {
  await this.formAuthenticationPage.login(users.validUser.username, users.validUser.password);
});

Then('the secure area is displayed', async function () {
  await this.formAuthenticationPage.expectSecureArea();
});

Given('I am on the Inputs page', async function () {
  this.inputsPage = new InputsPage(this.page);
  await this.inputsPage.open();
});

When('I enter the configured input number', async function () {
  await this.inputsPage.enterNumber(data.inputs.number);
});

Then('the configured input number is displayed', async function () {
  await this.inputsPage.expectNumber(data.inputs.number);
});

Given('I am on the JavaScript Alerts page', async function () {
  this.javascriptAlertsPage = new JavaScriptAlertsPage(this.page);
  await this.javascriptAlertsPage.open();
});

When('I accept a JavaScript alert', async function () {
  await this.javascriptAlertsPage.acceptAlert();
});

Then('the alert result message is {string}', async function (message) {
  await this.javascriptAlertsPage.expectResult(message);
});

Given('I am on the Status Codes page', async function () {
  this.statusCodesPage = new StatusCodesPage(this.page);
  await this.statusCodesPage.open();
});

When('I open the configured success status code', async function () {
  await this.statusCodesPage.openStatus(data.statusCodes.success);
});

Then('the configured success status page is displayed', async function () {
  await this.statusCodesPage.expectStatusPage(data.statusCodes.success);
});

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

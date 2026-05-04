const { Given, When, Then } = require('@cucumber/cucumber');
const { HomePage } = require('../pages/home-page');
const { GenericExamplePage } = require('../pages/generic-example-page');
const { loadFixture } = require('../utils/fixture-loader');

const links = loadFixture('homepage-links.json');

function findExample(name) {
  const example = links.find((item) => item.name === name);
  if (!example) {
    throw new Error(`No homepage link fixture found for: ${name}`);
  }
  return example;
}

Given('I am on the homepage', async function () {
  this.homePage = new HomePage(this.page);
  await this.homePage.open();
});

Then('every expected homepage example link is visible', async function () {
  await this.homePage.expectAllFixtureLinksVisible(links);
});

When('I open the homepage example named {string}', async function (name) {
  this.currentExample = findExample(name);
  await this.homePage.clickExample(name);
});

Then('the {string} example page is loaded', async function (name) {
  const page = new GenericExamplePage(this.page);
  await page.expectPageLoaded(findExample(name));
});

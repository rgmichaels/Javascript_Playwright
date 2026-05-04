const path = require('path');
const fs = require('fs-extra');
const { setWorldConstructor, World } = require('@cucumber/cucumber');
const { config } = require('./config.ts');

class CustomWorld extends World {
  constructor(options) {
    super(options);
    this.config = config;
    this.browser = undefined;
    this.context = undefined;
    this.page = undefined;
    this.consoleLogs = [];
    this.networkLogs = [];
    this.scenarioName = 'scenario';
    this.retry = 0;
  }

  setPage(page) {
    this.page = page;
    this.consoleLogs = [];
    this.networkLogs = [];

    page.on('console', (message) => {
      this.consoleLogs.push({
        type: message.type(),
        text: message.text(),
        location: message.location()
      });
    });

    if (this.config.networkLogging) {
      page.on('request', (request) => {
        this.networkLogs.push({
          direction: 'request',
          method: request.method(),
          url: request.url()
        });
      });
      page.on('response', (response) => {
        this.networkLogs.push({
          direction: 'response',
          status: response.status(),
          url: response.url()
        });
      });
    }
  }

  artifactName(suffix) {
    const safeName = this.scenarioName
      .replace(/[^a-z0-9]+/gi, '-')
      .replace(/^-|-$/g, '')
      .toLowerCase();
    return `${safeName}-attempt-${this.retry + 1}.${suffix}`;
  }

  async attachText(name, value) {
    if (!value || value.length === 0) {
      return;
    }
    await this.attach(`${name}\n${JSON.stringify(value, null, 2)}`, 'application/json');
  }

  async saveJsonArtifact(directory, filename, value) {
    const filePath = path.join(directory, filename);
    await fs.ensureDir(path.dirname(filePath));
    await fs.writeJson(filePath, value, { spaces: 2 });
    return filePath;
  }
}

setWorldConstructor(CustomWorld);

module.exports = {
  CustomWorld
};

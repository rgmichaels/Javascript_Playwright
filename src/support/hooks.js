const path = require('path');
const fs = require('fs-extra');
const {
  BeforeAll,
  AfterAll,
  Before,
  After,
  Status,
  setDefaultTimeout
} = require('@cucumber/cucumber');
const { launchBrowser, getBrowser, closeBrowser } = require('./browser');
const { config } = require('./config.ts');

setDefaultTimeout(config.timeouts.scenario);

BeforeAll(async function () {
  await launchBrowser();
});

AfterAll(async function () {
  await closeBrowser();
});

Before(async function (scenario) {
  this.browser = await getBrowser();
  this.scenarioName = scenario.pickle.name;
  this.retry = scenario.result?.retry || 0;
  this.context = await this.browser.newContext({
    baseURL: config.baseUrl,
    httpCredentials: {
      username: 'admin',
      password: 'admin'
    },
    acceptDownloads: true,
    recordVideo: process.env.CI === 'true' ? { dir: 'test-results/videos' } : undefined
  });

  if (config.traceOnRetry && this.retry > 0) {
    await this.context.tracing.start({
      screenshots: true,
      snapshots: true,
      sources: true
    });
  }

  const page = await this.context.newPage();
  this.setPage(page);
});

After(async function (scenario) {
  const failed = scenario.result?.status === Status.FAILED;

  if (failed && this.page) {
    const screenshotPath = path.join('test-results/screenshots', this.artifactName('png'));
    await fs.ensureDir(path.dirname(screenshotPath));
    const screenshot = await this.page.screenshot({ path: screenshotPath, fullPage: true });
    await this.attach(screenshot, 'image/png');

    if (config.captureHtmlOnFailure) {
      const htmlPath = path.join('test-results/html', this.artifactName('html'));
      await fs.ensureDir(path.dirname(htmlPath));
      await fs.writeFile(htmlPath, await this.page.content(), 'utf8');
      await this.attach(`HTML snapshot: ${htmlPath}`, 'text/plain');
    }

    if (this.consoleLogs.length > 0) {
      const consolePath = await this.saveJsonArtifact(
        'test-results/console',
        this.artifactName('json'),
        this.consoleLogs
      );
      await this.attach(`Console log artifact: ${consolePath}`, 'text/plain');
      await this.attachText('Console logs', this.consoleLogs);
    }

    if (this.networkLogs.length > 0) {
      const networkPath = await this.saveJsonArtifact(
        'test-results/network',
        this.artifactName('json'),
        this.networkLogs
      );
      await this.attach(`Network log artifact: ${networkPath}`, 'text/plain');
    }
  }

  if (this.context) {
    if (config.traceOnRetry && this.retry > 0) {
      const tracePath = path.join('test-results/traces', this.artifactName('zip'));
      await fs.ensureDir(path.dirname(tracePath));
      await this.context.tracing.stop({ path: tracePath });
      if (failed) {
        await this.attach(`Trace artifact: ${tracePath}`, 'text/plain');
      }
    }

    await this.context.close();
  }

  this.page = undefined;
  this.context = undefined;
});

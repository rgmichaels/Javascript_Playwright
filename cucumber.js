const retry = Number(process.env.RETRIES || (process.env.CI ? 1 : 0));

module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: [
      'src/support/world.js',
      'src/support/hooks.js',
      'src/steps/**/*.js'
    ],
    paths: ['src/features/**/*.feature'],
    format: [
      'progress-bar',
      'json:reports/cucumber/cucumber-report.json',
      'html:reports/cucumber/cucumber-report.html',
      'summary'
    ],
    formatOptions: {
      snippetInterface: 'async-await'
    },
    parallel: Number(process.env.PARALLEL || (process.env.CI ? 2 : 1)),
    retry,
    ...(retry > 0 ? { retryTagFilter: 'not @wip' } : {})
  }
};

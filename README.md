# Javascript_Playwright

Modern Playwright + Cucumber + JavaScript end-to-end framework for [The Internet](https://the-internet.herokuapp.com/).

## What You Are Getting

- Playwright browser automation with Cucumber BDD features.
- Page Object Model under `src/pages`.
- Custom Cucumber World under `src/support/world.js`.
- Browser lifecycle hooks with screenshots, retry traces, console logs, optional HTML snapshots, and optional network logging.
- Runtime config layer in `src/support/config.ts` with fail-fast `BASE_URL` validation.
- External JSON fixtures for homepage links, user credentials, and parameterized test data.
- Smoke, regression, and wip tag support.
- Cucumber HTML report plus generated multi-page HTML report.
- GitHub Actions workflow that runs on every push and pull request, retries failures in CI, and uploads artifacts.

## Folder Structure

```text
Javascript_Playwright/
├── .github/workflows/e2e.yml
├── .env.example
├── .gitignore
├── cucumber.js
├── package.json
├── playwright.config.js
├── README.md
├── scripts/
│   ├── clean.js
│   └── generate-report.js
├── src/
│   ├── features/
│   │   ├── example-flows.feature
│   │   └── homepage.feature
│   ├── fixtures/
│   │   ├── example-data.json
│   │   ├── homepage-links.json
│   │   └── users.json
│   ├── pages/
│   │   ├── add-remove-elements-page.js
│   │   ├── base-page.js
│   │   ├── checkboxes-page.js
│   │   ├── dropdown-page.js
│   │   ├── form-authentication-page.js
│   │   ├── generic-example-page.js
│   │   ├── home-page.js
│   │   ├── inputs-page.js
│   │   ├── javascript-alerts-page.js
│   │   └── status-codes-page.js
│   ├── steps/
│   │   ├── example-flows.steps.js
│   │   └── homepage.steps.js
│   ├── support/
│   │   ├── browser.js
│   │   ├── config.ts
│   │   ├── hooks.js
│   │   └── world.js
│   └── utils/
│       ├── fixture-loader.js
│       └── selector-utils.js
└── tsconfig.json
```

## Setup

```bash
npm install
npm run install:browsers
cp .env.example .env
```

`BASE_URL` is required. The default value is:

```bash
BASE_URL=https://the-internet.herokuapp.com/
```

## Run Commands

```bash
npm test
npm run test:smoke
npm run test:regression
npm run test:wip
HEADLESS=false npm test
HEADLESS=true npm test
PARALLEL=4 npm test
RETRIES=1 npm test
NETWORK_LOGGING=true npm test
```

## Tags

- `@smoke`: fast confidence checks for core flows.
- `@regression`: broader coverage.
- `@wip`: work in progress. CI retry excludes this tag.

## Reporting And Artifacts

- Console progress: terminal output from Cucumber.
- Cucumber report: `reports/cucumber/cucumber-report.html`.
- Generated HTML report: `reports/html/index.html`.
- Screenshots on failure: `test-results/screenshots`.
- Traces on retry: `test-results/traces`.
- HTML snapshots on failure: `test-results/html`.
- Console logs on failure: `test-results/console`.
- Optional network logs: `test-results/network` when `NETWORK_LOGGING=true`.

## Selector Strategy

Preferred order:

1. `data-testid` using `byTestId(page, testId)`.
2. Accessible roles and names using `getByRole`.
3. Existing stable IDs from the application markup.
4. Visible text when it represents user-facing behavior.

The target app does not currently expose `data-testid` attributes. This framework therefore uses actual accessible text and existing IDs such as `#username`, `#password`, `#checkboxes`, `#dropdown`, `#result`, and `#content`. Do not invent selectors. If the target app later adds test IDs, update page objects to use `src/utils/selector-utils.js`.

## Placeholders

No fake selectors are used in executable tests. For future pages that lack stable selectors, add a clearly marked placeholder in the page object like:

```js
// PLACEHOLDER: replace with app-owned data-testid after the application exposes it.
this.saveButton = page.getByTestId('replace-with-real-testid');
```

Only add that placeholder after inspecting the live DOM and confirming no stable role, label, or existing ID is available.

## GitHub Actions

The workflow in `.github/workflows/e2e.yml` runs on every push and pull request. It installs Node 22 dependencies, installs Chromium, runs `npm run test:smoke` headlessly, retries once, and uploads reports/artifacts.

## Debugging Locally

Run headed:

```bash
HEADLESS=false npm test
```

Run one tag:

```bash
npm run test:smoke
```

Capture network logs:

```bash
NETWORK_LOGGING=true npm test
```

Open a retry trace:

```bash
npx playwright show-trace test-results/traces/<trace-file>.zip
```

## Troubleshooting

- `Missing required environment variable: BASE_URL`: create `.env` or export `BASE_URL`.
- Browser executable missing: run `npm run install:browsers`.
- CI-only failure: download the `e2e-artifacts` artifact from GitHub Actions and inspect screenshots, HTML snapshots, console logs, and traces.
- Selector failure: inspect the current DOM, prefer `data-testid` if available, then roles, labels, stable IDs, and finally exact visible text.

## Tests Included

- Homepage lists all expected example links.
- Homepage example links navigate correctly for every linked example page.
- Add/Remove Elements flow.
- Checkboxes flow.
- Dropdown fixture-driven flow.
- Form Authentication fixture-driven login flow.
- Inputs fixture-driven numeric entry flow.
- JavaScript Alerts flow.
- Status Codes response validation flow.

## Clean Initial Commit Message

```text
chore: scaffold playwright cucumber javascript e2e framework
```

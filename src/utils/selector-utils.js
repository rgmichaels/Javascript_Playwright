function byTestId(page, testId) {
  return page.getByTestId(testId);
}

function byRole(page, role, name, options = {}) {
  return page.getByRole(role, { name, ...options });
}

function byExistingId(page, id) {
  return page.locator(`#${id}`);
}

function byVisibleText(page, text, options = {}) {
  return page.getByText(text, { exact: true, ...options });
}

async function firstVisible(...locators) {
  for (const locator of locators) {
    if (await locator.first().isVisible().catch(() => false)) {
      return locator.first();
    }
  }
  throw new Error('No provided locator was visible.');
}

module.exports = {
  byTestId,
  byRole,
  byExistingId,
  byVisibleText,
  firstVisible
};

const { expect, test } = require('@playwright/test');
const {
  fillEmailLogin,
  getRequiredEnv,
  gotoLogin,
  stayOnHomepage,
} = require('./helpers');
const {
  addNewSavedConfiguration,
  openOperationsCenter,
  openOperationsCenterApps,
  selectApplication,
} = require('./operationsCenter.helpers');

const LOGIN_URL = 'https://dev.aqueralabs.com/home/login';

test.describe('Aquera login automation', () => {
  test('Saved SSO session lands on Ops Center overview', async ({ page }) => {
    await gotoLogin(page);
    await stayOnHomepage(page);
  });

  test('Saved session can reopen the overview page without reauth', async ({ page }) => {
    await gotoLogin(page);
    await page.reload({ waitUntil: 'domcontentloaded' });
    await stayOnHomepage(page);
  });

  test('Password login opens the AD-OU Application Connection Report', async ({ page }) => {
    const email = getRequiredEnv('LOGIN_EMAIL');
    const password = getRequiredEnv('LOGIN_PASSWORD');

    await page.goto(LOGIN_URL, { waitUntil: 'domcontentloaded' });
    await fillEmailLogin(page, email, password);

    await openOperationsCenterApps(page);
    await selectApplication(page, 'AD-OU');

    await expect(
      page.getByRole('heading', { name: /application connection report/i }).first()
        .or(page.getByText(/application connection report/i).first())
    ).toBeVisible({ timeout: 120000 });
    await expect(page.getByText(/^AD-OU$/i).first()).toBeVisible({ timeout: 120000 });
  });

  test('User creates a new saved configuration', async ({ page }) => {
    const email = getRequiredEnv('LOGIN_EMAIL');
    const password = getRequiredEnv('LOGIN_PASSWORD');
    const configurationName = 'NEW 2';

    await page.goto('https://dev.aqueralabs.com/securehome/endpoints', { waitUntil: 'domcontentloaded' });
    await fillEmailLogin(page, email, password);
    await openOperationsCenter(page);
    await addNewSavedConfiguration(page, configurationName);

    await expect(page.getByText(configurationName, { exact: true }).first()).toBeVisible({ timeout: 120000 });
  });
});

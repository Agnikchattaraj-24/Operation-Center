const { expect } = require('@playwright/test');

async function openOperationsCenterApps(page) {
  const operationsCenterNav = page
    .getByRole('link', { name: /operations center/i })
    .or(page.getByRole('button', { name: /operations center/i }))
    .first();

  await expect(operationsCenterNav).toBeVisible({ timeout: 120000 });
  await operationsCenterNav.click();

  const appsView = page
    .getByRole('tab', { name: /^apps$/i })
    .or(page.getByRole('button', { name: /^apps$/i }))
    .or(page.getByRole('link', { name: /^apps$/i }))
    .first();

  await expect(appsView).toBeVisible({ timeout: 120000 });
  await appsView.click();
}

async function selectApplication(page, applicationName) {
  const appLocator = page
    .getByRole('link', { name: new RegExp(`^${applicationName}$`, 'i') })
    .or(page.getByRole('button', { name: new RegExp(`^${applicationName}$`, 'i') }))
    .or(page.getByText(new RegExp(`^${applicationName}$`, 'i')))
    .first();

  await expect(appLocator).toBeVisible({ timeout: 120000 });
  await appLocator.click();
}

async function openOperationsCenter(page) {
  const operationsCenterNav = page
    .getByRole('link', { name: /operations center/i })
    .or(page.getByRole('button', { name: /operations center/i }))
    .first();

  await expect(operationsCenterNav).toBeVisible({ timeout: 120000 });
  await operationsCenterNav.click();
}

async function addNewSavedConfiguration(page, configurationName) {
  const savingsButton = page
    .getByRole('button', { name: /^savings$/i })
    .or(page.getByText(/^savings$/i))
    .first();

  await expect(savingsButton).toBeVisible({ timeout: 120000 });
  await savingsButton.click();
  await page.waitForTimeout(3000);

  const addNewButton = page
    .getByRole('button', { name: /add new/i })
    .last();

  await expect(addNewButton).toBeVisible({ timeout: 120000 });
  await addNewButton.click();
  await page.waitForTimeout(3000);

  const configurationNameField = page
    .locator('nile-input[placeholder="Enter Configuration Name"], nile-input[label="Configuration Name"]')
    .first();

  await expect(configurationNameField).toBeVisible({ timeout: 120000 });
  await configurationNameField.click();
  await page.keyboard.press(process.platform === 'darwin' ? 'Meta+A' : 'Control+A');
  await page.keyboard.press('Backspace');
  await page.keyboard.type(configurationName);
  await page.waitForTimeout(2000);

  const saveButton = page
    .getByRole('button', { name: /^save$/i })
    .or(page.getByRole('button', { name: /save/i }))
    .last();

  await expect(saveButton).toBeVisible({ timeout: 120000 });
  await saveButton.click();
}

module.exports = {
  addNewSavedConfiguration,
  openOperationsCenter,
  openOperationsCenterApps,
  selectApplication,
};

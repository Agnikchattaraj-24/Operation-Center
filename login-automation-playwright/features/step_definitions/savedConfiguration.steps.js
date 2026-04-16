require('dotenv').config();

const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { fillEmailLogin, getRequiredEnv } = require('../../tests/helpers');

async function clickByName(page, name, position = 'first') {
  const locator = page
    .getByRole('button', { name: new RegExp(`^${name}$`, 'i') })
    .or(page.getByRole('link', { name: new RegExp(`^${name}$`, 'i') }))
    .or(page.getByText(new RegExp(`^${name}$`, 'i')));

  const target = position === 'last' ? locator.last() : locator.first();
  await expect(target).toBeVisible({ timeout: 120000 });
  await target.click();
}

Given('the user navigates to {string}', async function (url) {
  await this.page.goto(url, { waitUntil: 'domcontentloaded' });
});

When('the user logs in with valid credentials', async function () {
  const email = getRequiredEnv('LOGIN_EMAIL');
  const password = getRequiredEnv('LOGIN_PASSWORD');

  await fillEmailLogin(this.page, email, password);
});

When('the user clicks on {string}', async function (label) {
  await clickByName(this.page, label);
});

When('the user waits for {int} seconds', async function (seconds) {
  await this.page.waitForTimeout(seconds * 1000);
});

When('the user clicks on the bottom {string} button', async function (label) {
  await clickByName(this.page, label, 'last');
});

When('the user enters a configuration name {string}', async function (configurationName) {
  const configurationNameField = this.page
    .locator('nile-input[placeholder="Enter Configuration Name"], nile-input[label="Configuration Name"]')
    .first();

  await expect(configurationNameField).toBeVisible({ timeout: 120000 });
  await configurationNameField.click();
  await this.page.keyboard.press(process.platform === 'darwin' ? 'Meta+A' : 'Control+A');
  await this.page.keyboard.press('Backspace');
  await this.page.keyboard.type(configurationName);
});

Then('the saved configuration {string} should be displayed', async function (configurationName) {
  await expect(this.page.getByText(configurationName, { exact: true }).first()).toBeVisible({ timeout: 120000 });
});

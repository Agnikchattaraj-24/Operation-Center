require('dotenv').config();

const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const {
  clickAgentsView,
  clickApplyButton,
  clickCalendarDay,
  clickCostAnalyticsIcon,
  clickCustomOption,
  clickLast30DaysButton,
  clickLast7DaysButton,
  clickLast7DaysOption,
  closeCostAnalyticsPanel,
  closeSavedConfigurationPanel,
  fillCustomDateRange,
} = require('../../tests/operationsCenter.helpers');

When('the user clicks on the {string} icon', async function (label) {
  if (label === 'Cost Analytics') {
    await clickCostAnalyticsIcon(this.page);
    return;
  }

  throw new Error(`Unsupported icon step: ${label}`);
});

When('the user closes the {string} panel', async function (label) {
  if (label === 'Cost Analytics') {
    await closeCostAnalyticsPanel(this.page);
    return;
  }

  throw new Error(`Unsupported panel step: ${label}`);
});

When('the user closes the saved configuration panel', async function () {
  await closeSavedConfigurationPanel(this.page);
});

When('the user clicks on the {string} button', async function (label) {
  if (label === 'Last 30 Days') {
    await clickLast30DaysButton(this.page);
    return;
  }

  if (label === 'Last 7 Days') {
    await clickLast7DaysButton(this.page);
    return;
  }

  if (label === 'Apply') {
    await clickApplyButton(this.page);
    return;
  }

  throw new Error(`Unsupported button step: ${label}`);
});

When('the user clicks on the {string} option', async function (label) {
  if (label === 'Last 7 Days') {
    await clickLast7DaysOption(this.page);
    return;
  }

  if (label === 'Custom') {
    await clickCustomOption(this.page);
    return;
  }

  throw new Error(`Unsupported option step: ${label}`);
});

When('the user clicks on the day {string} in the calendar', async function (day) {
  await clickCalendarDay(this.page, day);
});

When('the user fills the custom date range from {string} to {string}', async function (startDate, endDate) {
  await fillCustomDateRange(this.page, startDate, endDate);
});

When('the user toggles to the {string} view', async function (label) {
  if (label === 'Agents') {
    const pagePromise = this.context.waitForEvent('page').catch(() => null);
    await clickAgentsView(this.page);
    const newPage = await pagePromise;

    if (newPage) {
      this.agentsPage = newPage;
      await this.agentsPage.waitForLoadState('domcontentloaded');
    } else {
      this.agentsPage = this.page;
    }
    return;
  }

  throw new Error(`Unsupported toggle step: ${label}`);
});

Then('the Agents module should open in a new tab', async function () {
  await expect(this.agentsPage).toBeTruthy();
  await expect(this.agentsPage).toHaveURL(/agent|ops-center/i, { timeout: 120000 });
});

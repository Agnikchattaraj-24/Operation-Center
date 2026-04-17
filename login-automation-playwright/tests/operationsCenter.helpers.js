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

async function clickCostAnalyticsIcon(page) {
  const icon = page
    .getByText(/cost analytics/i)
    .or(page.getByRole('button', { name: /cost analytics/i }))
    .first();

  await expect(icon).toBeVisible({ timeout: 120000 });
  await icon.click();
}

async function closeCostAnalyticsPanel(page) {
  const closeButton = page
    .getByRole('button', { name: /close/i })
    .or(page.locator('button').filter({ hasText: /^×$/ }))
    .last();

  await expect(closeButton).toBeVisible({ timeout: 120000 });
  await closeButton.click();
}

async function closeSavedConfigurationPanel(page) {
  const closeCandidates = [
    page.getByRole('button', { name: /close/i }).first(),
    page.locator('button[aria-label="Close"]').first(),
    page.locator('nile-drawer button').first(),
    page.locator('button').filter({ has: page.locator('svg') }).first(),
  ];

  for (const candidate of closeCandidates) {
    if (await candidate.isVisible().catch(() => false)) {
      await candidate.click();
      await page.waitForTimeout(2000);
      return;
    }
  }

  await page.keyboard.press('Escape');
  await page.waitForTimeout(2000);
}

async function clickLast30DaysButton(page) {
  const last30DaysButton = page.getByRole('button', { name: /last 30 days/i }).first();

  await expect(last30DaysButton).toBeVisible({ timeout: 120000 });
  await last30DaysButton.click();
}

async function clickLast7DaysButton(page) {
  const button = page.getByRole('button', { name: /last 7 days/i }).first();

  await expect(button).toBeVisible({ timeout: 120000 });
  await button.click();
}

async function clickLast7DaysOption(page) {
  const option = page
    .getByRole('menuitem', { name: /last 7 days/i })
    .or(page.getByRole('option', { name: /last 7 days/i }))
    .or(page.getByText(/^Last 7 Days$/i))
    .last();

  await expect(option).toBeVisible({ timeout: 120000 });
  await option.click();
}

async function clickCustomOption(page) {
  const option = page
    .getByRole('menuitem', { name: /custom/i })
    .or(page.getByRole('option', { name: /custom/i }))
    .or(page.getByText(/^Custom$/i))
    .last();

  await expect(option).toBeVisible({ timeout: 120000 });
  await option.click();
}

async function fillCustomDateRange(page, startDate, endDate) {
  const dateInputs = page
    .locator('input')
    .filter({ hasNot: page.locator('[type="hidden"]') });

  const visibleInputs = [];
  const count = await dateInputs.count();

  for (let i = 0; i < count; i += 1) {
    const candidate = dateInputs.nth(i);
    const isVisible = await candidate.isVisible().catch(() => false);

    if (!isVisible) {
      continue;
    }

    const placeholder = (await candidate.getAttribute('placeholder').catch(() => '')) || '';
    const ariaLabel = (await candidate.getAttribute('aria-label').catch(() => '')) || '';
    const inputType = (await candidate.getAttribute('type').catch(() => 'text')) || 'text';

    if (
      inputType === 'text' &&
      (/date|mm|dd|yy/i.test(placeholder) || /date|start|end/i.test(ariaLabel) || visibleInputs.length < 2)
    ) {
      visibleInputs.push(candidate);
    }
  }

  if (visibleInputs.length < 2) {
    throw new Error('Could not find the start and end date inputs for the custom range.');
  }

  await visibleInputs[0].click();
  await visibleInputs[0].fill(startDate);
  await page.keyboard.press('Tab');
  await visibleInputs[1].click();
  await visibleInputs[1].fill(endDate);
  await page.keyboard.press('Tab');
}

async function clickCalendarDay(page, day) {
  const dayText = String(day);

  const locatorGroups = [
    page.locator(`[aria-label*="${dayText}"]`),
    page.locator(`[data-day="${dayText}"]`),
    page.locator('[role="gridcell"]').filter({ hasText: new RegExp(`\\b${dayText}\\b`) }),
    page.locator('button:not([disabled])').filter({ hasText: new RegExp(`\\b${dayText}\\b`) }),
    page.locator('td').filter({ hasText: new RegExp(`\\b${dayText}\\b`) }),
    page.getByText(new RegExp(`\\b${dayText}\\b`)),
  ];

  for (const group of locatorGroups) {
    const count = await group.count().catch(() => 0);

    for (let i = count - 1; i >= 0; i -= 1) {
      const candidate = group.nth(i);

      if (await candidate.isVisible().catch(() => false)) {
        await candidate.scrollIntoViewIfNeeded().catch(() => {});
        await candidate.click({ force: true });
        return;
      }
    }
  }

  throw new Error(`Could not find clickable calendar day: ${day}`);
}

async function clickApplyButton(page) {
  const applyButton = page
    .getByRole('button', { name: /^apply$/i })
    .or(page.getByText(/^Apply$/i))
    .last();

  await expect(applyButton).toBeVisible({ timeout: 120000 });
  await applyButton.click();
}

async function clickAgentsView(page) {
  const agentsButton = page.getByRole('button', { name: /^agents$/i }).first();

  await expect(agentsButton).toBeVisible({ timeout: 120000 });
  await agentsButton.click();
}

module.exports = {
  addNewSavedConfiguration,
  clickAgentsView,
  clickApplyButton,
  clickCalendarDay,
  clickCostAnalyticsIcon,
  clickCustomOption,
  fillCustomDateRange,
  clickLast30DaysButton,
  clickLast7DaysButton,
  clickLast7DaysOption,
  closeCostAnalyticsPanel,
  closeSavedConfigurationPanel,
  openOperationsCenter,
  openOperationsCenterApps,
  selectApplication,
};

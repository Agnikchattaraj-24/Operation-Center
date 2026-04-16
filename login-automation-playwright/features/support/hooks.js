require('dotenv').config();

const { Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

setDefaultTimeout(120000);

Before(async function () {
  const headless = this.parameters?.headless ?? (process.env.HEADLESS !== 'false');

  this.browser = await chromium.launch({ headless });
  this.context = await this.browser.newContext({
    viewport: { width: 1440, height: 960 },
  });
  this.page = await this.context.newPage();
});

After(async function ({ result }) {
  if (result?.status === 'FAILED' && this.page) {
    const screenshot = await this.page.screenshot({ fullPage: true }).catch(() => null);
    if (screenshot) {
      await this.attach(screenshot, 'image/png');
    }
  }

  if (this.context) {
    await this.context.close().catch(() => {});
  }

  if (this.browser) {
    await this.browser.close().catch(() => {});
  }
});

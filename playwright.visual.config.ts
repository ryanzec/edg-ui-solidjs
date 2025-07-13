import type { PlaywrightTestConfig } from '@playwright/test';
import { playwrightUtils } from './playwright-utils';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  grep: /@visual/,
  ...playwrightUtils.baseConfiguration,
};

export default config;

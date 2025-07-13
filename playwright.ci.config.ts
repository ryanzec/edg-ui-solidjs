import type { PlaywrightTestConfig } from '@playwright/test';
import { playwrightUtils } from './playwright-utils';

const config: PlaywrightTestConfig = {
  ...playwrightUtils.baseConfiguration,
};

export default config;

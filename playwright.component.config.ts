import type { PlaywrightTestConfig } from '@playwright/test';
import { playwrightUtils } from './playwright-utils';

const config: PlaywrightTestConfig = {
  grep: /^(?!.*@visual).*/,
  ...playwrightUtils.baseConfiguration,
};

export default config;

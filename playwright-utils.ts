import { devices, type PlaywrightTestConfig } from '@playwright/test';
import { viteUtils } from './vite-utils';

const DEV_SERVER_URL = 'http://localhost:6006';

const baseConfiguration: PlaywrightTestConfig = {
  testMatch: ['*.pw.ts', '*.pw.tsx'],
  testDir: './',
  snapshotDir: './__snapshots__',
  expect: {
    toHaveScreenshot: {
      threshold: 0.2,
    },
  },
  timeout: 15 * 1000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 4,
  reporter: 'list',
  use: {
    screenshot: process.env.CI ? 'off' : 'only-on-failure',

    // Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer
    trace: 'on-first-retry',
    baseURL: DEV_SERVER_URL,
    viewport: { width: 1024, height: 768 },

    // not sure why this produces a typescript error but it does work so ignoring for now
    // @ts-expect-error
    ctViteConfig: viteUtils.baseConfiguration,
  },
  webServer: [
    {
      // since component testing does not seem to work as it has weird error in the way code is imported, we are
      // using storybook to be able to do component level like tests
      command: 'pnpm sandbox:dev',
      timeout: 120 * 1000,
      reuseExistingServer: !process.env.CI,
      ignoreHTTPSErrors: true,

      // using url instead of port as it seems more reliable to assuring the dev server is running
      url: DEV_SERVER_URL,
    },
  ],
  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: {
          args: [
            // Aggressive font rendering consistency
            '--font-render-hinting=none',
            '--disable-font-subpixel-positioning',
            '--disable-skia-runtime-opts',
            '--disable-system-font-check',
            '--disable-font-feature-settings',
            '--disable-font-variation-settings',
            '--disable-lcd-text',

            // Display and scaling consistency
            '--force-device-scale-factor=1',
            '--disable-gpu',
            '--disable-gpu-sandbox',
            '--disable-dev-shm-usage',
            '--disable-extensions',

            // Rendering consistency
            '--disable-background-timer-throttling',
            '--disable-backgrounding-occluded-windows',
            '--disable-renderer-backgrounding',
            '--disable-features=TranslateUI,VizDisplayCompositor',
            '--disable-ipc-flooding-protection',
            '--disable-background-networking',

            // Force software rendering for consistency
            '--use-gl=swiftshader',
            '--disable-accelerated-2d-canvas',
            '--disable-accelerated-jpeg-decoding',
            '--disable-accelerated-mjpeg-decode',
            '--disable-accelerated-video-decode',
            '--disable-accelerated-video-encode',

            // Stability flags
            '--no-sandbox',
            '--disable-web-security',
          ],
        },
      },
    } /*,
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
    },*/,
  ],
};

export const playwrightUtils = {
  baseConfiguration,
};

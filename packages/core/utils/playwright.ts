import { expect, type Locator, type Page, type TestInfo, test } from '@playwright/test';

// @todo generic
// biome-ignore lint/suspicious/noExplicitAny: response can be anything
const mockApi = async (page: Page, url: string, responseData: Record<string, any>) => {
  await page.route(url, async (route) => {
    await route.fulfill({ json: responseData });
  });
};

type DragAndDropParams = {
  page: Page;
  dragLocator: Locator;
  dropLocator: Locator;
};

// based on this article
// https://reflect.run/articles/how-to-test-drag-and-drop-interactions-in-playwright/
const dragAndDrop = async ({ page, dragLocator, dropLocator }: DragAndDropParams) => {
  if (!dragLocator || !dropLocator) {
    test.fail(!dragLocator, 'can not do drag and drop because drag element was not located');
    test.fail(!dropLocator, 'can not do drag and drop because drop element was not located');

    // this is just a cleaner way make typescript not complain below instead of having to do null checks
    return;
  }

  const dragBoundingBox = await dragLocator.boundingBox();
  const dropBoundingBox = await dropLocator.boundingBox();

  if (!dragBoundingBox || !dropBoundingBox) {
    test.fail(!dragBoundingBox, 'can not do drag and drop because dragging bounding box was not located');
    test.fail(!dropBoundingBox, 'can not do drag and drop because dropping bounding box element was not located');

    // this is just a cleaner way make typescript not complain below instead of having to do null checks
    return;
  }

  // we want to target the center of the elements for the drag and drop
  const dragCenterX = dragBoundingBox.x + dragBoundingBox.width / 2;
  const dragCenterY = dragBoundingBox.y + dragBoundingBox.height / 2;
  const dropCenterX = dropBoundingBox.x + dropBoundingBox.width / 2;
  const dropCenterY = dropBoundingBox.y + dropBoundingBox.height / 2;

  // // moving the mouse to the center of the drag HTML element
  await page.mouse.move(dragCenterX, dragCenterY);
  await page.mouse.down();
  await page.mouse.move(dropCenterX, dropCenterY);
  await page.mouse.up();
};

const pauseTest = async (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

type BuildUrlOptions = {
  includeApiMocks?: boolean;
};

const defaultBuildUrlOptions = {
  includeApiMocks: false,
};

const buildUrl = (baseUrl: string, optionOverrides: BuildUrlOptions = {}) => {
  const options = structuredClone(Object.assign({}, defaultBuildUrlOptions, optionOverrides));
  const url = baseUrl;
  const searchParams = new URLSearchParams();

  if (!options.includeApiMocks) {
    searchParams.set('disable_api_mocks', 'true');
  }

  return `${url}?${searchParams.toString()}`;
};

const goto = async (page: Page, url: string) => {
  await page.goto(url);
};

export type PageTakeScreenshotOptions = {
  locator?: Locator;
  fileNameAppend?: string;
};

export class BasePage {
  readonly page: Page;

  readonly sandboxMainContent: Locator;

  constructor(page: Page) {
    this.page = page;

    this.sandboxMainContent = page.locator('[data-id="sandbox-main-content"]');
  }

  async goto(url: string) {
    return await goto(this.page, url);
  }

  async takeScreenshot(testInfo: TestInfo, options?: PageTakeScreenshotOptions) {
    const finalOptions = Object.assign({}, options);
    const testName = testInfo.titlePath.slice(1).join('-').replace(/\s+/g, '-').toLowerCase();
    const fileName = `${testName}${finalOptions.fileNameAppend || ''}`;

    // Wait for fonts to load before taking screenshots to ensure consistent rendering
    await this.page.evaluate(() => {
      return Promise.all([
        document.fonts.load('400 1em "Geist Sans"'),
        document.fonts.load('500 1em "Geist Sans"'),
        document.fonts.load('600 1em "Geist Sans"'),
        document.fonts.load('700 1em "Geist Sans"'),
        document.fonts.load('400 1em "Geist Mono"'),
        document.fonts.load('500 1em "Geist Mono"'),
        document.fonts.load('600 1em "Geist Mono"'),
        document.fonts.load('700 1em "Geist Mono"'),
      ]);
    });

    // Additional wait to ensure all fonts are ready
    await this.page.waitForFunction(() => document.fonts.ready);

    if (!finalOptions.locator) {
      await expect(this.sandboxMainContent).toHaveScreenshot(`${fileName}.png`);

      return;
    }

    const count = await finalOptions.locator.count();

    if (count === 1) {
      await expect(finalOptions.locator).toHaveScreenshot(`${fileName}.png`);

      return;
    }

    for (let i = 0; i < count; i++) {
      await expect(finalOptions.locator.nth(i)).toHaveScreenshot(`${fileName}-${i}.png`);
    }
  }
}

export const playwrightUtils = {
  mockApi,
  dragAndDrop,
  pauseTest,
  buildUrl,
  goto,
};

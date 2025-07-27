import { expect, type Locator, type Page, test } from '@playwright/test';

import { BasePage } from '$/core/utils/playwright';

const urls = {
  count: '/components/avatar/count',
  stack: '/components/avatar/stack',
  user: '/components/avatar/user',
  ellipsis: '/components/avatar/ellipsis',
  userHideName: '/components/avatar/user-hide-name',
  clickable: '/components/avatar/clickable',
  sizes: '/components/avatar/sizes',
};

class AvatarPage extends BasePage {
  readonly avatarLocator: Locator;
  readonly avatarStackLocator: Locator;
  readonly avatarUserLocator: Locator;
  readonly clickCount: Locator;

  constructor(page: Page) {
    super(page);

    this.avatarLocator = page.locator('[data-id="avatar"]');
    this.avatarStackLocator = page.locator('[data-id="avatar-stack"]');
    this.avatarUserLocator = page.locator('[data-id="avatar-user"]');
    this.clickCount = page.locator('[data-id="sandbox-click-count"]');
  }

  // assertions
  async expectAvatarCountToBe(expectedCount: number) {
    await expect(this.avatarLocator).toHaveCount(expectedCount);
  }

  async expectClickCountToBe(value: string) {
    await expect(this.clickCount).toHaveText(value);
  }

  async expectAvatarTextToBe(locator: Locator, expectedText: string) {
    await expect(locator).toHaveText(expectedText);
  }
}

test.describe('avatar @avatar-component', () => {
  test.describe('basic functionality', () => {
    test('renders with count display', async ({ page }) => {
      const componentPage = new AvatarPage(page);

      await componentPage.goto(urls.count);

      await componentPage.expectAvatarCountToBe(4);
      await componentPage.expectAvatarTextToBe(componentPage.avatarLocator.nth(0), '1');
      await componentPage.expectAvatarTextToBe(componentPage.avatarLocator.nth(1), '9+');
      await componentPage.expectAvatarTextToBe(componentPage.avatarLocator.nth(2), '12');
      await componentPage.expectAvatarTextToBe(componentPage.avatarLocator.nth(3), '99+');
    });

    test('click events work when clickable', async ({ page }) => {
      const componentPage = new AvatarPage(page);

      await componentPage.goto(urls.clickable);

      await componentPage.expectClickCountToBe('0');

      await componentPage.avatarLocator.nth(0).click();

      await componentPage.expectClickCountToBe('1');

      await componentPage.avatarLocator.nth(1).click();

      await componentPage.expectClickCountToBe('2');
    });
  });

  test.describe('visual @visual', () => {
    test('avatar stacks', async ({ page }, testInfo) => {
      const componentPage = new AvatarPage(page);

      await componentPage.goto(urls.stack);

      await expect(componentPage.avatarStackLocator).toHaveCount(2);

      await componentPage.takeScreenshot(testInfo);
    });

    test('user', async ({ page }, testInfo) => {
      const componentPage = new AvatarPage(page);

      await componentPage.goto(urls.user);

      await expect(componentPage.avatarUserLocator).toHaveCount(4);

      await componentPage.takeScreenshot(testInfo);
    });

    test('user name hidden', async ({ page }, testInfo) => {
      const componentPage = new AvatarPage(page);

      await componentPage.goto(urls.userHideName);

      await expect(componentPage.avatarUserLocator).toHaveCount(2);

      await componentPage.takeScreenshot(testInfo);
    });

    test('user text ellipsis', async ({ page }, testInfo) => {
      const componentPage = new AvatarPage(page);

      await componentPage.goto(urls.ellipsis);

      await expect(componentPage.avatarUserLocator).toHaveCount(4);

      await componentPage.takeScreenshot(testInfo);
    });

    test('size', async ({ page }, testInfo) => {
      const componentPage = new AvatarPage(page);

      await componentPage.goto(urls.sizes);

      await expect(componentPage.avatarLocator).toHaveCount(6);

      await componentPage.takeScreenshot(testInfo);
    });
  });
});

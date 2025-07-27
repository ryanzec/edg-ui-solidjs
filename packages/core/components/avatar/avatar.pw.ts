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
  readonly avatar: Locator;
  readonly avatarStack: Locator;
  readonly avatarUser: Locator;
  readonly clickCount: Locator;

  constructor(page: Page) {
    super(page);

    this.avatar = page.locator('[data-id="avatar"]');
    this.avatarStack = page.locator('[data-id="avatar-stack"]');
    this.avatarUser = page.locator('[data-id="avatar-user"]');
    this.clickCount = page.locator('[data-id="sandbox-click-count"]');
  }

  // selectors
  getAvatar(index = 0) {
    return this.avatar.nth(index);
  }

  getAvatarUser(index = 0) {
    return this.avatarUser.nth(index);
  }

  getClickCount(index = 0) {
    return this.clickCount.nth(index);
  }

  // actions
  async clickAvatar(index = 0) {
    await this.getAvatar(index).click();
  }

  async clickAvatarUser(index = 0) {
    await this.getAvatarUser(index).click();
  }

  // assertions
  async expectAvatarCountToBe(expectedCount: number) {
    await expect(this.avatar).toHaveCount(expectedCount);
  }

  async expectClickCountToBe(value: string) {
    await expect(this.getClickCount()).toHaveText(value);
  }

  async expectAvatarTextToBe(index: number, expectedText: string) {
    await expect(this.getAvatar(index)).toHaveText(expectedText);
  }
}

test.describe('avatar @avatar-component', () => {
  test.describe('basic functionality', () => {
    test('renders with count display', async ({ page }) => {
      const componentPage = new AvatarPage(page);

      await componentPage.goto(urls.count);

      await componentPage.expectAvatarCountToBe(4);
      await componentPage.expectAvatarTextToBe(0, '1');
      await componentPage.expectAvatarTextToBe(1, '9+');
      await componentPage.expectAvatarTextToBe(2, '12');
      await componentPage.expectAvatarTextToBe(3, '99+');
    });

    test('click events work when clickable', async ({ page }) => {
      const componentPage = new AvatarPage(page);

      await componentPage.goto(urls.clickable);

      await componentPage.expectClickCountToBe('0');

      await componentPage.clickAvatar(0);

      await componentPage.expectClickCountToBe('1');

      await componentPage.clickAvatar(1);

      await componentPage.expectClickCountToBe('2');
    });
  });

  test.describe('visual @visual', () => {
    test('avatar stacks', async ({ page }, testInfo) => {
      const componentPage = new AvatarPage(page);

      await componentPage.goto(urls.stack);

      await expect(componentPage.avatarStack).toHaveCount(2);

      await componentPage.takeScreenshot(testInfo);
    });

    test('user', async ({ page }, testInfo) => {
      const componentPage = new AvatarPage(page);

      await componentPage.goto(urls.user);

      await expect(componentPage.avatarUser).toHaveCount(4);

      await componentPage.takeScreenshot(testInfo);
    });

    test('user name hidden', async ({ page }, testInfo) => {
      const componentPage = new AvatarPage(page);

      await componentPage.goto(urls.userHideName);

      await expect(componentPage.avatarUser).toHaveCount(2);

      await componentPage.takeScreenshot(testInfo);
    });

    test('user text ellipsis', async ({ page }, testInfo) => {
      const componentPage = new AvatarPage(page);

      await componentPage.goto(urls.ellipsis);

      await expect(componentPage.avatarUser).toHaveCount(4);

      await componentPage.takeScreenshot(testInfo);
    });

    test('size', async ({ page }, testInfo) => {
      const componentPage = new AvatarPage(page);

      await componentPage.goto(urls.sizes);

      await expect(componentPage.avatar).toHaveCount(6);

      await componentPage.takeScreenshot(testInfo);
    });
  });
});

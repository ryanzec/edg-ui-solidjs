import { expect, type Locator, type Page, test } from '@playwright/test';

import { BasePage, playwrightUtils } from '$/core/utils/playwright';

const urls = {
  groupValidation: '/components/dynamic-form-builder/group-validation',
};

class DynamicFormBuilderPage extends BasePage {
  readonly formFieldContainerLocator: Locator;
  readonly formFieldInputLocator: Locator;
  readonly groupValidationAddTopArrayItemLocator: Locator;
  readonly groupValidationAddSecondLevelArrayItemLocator: Locator;
  readonly groupValidationAddThirdLevelArrayItemLocator: Locator;

  readonly submitButtonLocator: Locator;

  constructor(page: Page) {
    super(page);

    this.formFieldContainerLocator = page.locator('[data-id="form-fields"] > [data-id="form-field"]');
    this.formFieldInputLocator = this.formFieldContainerLocator.locator('input');
    this.groupValidationAddTopArrayItemLocator = page.locator(
      '[data-id="form-fields"] > [data-id="form-field"] > [data-id="form-array"] > [data-id="add-array-field-button"]',
    );
    this.groupValidationAddSecondLevelArrayItemLocator = page.locator(
      '[data-id="form-fields"] > [data-id="form-field"] > [data-id="form-array"] [data-id="form-array"] > [data-id="add-array-field-button"]',
    );
    this.groupValidationAddThirdLevelArrayItemLocator = page.locator(
      '[data-id="form-fields"] > [data-id="form-field"] > [data-id="form-array"] [data-id="form-array"] [data-id="form-array"] > [data-id="add-array-field-button"]',
    );

    this.submitButtonLocator = page.locator('[data-id="submit-button"]');
  }

  // locators
  getGroupTitle1ContainerLocator() {
    return this.formFieldContainerLocator.filter({ has: this.page.locator('input[name="title1"]') });
  }

  getGroupTitle1InputLocator() {
    return this.getGroupTitle1ContainerLocator().locator('input');
  }

  getGroupTitle2ContainerLocator() {
    return this.formFieldContainerLocator.filter({ has: this.page.locator('input[name="title2"]') });
  }

  getGroupTitle2InputLocator() {
    return this.getGroupTitle2ContainerLocator().locator('input');
  }

  getGroupTitle3ContainerLocator() {
    return this.formFieldContainerLocator.filter({ has: this.page.locator('input[name="title3"]') });
  }

  getGroupTitle3InputLocator() {
    return this.getGroupTitle3ContainerLocator().locator('input');
  }

  getGroupTest1ContainerLocator() {
    return this.formFieldContainerLocator.filter({ has: this.page.locator('input[name="test1"]') });
  }

  getGroupTest1InputLocator() {
    return this.getGroupTest1ContainerLocator().locator('input');
  }

  getGroupTest2ContainerLocator() {
    return this.formFieldContainerLocator.filter({ has: this.page.locator('input[name="test2"]') });
  }

  getGroupTest2InputLocator() {
    return this.getGroupTest2ContainerLocator().locator('input');
  }

  getGroupTest3ContainerLocator() {
    return this.formFieldContainerLocator.filter({ has: this.page.locator('input[name="test3"]') });
  }

  getGroupTest3InputLocator() {
    return this.getGroupTest3ContainerLocator().locator('input');
  }

  getGroupComplexObjectArrayContainerLocator() {
    return this.formFieldContainerLocator.nth(6);
  }

  getGroupComplexObjectArrayField3ContainerLocator() {
    return this.getGroupComplexObjectArrayContainerLocator()
      .locator('[data-id="form-array"] [data-id="form-array"] [data-id="form-array"] [data-id="form-field"]')
      .filter({ has: this.page.locator('input[name="reallyComplexObjectArray.0.complexArray.0.complex.0.field3"]') });
  }

  getGroupComplexObjectArrayField3InputLocator() {
    return this.getGroupComplexObjectArrayContainerLocator().locator(
      'input[name="reallyComplexObjectArray.0.complexArray.0.complex.0.field3"]',
    );
  }

  // expects
  async expectHasValidationMessage(locator: Locator, count: number) {
    await expect(locator.locator('[data-id="validation-message"]')).toHaveCount(count);
  }
}

test.describe('dynamic form builder @component', () => {
  test.describe('core', () => {
    test('should only validation the non-grouped field', async ({ page }) => {
      const dynamicFormBuilderPage = new DynamicFormBuilderPage(page);

      await dynamicFormBuilderPage.goto(urls.groupValidation);

      await dynamicFormBuilderPage.submitButtonLocator.click();

      await dynamicFormBuilderPage.expectHasValidationMessage(
        dynamicFormBuilderPage.getGroupTitle1ContainerLocator(),
        0,
      );
      await dynamicFormBuilderPage.expectHasValidationMessage(
        dynamicFormBuilderPage.getGroupTitle2ContainerLocator(),
        0,
      );
      await dynamicFormBuilderPage.expectHasValidationMessage(
        dynamicFormBuilderPage.getGroupTitle3ContainerLocator(),
        0,
      );
      await dynamicFormBuilderPage.expectHasValidationMessage(
        dynamicFormBuilderPage.getGroupTest1ContainerLocator(),
        0,
      );
      await dynamicFormBuilderPage.expectHasValidationMessage(
        dynamicFormBuilderPage.getGroupTest2ContainerLocator(),
        0,
      );
      await dynamicFormBuilderPage.expectHasValidationMessage(
        dynamicFormBuilderPage.getGroupTest3ContainerLocator(),
        1,
      );
      await dynamicFormBuilderPage.expectHasValidationMessage(
        dynamicFormBuilderPage.getGroupComplexObjectArrayContainerLocator(),
        0,
      );
    });

    test('should show validation message for grouped fields when one of the fields is filled in and the others are not', async ({
      page,
    }) => {
      const dynamicFormBuilderPage = new DynamicFormBuilderPage(page);

      await dynamicFormBuilderPage.goto(urls.groupValidation);

      await dynamicFormBuilderPage.getGroupTest1InputLocator().fill('test');

      await dynamicFormBuilderPage.submitButtonLocator.click();

      await dynamicFormBuilderPage.expectHasValidationMessage(
        dynamicFormBuilderPage.getGroupTitle1ContainerLocator(),
        0,
      );
      await dynamicFormBuilderPage.expectHasValidationMessage(
        dynamicFormBuilderPage.getGroupTitle2ContainerLocator(),
        0,
      );
      await dynamicFormBuilderPage.expectHasValidationMessage(
        dynamicFormBuilderPage.getGroupTitle3ContainerLocator(),
        0,
      );
      await dynamicFormBuilderPage.expectHasValidationMessage(
        dynamicFormBuilderPage.getGroupTest1ContainerLocator(),
        0,
      );
      await dynamicFormBuilderPage.expectHasValidationMessage(
        dynamicFormBuilderPage.getGroupTest2ContainerLocator(),
        1,
      );
      await dynamicFormBuilderPage.expectHasValidationMessage(
        dynamicFormBuilderPage.getGroupTest3ContainerLocator(),
        1,
      );
      await dynamicFormBuilderPage.expectHasValidationMessage(
        dynamicFormBuilderPage.getGroupComplexObjectArrayContainerLocator(),
        0,
      );
    });

    test('grouped fields validation should work on complex object', async ({ page }) => {
      const dynamicFormBuilderPage = new DynamicFormBuilderPage(page);

      await dynamicFormBuilderPage.goto(urls.groupValidation);

      await dynamicFormBuilderPage.getGroupTitle1InputLocator().fill('test');

      await dynamicFormBuilderPage.submitButtonLocator.click();

      await dynamicFormBuilderPage.expectHasValidationMessage(
        dynamicFormBuilderPage.getGroupTitle1ContainerLocator(),
        0,
      );
      await dynamicFormBuilderPage.expectHasValidationMessage(
        dynamicFormBuilderPage.getGroupTitle2ContainerLocator(),
        1,
      );
      await dynamicFormBuilderPage.expectHasValidationMessage(
        dynamicFormBuilderPage.getGroupTitle3ContainerLocator(),
        1,
      );
      await dynamicFormBuilderPage.expectHasValidationMessage(
        dynamicFormBuilderPage.getGroupTest1ContainerLocator(),
        0,
      );
      await dynamicFormBuilderPage.expectHasValidationMessage(
        dynamicFormBuilderPage.getGroupTest2ContainerLocator(),
        0,
      );
      await dynamicFormBuilderPage.expectHasValidationMessage(
        dynamicFormBuilderPage.getGroupTest3ContainerLocator(),
        1,
      );
      await dynamicFormBuilderPage.expectHasValidationMessage(
        dynamicFormBuilderPage.getGroupComplexObjectArrayContainerLocator(),
        1,
      );
    });

    test('should validate when all grouped fields are filled in', async ({ page }) => {
      const dynamicFormBuilderPage = new DynamicFormBuilderPage(page);

      await dynamicFormBuilderPage.goto(urls.groupValidation);

      await dynamicFormBuilderPage.getGroupTest1InputLocator().fill('test');
      await dynamicFormBuilderPage.getGroupTest2InputLocator().fill('test');

      await dynamicFormBuilderPage.submitButtonLocator.click();

      await dynamicFormBuilderPage.expectHasValidationMessage(
        dynamicFormBuilderPage.getGroupTitle1ContainerLocator(),
        0,
      );
      await dynamicFormBuilderPage.expectHasValidationMessage(
        dynamicFormBuilderPage.getGroupTitle2ContainerLocator(),
        0,
      );
      await dynamicFormBuilderPage.expectHasValidationMessage(
        dynamicFormBuilderPage.getGroupTitle3ContainerLocator(),
        0,
      );
      await dynamicFormBuilderPage.expectHasValidationMessage(
        dynamicFormBuilderPage.getGroupTest1ContainerLocator(),
        0,
      );
      await dynamicFormBuilderPage.expectHasValidationMessage(
        dynamicFormBuilderPage.getGroupTest2ContainerLocator(),
        0,
      );
      await dynamicFormBuilderPage.expectHasValidationMessage(
        dynamicFormBuilderPage.getGroupTest3ContainerLocator(),
        1,
      );
      await dynamicFormBuilderPage.expectHasValidationMessage(
        dynamicFormBuilderPage.getGroupComplexObjectArrayContainerLocator(),
        0,
      );
    });

    test('grouped fields validation should work on fields inside complex object', async ({ page }) => {
      const dynamicFormBuilderPage = new DynamicFormBuilderPage(page);

      await dynamicFormBuilderPage.goto(urls.groupValidation);

      await dynamicFormBuilderPage.groupValidationAddTopArrayItemLocator.click();
      await dynamicFormBuilderPage.groupValidationAddSecondLevelArrayItemLocator.click();
      await dynamicFormBuilderPage.groupValidationAddThirdLevelArrayItemLocator.click();

      await dynamicFormBuilderPage.getGroupTitle1InputLocator().fill('test');
      await dynamicFormBuilderPage.getGroupTitle2InputLocator().fill('test');
      await dynamicFormBuilderPage.getGroupTitle3InputLocator().fill('test');

      await dynamicFormBuilderPage.submitButtonLocator.click();

      await dynamicFormBuilderPage.expectHasValidationMessage(
        dynamicFormBuilderPage.getGroupTitle1ContainerLocator(),
        0,
      );
      await dynamicFormBuilderPage.expectHasValidationMessage(
        dynamicFormBuilderPage.getGroupTitle2ContainerLocator(),
        0,
      );
      await dynamicFormBuilderPage.expectHasValidationMessage(
        dynamicFormBuilderPage.getGroupTitle3ContainerLocator(),
        0,
      );
      await dynamicFormBuilderPage.expectHasValidationMessage(
        dynamicFormBuilderPage.getGroupTest1ContainerLocator(),
        0,
      );
      await dynamicFormBuilderPage.expectHasValidationMessage(
        dynamicFormBuilderPage.getGroupTest2ContainerLocator(),
        0,
      );
      await dynamicFormBuilderPage.expectHasValidationMessage(
        dynamicFormBuilderPage.getGroupTest3ContainerLocator(),
        1,
      );
      await dynamicFormBuilderPage.expectHasValidationMessage(
        dynamicFormBuilderPage.getGroupComplexObjectArrayField3ContainerLocator(),
        1,
      );
    });

    test('should validate when all grouped fields are filled in including ones in complex object', async ({ page }) => {
      const dynamicFormBuilderPage = new DynamicFormBuilderPage(page);

      await dynamicFormBuilderPage.goto(urls.groupValidation);

      await dynamicFormBuilderPage.groupValidationAddTopArrayItemLocator.click();
      await dynamicFormBuilderPage.groupValidationAddSecondLevelArrayItemLocator.click();
      await dynamicFormBuilderPage.groupValidationAddThirdLevelArrayItemLocator.click();

      await dynamicFormBuilderPage.getGroupTitle1InputLocator().fill('test');
      await dynamicFormBuilderPage.getGroupTitle2InputLocator().fill('test');
      await dynamicFormBuilderPage.getGroupTitle3InputLocator().fill('test');
      await dynamicFormBuilderPage.getGroupComplexObjectArrayField3InputLocator().fill('test');

      await dynamicFormBuilderPage.submitButtonLocator.click();

      await dynamicFormBuilderPage.expectHasValidationMessage(
        dynamicFormBuilderPage.getGroupTitle1ContainerLocator(),
        0,
      );
      await dynamicFormBuilderPage.expectHasValidationMessage(
        dynamicFormBuilderPage.getGroupTitle2ContainerLocator(),
        0,
      );
      await dynamicFormBuilderPage.expectHasValidationMessage(
        dynamicFormBuilderPage.getGroupTitle3ContainerLocator(),
        0,
      );
      await dynamicFormBuilderPage.expectHasValidationMessage(
        dynamicFormBuilderPage.getGroupTest1ContainerLocator(),
        0,
      );
      await dynamicFormBuilderPage.expectHasValidationMessage(
        dynamicFormBuilderPage.getGroupTest2ContainerLocator(),
        0,
      );
      await dynamicFormBuilderPage.expectHasValidationMessage(
        dynamicFormBuilderPage.getGroupTest3ContainerLocator(),
        1,
      );
      await dynamicFormBuilderPage.expectHasValidationMessage(
        dynamicFormBuilderPage.getGroupComplexObjectArrayField3ContainerLocator(),
        0,
      );
    });
  });
});

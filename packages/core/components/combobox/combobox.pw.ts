import { expect, type Locator, type Page, test } from '@playwright/test';

import { comboboxDataAttribute } from '$/core/components/combobox/utils';
import { BasePage, playwrightUtils } from '$/core/utils/playwright';

const urls = {
  single: '/components/combobox/single',
  multi: '/components/combobox/multi',
  singlePreselected: '/components/combobox/single-preselected',
  multiPreselected: '/components/combobox/multi-preselected',
  singleAutoShowOptions: '/components/combobox/single-auto-show-options',
  multiAutoShowOptions: '/components/combobox/multi-auto-show-options',
  singleNoForceSelection: '/components/combobox/single-no-force-selection',
  multiNoForceSelection: '/components/combobox/multi-no-force-selection',
  singlePlaceholder: '/components/combobox/single-placeholder',
  multiPlaceholder: '/components/combobox/multi-placeholder',
  singleAsync: '/components/combobox/single-async',
  multiAsync: '/components/combobox/multi-async',
  singleInForm: '/components/combobox/single-in-form',
  multiInForm: '/components/combobox/multi-in-form',
  singleInFormAutoShowOptions: '/components/combobox/single-in-form-auto-show-options',
  multiInFormAutoShowOptions: '/components/combobox/multi-in-form-auto-show-options',
  singleFormattedSelectables: '/components/combobox/single-formatted-selectables',
  multiFormattedSelectables: '/components/combobox/multi-formatted-selectables',
  singleFormattedSelectablesRemoveDuplicateSelect:
    '/components/combobox/single-formatted-selectables-remove-duplicate-select',
  singleDisabled: '/components/combobox/single-disabled',
  multiDisabled: '/components/combobox/multi-disabled',
  singleWithMissingData: '/components/combobox/single-with-missing-data',
  multiWithMissingData: '/components/combobox/multi-with-missing-data',
  singleDisabledOption: '/components/combobox/single-disabled-option',
  multiDisabledOption: '/components/combobox/multi-disabled-option',
};

class ComboboxPage extends BasePage {
  readonly comboboxInputLocator: Locator;
  readonly resetSelectedButtonLocator: Locator;
  readonly setSelectedButtonLocator: Locator;
  readonly comboboxOptionsContainerLocator: Locator;
  readonly comboboxOptionLocator: Locator;
  readonly comboboxHighlightedOptionLocator: Locator;
  readonly checkSelectedComboboxValueLocator: Locator;
  readonly checkFormValueLocator: Locator;
  readonly selectedOptionLocator: Locator;
  readonly secondSelectedOptionDeleteLocator: Locator;
  readonly asyncDataLoadingLocator: Locator;
  readonly asyncDataBeforeThresholdLocator: Locator;
  readonly noOptionsFoundLocator: Locator;
  readonly inputIconLocator: Locator;
  readonly clearIconTriggerLocator: Locator;
  readonly manualSelectedOptionsLocator: Locator;
  readonly optionLocator: Locator;
  readonly deleteButtonLocator: Locator;

  // @todo should just be a selector based on comboboxOptionLocator
  readonly firstComboboxOptionLocator: Locator;

  constructor(page: Page) {
    super(page);

    this.comboboxInputLocator = page.locator('[data-id="combobox"] [data-id="input"]');
    this.resetSelectedButtonLocator = page.locator('[data-id="reset-selected-button"]');
    this.setSelectedButtonLocator = page.locator('[data-id="set-selected-button"]');
    this.comboboxOptionsContainerLocator = page.locator('[data-id="combobox"] [data-id="selectable-options"]');
    this.comboboxOptionLocator = page.locator(
      '[data-id="combobox"] [data-id="selectable-options"] [data-id="selectable-option"]',
    );
    this.firstComboboxOptionLocator = page.locator(
      '[data-id="combobox"] [data-id="selectable-options"] [data-id="selectable-option"]:nth-child(1)',
    );
    this.comboboxHighlightedOptionLocator = page.locator(
      `[data-id="combobox"] [data-id="selectable-options"] [${comboboxDataAttribute.HIGHLIGHTED_OPTION}="true"]`,
    );
    this.checkSelectedComboboxValueLocator = page.locator('[data-id="check-selected-combobox-value"]');
    this.checkFormValueLocator = page.locator('[data-id="check-form-value"]');
    this.selectedOptionLocator = page.locator('[data-id="combobox"] [data-id="selected-option"]');
    this.secondSelectedOptionDeleteLocator = page.locator(
      '[data-id="combobox"] [data-id="selected-option"]:nth-child(2) [data-id="delete-indicator"]',
    );
    this.asyncDataLoadingLocator = page.locator('[data-id="combobox"] [data-id="async-options-loading"]');
    this.asyncDataBeforeThresholdLocator = page.locator(
      '[data-id="combobox"] [data-id="async-options-before-threshold"]',
    );
    this.noOptionsFoundLocator = page.locator('[data-id="combobox"] [data-id*="no-options-found"]');
    this.inputIconLocator = page.locator('[data-id="combobox"] [data-id="input-icon-indicator"]');
    this.clearIconTriggerLocator = page.locator('[data-id="combobox"] [data-id="clear-icon-trigger"]');
    this.manualSelectedOptionsLocator = page.locator('[data-id="manual-selected-options"]');
    this.optionLocator = page.locator(
      '[data-id="combobox"] [data-id="selectable-options"] [data-id="selectable-option"]',
    );
    this.deleteButtonLocator = page.locator(
      '[data-id="combobox"] [data-id="selected-option"] [data-id="delete-indicator"]',
    );
  }

  // expects
  async expectOptionsContainerToBeVisible(errorMessage: string) {
    await expect(this.comboboxOptionsContainerLocator, errorMessage).toBeVisible();
  }

  async expectOptionsContainerNotToBeVisible(errorMessage: string) {
    await expect(this.comboboxOptionsContainerLocator, errorMessage).not.toBeVisible();
  }

  async expectOptionsCount(count: number, errorMessage: string) {
    await expect(this.comboboxOptionLocator, errorMessage).toHaveCount(count);
  }

  async expectOptionToHaveText(text: string, errorMessage: string, count = 1) {
    await expect(
      this.page.locator('[data-id="combobox"] [data-id="selectable-options"] [data-id="selectable-option"]', {
        hasText: text,
      }),
      errorMessage,
    ).toHaveCount(count);
  }

  async expectSelectedOptionToHaveText(text: string, errorMessage: string, count = 1) {
    await expect(
      this.page.locator('[data-id="combobox"] [data-id="selected-option"]', { hasText: text }),
      errorMessage,
    ).toHaveCount(count);
  }

  async expectSelectedOptionsCount(count: number, errorMessage: string) {
    await expect(this.selectedOptionLocator, errorMessage).toHaveCount(count);
  }

  async expectHighlightedOptionsCount(count: number, errorMessage: string) {
    await expect(this.comboboxHighlightedOptionLocator, errorMessage).toHaveCount(count);
  }

  async expectHighlightedOptionDisplay(text: string, errorMessage: string) {
    await expect(this.comboboxHighlightedOptionLocator, errorMessage).toHaveText(text);
  }

  async expectOptionsNotToBeVisible(errorMessage: string) {
    await expect(this.comboboxOptionLocator, errorMessage).not.toBeVisible();
  }

  async expectInputToBeFocused(errorMessage: string) {
    await expect(this.comboboxInputLocator, errorMessage).toBeFocused();
  }

  async expectInputNotToBeFocused(errorMessage: string) {
    await expect(this.comboboxInputLocator, errorMessage).not.toBeFocused();
  }

  async expectInputValue(inputValue: string, errorMessage: string) {
    expect(await this.comboboxInputLocator.inputValue(), errorMessage).toBe(inputValue);
  }

  async expectInputAttribute(attribute: string, value: string, errorMessage: string) {
    await expect(this.comboboxInputLocator, errorMessage).toHaveAttribute(attribute, value);
  }

  async expectInputToBeDisabled(errorMessage: string) {
    await expect(this.comboboxInputLocator, errorMessage).toBeDisabled();
  }

  async expectManualSelectedOptionToHaveText(text: string, errorMessage: string, count = 1) {
    await expect(this.page.locator('[data-id="manual-selected-options"]', { hasText: text }), errorMessage).toHaveCount(
      count,
    );
  }

  async expectNoOptionsFoundNotToBeVisible(errorMessage: string) {
    // we need to limit the timeout in the case as the no options found would go away when the debounce
    // async call is executed so we want to make sure the no options is not visible before then
    await expect(this.noOptionsFoundLocator, errorMessage).toHaveCount(0, { timeout: 50 });
  }

  async expectNoOptionsFoundToBeVisible(errorMessage: string) {
    await expect(this.noOptionsFoundLocator, errorMessage).toHaveCount(1);
  }

  async expectAsyncDataLoadingIndicatorNotToBeVisible(errorMessage: string) {
    await expect(this.asyncDataLoadingLocator, errorMessage).toHaveCount(0);
  }

  async expectAsyncDataLoadingIndicatorToBeVisible(errorMessage: string) {
    await expect(this.asyncDataLoadingLocator, errorMessage).toHaveCount(1);
  }

  async expectAsyncDataBeforeThresholdIndicatorToBeVisible(errorMessage: string) {
    await expect(this.asyncDataBeforeThresholdLocator, errorMessage).toHaveCount(1);
  }

  async testSelectedValue(checkValue: string, isMultiSelect: boolean, errorContext?: string) {
    if (isMultiSelect) {
      await expect(this.selectedOptionLocator, errorContext).toContainText(checkValue);

      return;
    }

    await expect(this.checkSelectedComboboxValueLocator, errorContext).toContainText(checkValue);
  }

  async testNoSelectedValue(isMultiSelect: boolean, errorContext?: string) {
    if (isMultiSelect) {
      await expect(this.selectedOptionLocator, errorContext).toHaveCount(0);

      return;
    }

    await expect(this.checkSelectedComboboxValueLocator, errorContext).toHaveCount(0);
  }
}

test.describe('combobox @combobox-component', () => {
  test.describe('core functionality', () => {
    test('focusing the input should not show the list when not configured', async ({ page }) => {
      const testUrls = [urls.single, urls.multi];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.comboboxInputLocator.click();

        await componentPage.expectOptionsCount(0, loopErrorContext);
      }
    });

    test('focusing the input shows the list when configured', async ({ page }) => {
      const testUrls = [urls.singleAutoShowOptions, urls.multiAutoShowOptions];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.comboboxInputLocator.click();

        await componentPage.expectOptionsCount(4, loopErrorContext);
      }
    });

    test('typing filters the list', async ({ page }) => {
      const testUrls = [urls.single, urls.multi];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.comboboxInputLocator.click();
        await componentPage.comboboxInputLocator.fill('1');

        await componentPage.expectOptionsCount(1, loopErrorContext);
        await componentPage.expectHighlightedOptionsCount(0, loopErrorContext);
      }
    });

    test('using keyboard highlights item', async ({ page }) => {
      const testUrls = [urls.single, urls.multi];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.comboboxInputLocator.click();
        await componentPage.comboboxInputLocator.fill('t');
        await componentPage.comboboxInputLocator.press('ArrowDown');
        await componentPage.comboboxInputLocator.press('ArrowDown');

        await componentPage.expectHighlightedOptionDisplay('test2', loopErrorContext);
      }
    });

    test('using mouse highlights item', async ({ page }) => {
      const testUrls = [urls.single, urls.multi];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.comboboxInputLocator.click();
        await componentPage.comboboxInputLocator.fill('t');
        await componentPage.optionLocator.nth(0).hover();

        await componentPage.expectHighlightedOptionDisplay('test1', loopErrorContext);
      }
    });

    test('selecting an item hides the list', async ({ page }) => {
      const testUrls = [urls.single, urls.multi];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.comboboxInputLocator.click();
        await componentPage.comboboxInputLocator.fill('t');
        await componentPage.comboboxInputLocator.press('ArrowDown');
        await componentPage.comboboxInputLocator.press('ArrowDown');
        await componentPage.comboboxInputLocator.press('Enter');

        await componentPage.expectOptionsCount(0, loopErrorContext);
      }
    });

    test('the escape key hides the list', async ({ page }) => {
      const testUrls = [urls.single, urls.multi];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('/multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.comboboxInputLocator.click();
        await componentPage.comboboxInputLocator.fill('t');
        await componentPage.comboboxInputLocator.press('Escape');

        await componentPage.expectOptionsNotToBeVisible(loopErrorContext);
      }
    });

    test('the escape key works properly when showing items on focus', async ({ page }) => {
      const testUrls = [urls.singleAutoShowOptions, urls.multiAutoShowOptions];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('/multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.comboboxInputLocator.click();
        await componentPage.comboboxInputLocator.fill('t');
        await componentPage.comboboxInputLocator.press('Escape');

        await componentPage.expectInputToBeFocused(loopErrorContext);
        await componentPage.expectInputValue('', loopErrorContext);
        await componentPage.expectOptionsContainerToBeVisible(loopErrorContext);

        await componentPage.comboboxInputLocator.press('Escape');

        await componentPage.expectInputNotToBeFocused(loopErrorContext);
        await componentPage.expectOptionsNotToBeVisible(loopErrorContext);
      }
    });

    test('preselection works', async ({ page }) => {
      const testUrls = [urls.singlePreselected, urls.multiPreselected];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('/multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await componentPage.goto(testUrls[i]);

        if (!isMultiMode) {
          await componentPage.expectInputValue('test1', loopErrorContext);
        }

        await componentPage.testSelectedValue('test1', isMultiMode);
      }
    });

    test('escape clears selection', async ({ page }) => {
      const testUrls = [urls.singlePreselected, urls.multiPreselected];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('/multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.comboboxInputLocator.click();
        await componentPage.comboboxInputLocator.press('Escape');

        await componentPage.expectInputValue('', loopErrorContext);

        if (!isMultiMode) {
          await componentPage.testNoSelectedValue(isMultiMode, loopErrorContext);
        }
      }
    });

    test('tab hides the list', async ({ page }) => {
      const testUrls = [urls.single, urls.multi];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('/multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.comboboxInputLocator.click();
        await componentPage.comboboxInputLocator.fill('t');
        await componentPage.comboboxInputLocator.press('Tab');

        await componentPage.expectInputNotToBeFocused(loopErrorContext);
        await componentPage.expectOptionsContainerNotToBeVisible(loopErrorContext);
      }
    });

    test('tab with nothing selected does nothing', async ({ page }) => {
      const testUrls = [urls.single, urls.multi];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('/multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.comboboxInputLocator.click();
        await componentPage.comboboxInputLocator.fill('t');
        await componentPage.comboboxInputLocator.press('Tab');

        await componentPage.expectInputValue('', loopErrorContext);

        await componentPage.testNoSelectedValue(isMultiMode, loopErrorContext);
      }
    });

    test('tab with selection should do nothing', async ({ page }) => {
      const testUrls = [urls.single, urls.multi];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('/multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.comboboxInputLocator.click();
        await componentPage.comboboxInputLocator.fill('t');
        await componentPage.comboboxInputLocator.press('ArrowDown');
        await componentPage.comboboxInputLocator.press('Tab');

        await componentPage.expectInputValue('', loopErrorContext);

        await componentPage.testNoSelectedValue(isMultiMode, loopErrorContext);
      }
    });

    test('blurring hides the list', async ({ page }) => {
      const testUrls = [urls.single, urls.multi];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('/multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.comboboxInputLocator.click();
        await componentPage.comboboxInputLocator.fill('t');
        await componentPage.comboboxInputLocator.blur();

        await componentPage.expectInputNotToBeFocused(loopErrorContext);
        await componentPage.expectOptionsNotToBeVisible(loopErrorContext);
      }
    });

    test('blurring with input value and nothing selected does nothing with force selection', async ({ page }) => {
      const testUrls = [urls.single, urls.multi];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('/multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.comboboxInputLocator.click();
        await componentPage.comboboxInputLocator.fill('t');
        await componentPage.comboboxInputLocator.blur();

        await componentPage.expectInputValue('', loopErrorContext);

        await componentPage.testNoSelectedValue(isMultiMode, loopErrorContext);
      }
    });

    test('blurring with nothing selected but with previously selected value should keep previous value', async ({
      page,
    }) => {
      const testUrls = [urls.singlePreselected, urls.multiPreselected];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('/multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.comboboxInputLocator.click();
        await componentPage.comboboxInputLocator.press('Backspace');
        await componentPage.comboboxInputLocator.blur();

        await componentPage.expectInputValue(isMultiMode ? '' : 'test1', loopErrorContext);

        await componentPage.testSelectedValue('test1', isMultiMode, loopErrorContext);
      }
    });

    test('blurring with nothing selected but with previously selected value should keep previous value with show items on focused enabled', async ({
      page,
    }) => {
      const testUrls = [urls.singleAutoShowOptions, urls.multiAutoShowOptions];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('/multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.comboboxInputLocator.click();
        await componentPage.comboboxInputLocator.fill('t');
        await componentPage.optionLocator.nth(0).click();
        await componentPage.comboboxInputLocator.click();
        await componentPage.comboboxInputLocator.press('Backspace');
        await componentPage.comboboxInputLocator.blur();

        await componentPage.expectInputValue(isMultiMode ? '' : 'test1', loopErrorContext);

        await componentPage.testSelectedValue('test1', isMultiMode, loopErrorContext);
      }
    });

    test('placeholder works', async ({ page }) => {
      const testUrls = [urls.singlePlaceholder, urls.multiPlaceholder];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('/multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.expectInputAttribute('placeholder', 'placeholder', loopErrorContext);
      }
    });

    test('setting the selected value form outside the component is reflected in the component', async ({ page }) => {
      // multi select does not display anything in the input when something is selected
      const testUrls = [urls.single];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('/multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.setSelectedButtonLocator.click();

        await componentPage.expectInputValue('tes4', loopErrorContext);
        await componentPage.testSelectedValue('tes4', isMultiMode, loopErrorContext);
      }
    });

    test('clearing the selected value form outside the component is reflected in the component', async ({ page }) => {
      // multi select does not display anything in the input when something is selected
      const testUrls = [urls.single];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('/multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.setSelectedButtonLocator.click();
        await componentPage.resetSelectedButtonLocator.click();

        await componentPage.expectInputValue('', loopErrorContext);
        await componentPage.testNoSelectedValue(isMultiMode, loopErrorContext);
      }
    });

    test('highlight option and then clearing the input and blur should not select that last highlighted option', async ({
      page,
    }) => {
      // multi select does not display anything in the input when something is selected
      const testUrls = [urls.single];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('/multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.comboboxInputLocator.click();
        await componentPage.comboboxInputLocator.fill('t');
        await componentPage.comboboxInputLocator.press('Backspace');
        await componentPage.comboboxInputLocator.press('Backspace');

        await componentPage.expectOptionsCount(0, loopErrorContext);

        await componentPage.comboboxInputLocator.blur();

        await componentPage.expectInputValue('', loopErrorContext);
      }
    });

    test('input icon indicator works', async ({ page }) => {
      // multi select does not display anything in the input when something is selected
      const testUrls = [urls.single, urls.multi];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('/multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.inputIconLocator.click();

        await componentPage.expectInputToBeFocused(loopErrorContext);
        await componentPage.expectOptionsContainerToBeVisible(loopErrorContext);
      }
    });

    test('using the keyboard to select when list is not visible should make list visible', async ({ page }) => {
      // multi select does not display anything in the input when something is selected
      const testUrls = [urls.single, urls.multi];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('/multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.comboboxInputLocator.click();
        await componentPage.comboboxInputLocator.press('ArrowDown');

        await componentPage.expectInputToBeFocused(loopErrorContext);
        await componentPage.expectOptionsContainerToBeVisible(loopErrorContext);
      }
    });

    test('disabled', async ({ page }) => {
      const testUrls = [urls.singleDisabled, urls.multiDisabled];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.expectInputToBeDisabled(loopErrorContext);
      }
    });

    test('if an option has missing data, those options are not displayed', async ({ page }) => {
      // we need a higher timeout for this test because we are testing code that has a built-in delay of 1 second
      // for each iteration to test the async functionality
      test.setTimeout(30000);

      const testUrls = [urls.singleWithMissingData, urls.multiWithMissingData];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.comboboxInputLocator.click();

        await componentPage.expectOptionsCount(4, loopErrorContext);
        await componentPage.expectOptionToHaveText('test1', loopErrorContext);
        await componentPage.expectOptionToHaveText('test2', loopErrorContext);
        await componentPage.expectOptionToHaveText('tes3', loopErrorContext);
        await componentPage.expectOptionToHaveText('tes4', loopErrorContext);
      }
    });

    test('no options show properly', async ({ page }) => {
      const testUrls = [urls.single, urls.multi];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.comboboxInputLocator.click();
        await componentPage.comboboxInputLocator.fill('testing');

        await componentPage.expectNoOptionsFoundToBeVisible(loopErrorContext);
      }
    });
  });

  test.describe('single-select mode', () => {
    test('selecting a value should not filter that value out', async ({ page }) => {
      // multi select does not display anything in the input when something is selected
      const testUrls = [urls.singleAutoShowOptions];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('/multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.comboboxInputLocator.click();
        await componentPage.comboboxInputLocator.press('ArrowDown');
        await componentPage.comboboxInputLocator.press('Enter');
        await componentPage.comboboxInputLocator.blur();
        await componentPage.comboboxInputLocator.focus();
        await componentPage.comboboxInputLocator.press('Backspace');

        await componentPage.expectOptionsCount(2, loopErrorContext);
      }
    });

    test('input icon indicator should work when there is a selected value', async ({ page }) => {
      // multi select does not display anything in the input when something is selected
      const testUrls = [urls.singleNoForceSelection];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('/multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.comboboxInputLocator.click();
        await componentPage.comboboxInputLocator.fill('t');
        await componentPage.comboboxInputLocator.press('ArrowDown');
        await componentPage.comboboxInputLocator.blur();
        await componentPage.clearIconTriggerLocator.click();

        await componentPage.testNoSelectedValue(isMultiMode, loopErrorContext);
        await componentPage.expectInputNotToBeFocused(loopErrorContext);
      }
    });

    test.skip('auto scroll functionality works properly', async () => {});

    test.skip('changing local options works properly', async () => {});
  });

  test.describe('multi-select mode core functionality', () => {
    test('does not show previously selected items', async ({ page }) => {
      const testUrls = [urls.multi];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.comboboxInputLocator.click();

        await componentPage.expectOptionsCount(0, loopErrorContext);

        await componentPage.comboboxInputLocator.click();
        await componentPage.comboboxInputLocator.press('ArrowDown');
        await componentPage.comboboxInputLocator.press('Enter');
        await componentPage.comboboxInputLocator.press('ArrowDown');

        await componentPage.expectSelectedOptionToHaveText('test1', loopErrorContext);
      }
    });

    test('can selected multiple items', async ({ page }) => {
      const testUrls = [urls.multi];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.comboboxInputLocator.click();

        await componentPage.expectOptionsCount(0, loopErrorContext);

        await componentPage.comboboxInputLocator.click();
        await componentPage.comboboxInputLocator.press('ArrowDown');
        await componentPage.comboboxInputLocator.press('Enter');
        await componentPage.comboboxInputLocator.press('ArrowDown');
        await componentPage.comboboxInputLocator.press('Enter');

        await componentPage.expectSelectedOptionsCount(2, loopErrorContext);
        await componentPage.expectSelectedOptionToHaveText('test1', loopErrorContext);
        await componentPage.expectSelectedOptionToHaveText('test2', loopErrorContext);
      }
    });

    test('delete selected item works', async ({ page }) => {
      const testUrls = [urls.multi];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.expectOptionsCount(0, loopErrorContext);

        await componentPage.comboboxInputLocator.click();
        await componentPage.comboboxInputLocator.press('ArrowDown');
        await componentPage.comboboxInputLocator.press('Enter');
        await componentPage.comboboxInputLocator.press('ArrowDown');
        await componentPage.comboboxInputLocator.press('Enter');
        await componentPage.deleteButtonLocator.nth(1).click();

        await componentPage.expectSelectedOptionsCount(1, loopErrorContext);
        await componentPage.expectSelectedOptionToHaveText('test1', loopErrorContext);
      }
    });

    test('delete selected item does not show menu', async ({ page }) => {
      const testUrls = [urls.multi];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.expectOptionsCount(0, loopErrorContext);

        await componentPage.comboboxInputLocator.click();
        await componentPage.comboboxInputLocator.press('ArrowDown');
        await componentPage.comboboxInputLocator.press('Enter');
        await componentPage.comboboxInputLocator.press('ArrowDown');
        await componentPage.comboboxInputLocator.press('Enter');
        await componentPage.deleteButtonLocator.nth(1).click();

        await componentPage.expectOptionsContainerNotToBeVisible(loopErrorContext);
      }
    });

    test('delete selected item shows back in list', async ({ page }) => {
      const testUrls = [urls.multi];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.comboboxInputLocator.click();

        await componentPage.expectOptionsCount(0, loopErrorContext);

        await componentPage.comboboxInputLocator.click();
        await componentPage.comboboxInputLocator.press('ArrowDown');
        await componentPage.comboboxInputLocator.press('Enter');
        await componentPage.comboboxInputLocator.press('ArrowDown');
        await componentPage.comboboxInputLocator.press('Enter');
        await componentPage.deleteButtonLocator.nth(1).click();
        await componentPage.comboboxInputLocator.click();
        await componentPage.comboboxInputLocator.fill('t');

        await componentPage.expectOptionsCount(3, loopErrorContext);
        await componentPage.expectOptionToHaveText('test2', loopErrorContext);
      }
    });

    test('available items remain shown after selecting item with clicking when configured', async ({ page }) => {
      const testUrls = [urls.multiAutoShowOptions];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.comboboxInputLocator.click();
        await componentPage.comboboxInputLocator.press('ArrowDown');
        await componentPage.optionLocator.nth(0).click();

        await componentPage.expectOptionsContainerToBeVisible(loopErrorContext);
        await componentPage.expectOptionsCount(3, loopErrorContext);
      }
    });

    test('available items remain shown after selecting item with enter when configured', async ({ page }) => {
      const testUrls = [urls.multiAutoShowOptions];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.comboboxInputLocator.click();
        await componentPage.comboboxInputLocator.press('ArrowDown');
        await componentPage.comboboxInputLocator.press('Enter');

        await componentPage.expectOptionsContainerToBeVisible(loopErrorContext);
        await componentPage.expectOptionsCount(3, loopErrorContext);
      }
    });

    test('input icon indicator should work when there is a selected value', async ({ page }) => {
      // multi select does not display anything in the input when something is selected
      const testUrls = [urls.multiNoForceSelection];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('/multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.comboboxInputLocator.click();
        await componentPage.comboboxInputLocator.fill('testing new value');
        await componentPage.comboboxInputLocator.press('ArrowDown');
        await componentPage.comboboxInputLocator.press('Enter');
        await componentPage.inputIconLocator.click();

        await componentPage.testSelectedValue('testing new value', isMultiMode, loopErrorContext);
        await componentPage.expectInputToBeFocused(loopErrorContext);
      }
    });
  });

  test.describe('show selected option in list of options', () => {
    test('selected value still show up in list of options', async ({ page }) => {
      const testUrls = [urls.multiFormattedSelectables];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.comboboxInputLocator.click();

        await componentPage.expectOptionsCount(0, loopErrorContext);

        await componentPage.comboboxInputLocator.click();
        await componentPage.comboboxInputLocator.press('ArrowDown');
        await componentPage.comboboxInputLocator.press('Enter');
        await componentPage.comboboxInputLocator.press('ArrowDown');

        await componentPage.expectOptionToHaveText('test1', loopErrorContext);
        await componentPage.expectManualSelectedOptionToHaveText('test1', loopErrorContext);
      }
    });

    test('selecting an already selected value removes that value from being selected in multi-select mode', async ({
      page,
    }) => {
      const testUrls = [urls.multiFormattedSelectables];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.comboboxInputLocator.click();

        await componentPage.expectOptionsCount(0, loopErrorContext);

        await componentPage.comboboxInputLocator.click();
        await componentPage.comboboxInputLocator.press('ArrowDown');
        await componentPage.comboboxInputLocator.press('Enter');
        await componentPage.comboboxInputLocator.press('ArrowDown');
        await componentPage.comboboxInputLocator.press('Enter');

        await componentPage.expectManualSelectedOptionToHaveText('test1', loopErrorContext, 0);
      }
    });

    test('selecting an already selected value removes that value from being selected in single-select mode', async ({
      page,
    }) => {
      const testUrls = [urls.singleFormattedSelectablesRemoveDuplicateSelect];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.comboboxInputLocator.click();

        await componentPage.expectOptionsCount(0, loopErrorContext);

        await componentPage.comboboxInputLocator.click();
        await componentPage.comboboxInputLocator.press('ArrowDown');
        await componentPage.comboboxInputLocator.press('Enter');
        await componentPage.comboboxInputLocator.press('ArrowDown');
        await componentPage.comboboxInputLocator.press('Enter');

        await componentPage.testNoSelectedValue(false, loopErrorContext);
      }
    });
  });

  test.describe('async item retrieval', () => {
    test('no option does not show up while the debounce is wait to be processed', async ({ page }) => {
      const testUrls = [urls.singleAsync, urls.multiAsync];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.comboboxInputLocator.click();
        await componentPage.comboboxInputLocator.fill('t');

        await componentPage.expectNoOptionsFoundNotToBeVisible(loopErrorContext);
      }
    });

    test('shows before threshold option @slow', async ({ page }) => {
      // we need a higher timeout for this test because we are testing code that has a built-in delay of 1 second
      // for each iteration to test the async functionality
      test.setTimeout(30000);

      const testUrls = [urls.singleAsync, urls.multiAsync];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.comboboxInputLocator.click();
        await componentPage.comboboxInputLocator.fill('t');

        await componentPage.expectAsyncDataLoadingIndicatorNotToBeVisible(loopErrorContext);

        // we delay in order to make sure the debounce happens, and we are still showing the before threshold content
        await playwrightUtils.pauseTest(500);

        await componentPage.expectAsyncDataBeforeThresholdIndicatorToBeVisible(loopErrorContext);
      }
    });

    test('shows async data after threshold is meet @slow', async ({ page }) => {
      // we need a higher timeout for this test because we are testing code that has a built-in delay of 1 second
      // for each iteration to test the async functionality
      test.setTimeout(30000);

      const testUrls = [urls.singleAsync, urls.multiAsync];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.comboboxInputLocator.click();
        await componentPage.comboboxInputLocator.fill('tes');

        await componentPage.expectAsyncDataLoadingIndicatorToBeVisible(loopErrorContext);
        await componentPage.expectOptionsCount(4, loopErrorContext);
      }
    });
  });

  test.describe('in form', () => {
    // this needs to be testing in a form context as Enter has special meaning for an input when in a form
    test('multi select selects item with enter and keeps input focused without typing', async ({ page }) => {
      const testUrls = [urls.multiInForm, urls.multiInFormAutoShowOptions];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.comboboxInputLocator.click();
        await componentPage.comboboxInputLocator.press('ArrowDown');
        await componentPage.comboboxInputLocator.press('Enter');

        await componentPage.expectSelectedOptionsCount(1, loopErrorContext);
        await componentPage.expectInputValue('', loopErrorContext);
        await componentPage.expectInputToBeFocused(loopErrorContext);
      }
    });
  });

  test.describe('disabled options', () => {
    test('disabled options are skipped when navigating with the down arrow', async ({ page }) => {
      const testUrls = [urls.singleDisabledOption, urls.multiDisabledOption];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.comboboxInputLocator.click();

        await componentPage.expectOptionsCount(5, loopErrorContext);

        await componentPage.comboboxInputLocator.press('ArrowDown');
        await componentPage.comboboxInputLocator.press('ArrowDown');
        await componentPage.comboboxInputLocator.press('ArrowDown');
        await componentPage.comboboxInputLocator.press('ArrowDown');
        await componentPage.comboboxInputLocator.press('ArrowDown');

        await componentPage.expectInputValue('', loopErrorContext);
        await componentPage.expectHighlightedOptionDisplay('test1', loopErrorContext);
      }
    });

    test('disabled options are skipped when navigating with the up arrow', async ({ page }) => {
      const testUrls = [urls.singleDisabledOption, urls.multiDisabledOption];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.comboboxInputLocator.click();

        await componentPage.expectOptionsCount(5, loopErrorContext);

        await componentPage.comboboxInputLocator.press('ArrowUp');

        await componentPage.expectInputValue('', loopErrorContext);
        await componentPage.expectHighlightedOptionDisplay('tes4', loopErrorContext);
      }
    });

    test('clicking on a disabled option does not select it', async ({ page }) => {
      const testUrls = [urls.singleDisabledOption, urls.multiDisabledOption];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.comboboxInputLocator.click();

        await componentPage.expectOptionsCount(5, loopErrorContext);

        // since this should be disabled we need to force the click
        await componentPage.optionLocator.nth(4).click({ force: true });

        await componentPage.expectInputValue('', loopErrorContext);
      }
    });
  });
});

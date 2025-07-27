import { expect, type Locator, type Page, test } from '@playwright/test';

import { BasePage, playwrightUtils } from '$/core/utils/playwright';

const urls = {
  validationArrayFields: '/stores/form/validation-array-fields',
  validationCheckboxBoolean: '/stores/form/validation-checkbox-boolean',
  validationCheckboxValues: '/stores/form/validation-checkbox-values',
  validationCheckboxToggle: '/stores/form/validation-checkbox-toggle',
  validationCombobox: '/stores/form/validation-combobox',
  validationDate: '/stores/form/validation-date',
  validationDateRange: '/stores/form/validation-date-range',
  validationInput: '/stores/form/validation-input',
  validationNumber: '/stores/form/validation-number',
  validationRadio: '/stores/form/validation-radio',
  validationTextarea: '/stores/form/validation-textarea',
  validationTime: '/stores/form/validation-time',
  clear: '/stores/form/clear',
  dynamicFormElements: '/stores/form/dynamic-form-elements',
  isTouched: '/stores/form/is-touched',
  resetWithoutInitial: '/stores/form/reset-without-initial',
  resetWithInitial: '/stores/form/reset-with-initial',
  setValue: '/stores/form/set-value',
  initializeWithValues: '/stores/form/initialize-with-values',
  events: '/stores/form/events',
  validateOnChange: '/stores/form/validate-on-change',
  noValidateOnChange: '/stores/form/no-validate-on-change',
};
class FormStorePage extends BasePage {
  readonly setValueButtonLocator: Locator;
  readonly resetButtonLocator: Locator;
  readonly clearButtonLocator: Locator;
  readonly submitButtonLocator: Locator;
  readonly addArrayFieldValidatedButtonLocator: Locator;
  readonly removeArrayFieldButtonLocator: Locator;
  readonly addStringFieldButtonLocator: Locator;
  readonly isTouchedLocator: Locator;
  readonly valueChangeEventTriggeredLocator: Locator;
  readonly submitEventTriggeredLocator: Locator;
  readonly clearEventTriggeredLocator: Locator;
  readonly resetEventTriggeredLocator: Locator;

  readonly arrayFieldContainerLocator: Locator;
  readonly arrayFieldInputLocator: Locator;
  readonly arrayFieldValidatedContainerLocator: Locator;
  readonly arrayFieldValidatedInputLocator: Locator;

  readonly checkboxContainerLocator: Locator;
  readonly checkboxLocator: Locator;
  readonly checkboxValidatedContainerLocator: Locator;
  readonly checkboxValidatedLocator: Locator;

  readonly comboboxContainerLocator: Locator;
  readonly comboboxLocator: Locator;
  readonly comboboxValidatedContainerLocator: Locator;
  readonly comboboxValidatedLocator: Locator;

  readonly dateContainerLocator: Locator;
  readonly dateLocator: Locator;
  readonly dateValidatedContainerLocator: Locator;
  readonly dateValidatedLocator: Locator;

  readonly dateRangeContainerLocator: Locator;
  readonly dateRangeLocator: Locator;
  readonly dateRangeValidatedContainerLocator: Locator;
  readonly dateRangeValidatedLocator: Locator;

  readonly inputContainerLocator: Locator;
  readonly inputLocator: Locator;
  readonly inputValidatedContainerLocator: Locator;
  readonly inputValidatedLocator: Locator;

  readonly numberContainerLocator: Locator;
  readonly numberLocator: Locator;
  readonly numberValidatedContainerLocator: Locator;
  readonly numberValidatedLocator: Locator;

  readonly radioContainerLocator: Locator;
  readonly radioLocator: Locator;
  readonly radioValidatedContainerLocator: Locator;
  readonly radioValidatedLocator: Locator;

  readonly textareaContainerLocator: Locator;
  readonly textareaLocator: Locator;
  readonly textareaValidatedContainerLocator: Locator;
  readonly textareaValidatedLocator: Locator;

  readonly timeContainerLocator: Locator;
  readonly timeLocator: Locator;
  readonly timeValidatedContainerLocator: Locator;
  readonly timeValidatedLocator: Locator;

  constructor(page: Page) {
    super(page);

    this.setValueButtonLocator = page.locator('[data-id="set-value-button"]');
    this.resetButtonLocator = page.locator('[data-id="reset-button"]');
    this.clearButtonLocator = page.locator('[data-id="clear-button"]');
    this.submitButtonLocator = page.locator('[data-id="submit-button"]');
    this.addArrayFieldValidatedButtonLocator = page.locator('[data-id="add-array-field-validated-button"]');
    this.removeArrayFieldButtonLocator = page.locator('[data-id="remove-array-field-button"]');
    this.isTouchedLocator = page.locator('[data-id="is-touched-indicator"]');
    this.valueChangeEventTriggeredLocator = page.locator('[data-id="value-changed-event-triggered-indicator"]');
    this.submitEventTriggeredLocator = page.locator('[data-id="submit-event-triggered-indicator"]');
    this.clearEventTriggeredLocator = page.locator('[data-id="clear-event-triggered-indicator"]');
    this.resetEventTriggeredLocator = page.locator('[data-id="reset-event-triggered-indicator"]');
    this.addStringFieldButtonLocator = page.locator('[data-id="add-string-field"]');

    this.arrayFieldContainerLocator = page.locator('[data-id="array"]');
    this.arrayFieldInputLocator = this.arrayFieldContainerLocator.locator('input');
    this.arrayFieldValidatedContainerLocator = page.locator('[data-id="array-validated"]');
    this.arrayFieldValidatedInputLocator = this.arrayFieldValidatedContainerLocator.locator('input');

    this.checkboxContainerLocator = page.locator('[data-id="checkbox"]');
    this.checkboxLocator = this.checkboxContainerLocator.locator('input');
    this.checkboxValidatedContainerLocator = page.locator('[data-id="checkbox-validated"]');
    this.checkboxValidatedLocator = this.checkboxValidatedContainerLocator.locator('input');

    this.comboboxContainerLocator = page.locator('[data-id="combobox"]');
    this.comboboxLocator = this.comboboxContainerLocator.locator('input');
    this.comboboxValidatedContainerLocator = page.locator('[data-id="combobox-validated"]');
    this.comboboxValidatedLocator = this.comboboxValidatedContainerLocator.locator('input');

    this.dateContainerLocator = page.locator('[data-id="date"]');
    this.dateLocator = this.dateContainerLocator.locator('input');
    this.dateValidatedContainerLocator = page.locator('[data-id="date-validated"]');
    this.dateValidatedLocator = this.dateValidatedContainerLocator.locator('input');

    this.dateRangeContainerLocator = page.locator('[data-id="date-range"]');
    this.dateRangeLocator = this.dateRangeContainerLocator.locator('input');
    this.dateRangeValidatedContainerLocator = page.locator('[data-id="date-range-validated"]');
    this.dateRangeValidatedLocator = this.dateRangeValidatedContainerLocator.locator('input');

    this.inputContainerLocator = page.locator('[data-id="input"]');
    this.inputLocator = this.inputContainerLocator.locator('input');
    this.inputValidatedContainerLocator = page.locator('[data-id="input-validated"]');
    this.inputValidatedLocator = this.inputValidatedContainerLocator.locator('input');

    this.numberContainerLocator = page.locator('[data-id="number"]');
    this.numberLocator = this.numberContainerLocator.locator('input');
    this.numberValidatedContainerLocator = page.locator('[data-id="number-validated"]');
    this.numberValidatedLocator = this.numberValidatedContainerLocator.locator('input');

    this.radioContainerLocator = page.locator('[data-id="radio"]');
    this.radioLocator = this.radioContainerLocator.locator('input');
    this.radioValidatedContainerLocator = page.locator('[data-id="radio-validated"]');
    this.radioValidatedLocator = this.radioValidatedContainerLocator.locator('input');

    this.textareaContainerLocator = page.locator('[data-id="textarea"]');
    this.textareaLocator = this.textareaContainerLocator.locator('textarea');
    this.textareaValidatedContainerLocator = page.locator('[data-id="textarea-validated"]');
    this.textareaValidatedLocator = this.textareaValidatedContainerLocator.locator('textarea');

    this.timeContainerLocator = page.locator('[data-id="time"]');
    this.timeLocator = this.timeContainerLocator.locator('input');
    this.timeValidatedContainerLocator = page.locator('[data-id="time-validated"]');
    this.timeValidatedLocator = this.timeValidatedContainerLocator.locator('input');
  }

  // expects
  async expectInputValueToBe(locator: Locator, value: string) {
    expect(await locator.inputValue()).toBe(value);
  }

  async expectTextareaValueToBe(locator: Locator, value: string) {
    expect(await locator.inputValue()).toBe(value);
  }

  async expectHasIsTouchedIndicator(count: number) {
    await expect(this.isTouchedLocator).toHaveCount(count);
  }

  async expectHasSubmitEventTriggered(count: number) {
    await expect(this.submitEventTriggeredLocator).toHaveCount(count);
  }

  async expectHasClearEventTriggered(count: number) {
    await expect(this.clearEventTriggeredLocator).toHaveCount(count);
  }

  async expectHasResetEventTriggered(count: number) {
    await expect(this.resetEventTriggeredLocator).toHaveCount(count);
  }

  async expectHasValueChangeEventTriggered(count: number) {
    await expect(this.valueChangeEventTriggeredLocator).toHaveCount(count);
  }

  async expectHasValidationMessage(locator: Locator, count: number) {
    await expect(locator.locator('[data-id="validation-message"]')).toHaveCount(count);
  }

  async expectHasArrayFieldElement(locator: Locator, count: number) {
    await expect(locator).toHaveCount(count);
  }
}

test.describe('form store @store', () => {
  test.describe('core', () => {
    test('set value outside of input element', async ({ page }) => {
      const formStorePage = new FormStorePage(page);

      await formStorePage.goto(playwrightUtils.buildUrl(urls.setValue));

      await formStorePage.expectInputValueToBe(formStorePage.inputLocator, '');

      await formStorePage.setValueButtonLocator.click();

      await formStorePage.expectInputValueToBe(formStorePage.inputLocator, 'test');
    });

    test('initialize form with data', async ({ page }) => {
      const formStorePage = new FormStorePage(page);

      await formStorePage.goto(playwrightUtils.buildUrl(urls.initializeWithValues));

      await formStorePage.expectInputValueToBe(formStorePage.inputLocator.nth(0), 'test');
      await formStorePage.expectInputValueToBe(formStorePage.inputLocator.nth(1), 'test2');
    });

    test('clear form', async ({ page }) => {
      const formStorePage = new FormStorePage(page);

      await formStorePage.goto(playwrightUtils.buildUrl(urls.clear));

      await formStorePage.expectInputValueToBe(formStorePage.inputLocator.nth(0), 'test');
      await formStorePage.expectInputValueToBe(formStorePage.inputLocator.nth(1), 'test2');

      await formStorePage.clearButtonLocator.click();

      await formStorePage.expectInputValueToBe(formStorePage.inputLocator.nth(0), '');
      await formStorePage.expectInputValueToBe(formStorePage.inputLocator.nth(1), '');
    });

    test('reset form without initial data', async ({ page }) => {
      const formStorePage = new FormStorePage(page);

      await formStorePage.goto(playwrightUtils.buildUrl(urls.resetWithoutInitial));

      await formStorePage.inputLocator.nth(0).fill('first');
      await formStorePage.inputLocator.nth(1).fill('second');
      await formStorePage.textareaLocator.fill('third');

      await formStorePage.expectInputValueToBe(formStorePage.inputLocator.nth(0), 'first');
      await formStorePage.expectInputValueToBe(formStorePage.inputLocator.nth(1), 'second');
      await formStorePage.expectTextareaValueToBe(formStorePage.textareaLocator, 'third');

      await formStorePage.resetButtonLocator.click();

      await formStorePage.expectInputValueToBe(formStorePage.inputLocator.nth(0), '');
      await formStorePage.expectInputValueToBe(formStorePage.inputLocator.nth(1), '');
      await formStorePage.expectTextareaValueToBe(formStorePage.textareaLocator, '');
    });

    test('reset form with initial data', async ({ page }) => {
      const formStorePage = new FormStorePage(page);

      await formStorePage.goto(playwrightUtils.buildUrl(urls.resetWithInitial));

      await formStorePage.clearButtonLocator.click();

      await formStorePage.expectInputValueToBe(formStorePage.inputLocator.nth(0), '');
      await formStorePage.expectInputValueToBe(formStorePage.inputLocator.nth(1), '');
      await formStorePage.expectTextareaValueToBe(formStorePage.textareaLocator, '');

      await formStorePage.resetButtonLocator.click();

      await formStorePage.expectInputValueToBe(formStorePage.inputLocator.nth(0), 'test');
      await formStorePage.expectInputValueToBe(formStorePage.inputLocator.nth(1), 'test2');
      await formStorePage.expectTextareaValueToBe(formStorePage.textareaLocator, 'test3');
    });

    test('clear form reset touched status', async ({ page }) => {
      const formStorePage = new FormStorePage(page);

      await formStorePage.goto(playwrightUtils.buildUrl(urls.isTouched));

      await formStorePage.inputLocator.click();
      await formStorePage.inputLocator.blur();
      await formStorePage.clearButtonLocator.click();

      await formStorePage.expectHasIsTouchedIndicator(0);
    });

    test('reset form reset touched status', async ({ page }) => {
      const formStorePage = new FormStorePage(page);

      await formStorePage.goto(playwrightUtils.buildUrl(urls.isTouched));

      await formStorePage.inputLocator.click();
      await formStorePage.inputLocator.blur();
      await formStorePage.resetButtonLocator.click();

      await formStorePage.expectHasIsTouchedIndicator(0);
    });
  });

  test.describe('events', () => {
    test('submit event', async ({ page }) => {
      const formStorePage = new FormStorePage(page);

      await formStorePage.goto(playwrightUtils.buildUrl(urls.events));

      await formStorePage.submitButtonLocator.click();

      await formStorePage.expectHasSubmitEventTriggered(1);
    });

    test('submit event not triggered when there are validation errors', async ({ page }) => {
      const formStorePage = new FormStorePage(page);

      await formStorePage.goto(playwrightUtils.buildUrl(urls.events));

      await formStorePage.clearButtonLocator.click();
      await formStorePage.submitButtonLocator.click();

      await formStorePage.expectHasSubmitEventTriggered(0);
    });

    test('clear event', async ({ page }) => {
      const formStorePage = new FormStorePage(page);

      await formStorePage.goto(playwrightUtils.buildUrl(urls.events));

      await formStorePage.clearButtonLocator.click();

      await formStorePage.expectHasClearEventTriggered(1);
    });

    test('reset event', async ({ page }) => {
      const formStorePage = new FormStorePage(page);

      await formStorePage.goto(playwrightUtils.buildUrl(urls.events));

      await formStorePage.resetButtonLocator.click();

      await formStorePage.expectHasResetEventTriggered(1);
    });

    test('value changed event', async ({ page }) => {
      const formStorePage = new FormStorePage(page);

      await formStorePage.goto(playwrightUtils.buildUrl(urls.events));

      await formStorePage.inputValidatedLocator.fill('t');

      await formStorePage.expectHasValueChangeEventTriggered(1);
    });
  });

  test.describe('general validation', () => {
    test('shows when invalid', async ({ page }) => {
      const formStorePage = new FormStorePage(page);

      await formStorePage.goto(playwrightUtils.buildUrl(urls.validationInput));

      await formStorePage.inputValidatedLocator.click();
      await formStorePage.inputValidatedLocator.press('Backspace');
      await formStorePage.inputValidatedLocator.blur();

      await formStorePage.expectHasValidationMessage(formStorePage.inputValidatedContainerLocator, 1);
    });

    test('validates on submit', async ({ page }) => {
      const formStorePage = new FormStorePage(page);

      await formStorePage.goto(playwrightUtils.buildUrl(urls.validationInput));

      await formStorePage.submitButtonLocator.click();

      await formStorePage.expectHasValidationMessage(formStorePage.inputValidatedContainerLocator, 1);
    });

    test('validates on change', async ({ page }) => {
      const formStorePage = new FormStorePage(page);

      await formStorePage.goto(playwrightUtils.buildUrl(urls.validationInput));

      await formStorePage.submitButtonLocator.click();
      await formStorePage.inputValidatedLocator.fill('t');

      await formStorePage.expectHasValidationMessage(formStorePage.inputValidatedContainerLocator, 0);
    });

    test('reset form reset validation', async ({ page }) => {
      const formStorePage = new FormStorePage(page);

      await formStorePage.goto(playwrightUtils.buildUrl(urls.validationInput));

      await formStorePage.submitButtonLocator.click();
      await formStorePage.resetButtonLocator.click();

      await formStorePage.expectHasValidationMessage(formStorePage.inputValidatedContainerLocator, 0);
    });

    test('clear form reset validation', async ({ page }) => {
      const formStorePage = new FormStorePage(page);

      await formStorePage.goto(playwrightUtils.buildUrl(urls.validationInput));

      await formStorePage.submitButtonLocator.click();
      await formStorePage.clearButtonLocator.click();

      await formStorePage.expectHasValidationMessage(formStorePage.inputValidatedContainerLocator, 0);
    });

    test('does not validate on change', async ({ page }) => {
      const formStorePage = new FormStorePage(page);

      await formStorePage.goto(playwrightUtils.buildUrl(urls.noValidateOnChange));

      await formStorePage.submitButtonLocator.click();
      await formStorePage.inputValidatedLocator.fill('t');

      await formStorePage.expectHasValidationMessage(formStorePage.inputValidatedContainerLocator, 1);

      await formStorePage.submitButtonLocator.click();

      await formStorePage.expectHasValidationMessage(formStorePage.inputValidatedContainerLocator, 0);
    });
  });

  test.describe('array input', () => {
    test('add element', async ({ page }) => {
      const formStorePage = new FormStorePage(page);

      await formStorePage.goto(playwrightUtils.buildUrl(urls.validationArrayFields));

      await formStorePage.addArrayFieldValidatedButtonLocator.click();

      await formStorePage.expectHasArrayFieldElement(formStorePage.arrayFieldValidatedContainerLocator, 1);
    });

    test('remove element', async ({ page }) => {
      const formStorePage = new FormStorePage(page);

      await formStorePage.goto(playwrightUtils.buildUrl(urls.validationArrayFields));

      await formStorePage.addArrayFieldValidatedButtonLocator.click();
      await formStorePage.removeArrayFieldButtonLocator.click();

      await formStorePage.expectHasArrayFieldElement(formStorePage.arrayFieldValidatedContainerLocator, 0);
    });

    test('validation', async ({ page }) => {
      const formStorePage = new FormStorePage(page);

      await formStorePage.goto(playwrightUtils.buildUrl(urls.validationArrayFields));

      await formStorePage.addArrayFieldValidatedButtonLocator.click();
      await formStorePage.submitButtonLocator.click();

      await formStorePage.expectHasValidationMessage(formStorePage.arrayFieldValidatedContainerLocator, 1);

      // 1 for the array elements itself since it required 2, and 1 for the first array element partA
      await formStorePage.expectHasValidationMessage(formStorePage.sandboxMainContent, 2);
    });

    test('added element should not be considered as touched by default', async ({ page }) => {
      const formStorePage = new FormStorePage(page);

      await formStorePage.goto(playwrightUtils.buildUrl(urls.validationArrayFields));

      await formStorePage.addArrayFieldValidatedButtonLocator.click();

      await formStorePage.expectHasValidationMessage(formStorePage.arrayFieldValidatedContainerLocator, 0);

      await formStorePage.arrayFieldValidatedInputLocator.nth(0).fill('t');
      await formStorePage.arrayFieldValidatedInputLocator.nth(0).press('Backspace');
      await formStorePage.arrayFieldValidatedInputLocator.nth(0).blur();

      await formStorePage.expectHasValidationMessage(formStorePage.arrayFieldValidatedContainerLocator, 1);
    });
  });

  test.describe('checkbox boolean input', () => {
    test.skip('add test for the checkbox fields', () => {});
  });

  test.describe('checkbox values input', () => {
    test.skip('add test for the checkbox values fields', () => {});
  });

  test.describe('checkbox toggle input', () => {
    test.skip('add test for the checkbox toggle fields', () => {});
  });

  test.describe('combobox input', () => {
    test.skip('add test for the combobox fields', () => {});
  });

  test.describe('combobox input multiple', () => {
    test.skip('add test for the combobox fields', () => {});
  });

  test.describe('date input', () => {
    test.skip('add test for the date fields', () => {});
  });

  test.describe('date range input', () => {
    test.skip('add test for the date range fields', () => {});
  });

  test.describe('input input', () => {
    test.skip('add test for the input fields', () => {});
  });

  test.describe('number input', () => {
    test.skip('add test for the number fields', () => {});
  });

  test.describe('radio input', () => {
    test.skip('add test for the radio fields', () => {});
  });

  test.describe('textarea input', () => {
    test.skip('add test for the textarea fields', () => {});
  });

  test.describe('time input', () => {
    test.skip('add test for the time fields', () => {});
  });

  test.describe('dynamic form elements', () => {
    test.skip('add test for the dynamic form elements', () => {});
  });
});

import { formDataAttribute } from '$/core/stores/form.store';

const getValueFromElement = (element: HTMLInputElement): boolean | string | undefined => {
  const isChecked = element.checked;
  const value = element.value;
  const alternateValue = element.getAttribute(formDataAttribute.ALTERNATE_VALUE);

  if (isChecked === false && !alternateValue) {
    return undefined;
  }

  if (isChecked === false && alternateValue) {
    return alternateValue;
  }

  if (isChecked === true && value) {
    return value;
  }

  return isChecked;
};

export const checkboxComponentsUtils = {
  getValueFromElement,
};

export const ValidationMessageType = {
  REQUIRED: 'required',
  MINIMUM_COUNT: 'minimum-count',
} as const;

export type ValidationMessageType = (typeof ValidationMessageType)[keyof typeof ValidationMessageType];

const validationMessages: Record<ValidationMessageType, string> = {
  [ValidationMessageType.REQUIRED]: 'Required',
  [ValidationMessageType.MINIMUM_COUNT]: 'Must select :0: :1:',
};

const getMessage = (type: ValidationMessageType, replace: string[] = []) => {
  let message = validationMessages[type];

  for (let i = 0; i < replace.length; i++) {
    message = message.replace(`:${i}:`, replace[i]);
  }

  return message;
};

const isValidDate = (value: string) => {
  return !!value && !!value[0];
};

const isValidDateRange = (value: string[]) => {
  return !!value && !!value[0] && !!value[1];
};

// biome-ignore lint/suspicious/noExplicitAny: this is for generic data so need any
const isPopulatedFormValue = (value: any) => {
  if (Array.isArray(value)) {
    return value.length !== 0;
  }

  if (typeof value === 'object') {
    return Object.keys(value).length !== 0;
  }

  return !!value;
};

export const validationUtils = {
  getMessage,
  isValidDate,
  isValidDateRange,
  isPopulatedFormValue,
};

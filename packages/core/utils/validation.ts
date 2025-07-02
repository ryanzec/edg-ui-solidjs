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

export const validationUtils = {
  getMessage,
};

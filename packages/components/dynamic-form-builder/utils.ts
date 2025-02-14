// @todo add support for the following inputs:
// - date
// - date range
// - combobox
// - complex / object
// - array of type
export const DynamicFormBuilderFieldType = {
  TEXT: 'text',
  TEXT_MULTIPLE: 'text-multiple',
  PASSWORD: 'password',
  NUMBER: 'number',
  RADIO: 'radio',
  CHECKBOX: 'checkbox',
  CHECKBOX_MULTIPLE: 'checkbox-multiple',
  TEXTAREA: 'textarea',
  SELECT: 'select',
} as const;

export type DynamicFormBuilderFieldType =
  (typeof DynamicFormBuilderFieldType)[keyof typeof DynamicFormBuilderFieldType];

export type DynamicFormBuilderField = {
  name: string;
  label?: string;
  type: DynamicFormBuilderFieldType;
  required?: boolean;
  placeholder?: string;
  options?: {
    value: string | number;
    label: string;
  }[];
};

export type DynamicFormBuilderFields = DynamicFormBuilderField[];

type ConvertDataOptions = {
  onlyIncludeStandardStructure?: boolean;
};

const convertData = (
  // biome-ignore lint/suspicious/noExplicitAny: generic code needs any
  data: Record<string, any>,
  structure: DynamicFormBuilderFields,
  options: ConvertDataOptions = {},
  // biome-ignore lint/suspicious/noExplicitAny: generic code needs any
): Record<string, any> => {
  // biome-ignore lint/suspicious/noExplicitAny: generic code needs any
  const newData: Record<string, any> = {};

  for (const key in data) {
    const fieldStructure = structure.find((field) => field.name === key);

    if (fieldStructure?.type === DynamicFormBuilderFieldType.CHECKBOX) {
      newData[key] = (data[key] as string[]).length > 0;

      continue;
    }

    if (options.onlyIncludeStandardStructure && !fieldStructure) {
      continue;
    }

    newData[key] = data[key];
  }

  return newData;
};

export const dynamicFormBuilderComponentUtils = {
  convertData,
};

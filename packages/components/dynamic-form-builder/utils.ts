// @todo add support for the following inputs:
// - date
// - date range
// - combobox
// - complex / object
// - array of type
export const DynamicFormBuilderFieldType = {
  TEXT: 'text',
  PASSWORD: 'password',
  NUMBER: 'number',
  RADIO: 'radio',
  CHECKBOX: 'checkbox',
  CHECKBOX_MULTIPLE: 'checkbox-multiple',
  TEXTAREA: 'textarea',
} as const;

export type DynamicFormBuilderFieldType =
  (typeof DynamicFormBuilderFieldType)[keyof typeof DynamicFormBuilderFieldType];

export type DynamicFormBuilderField<TFormData> = {
  name: keyof TFormData;
  label?: string;
  type: DynamicFormBuilderFieldType;
  required?: boolean;
  placeholder?: string;
  options?: {
    value: string | number;
    label: string;
  }[];
};

export type DynamicFormBuilderFields<TFormData> = DynamicFormBuilderField<TFormData>[];

const convertData = <TFormData extends object>(
  data: TFormData,
  structure: DynamicFormBuilderFields<TFormData>,
): TFormData => {
  // biome-ignore lint/suspicious/noExplicitAny: generic code needs any
  const newData: Record<string, any> = {};

  for (const key in data) {
    const fieldStructure = structure.find((field) => field.name === key);

    if (fieldStructure?.type === DynamicFormBuilderFieldType.CHECKBOX) {
      newData[key] = (data[key] as string[]).length > 0;

      continue;
    }

    newData[key] = data[key];
  }

  return newData as TFormData;
};

export const dynamicFormBuilderComponentUtils = {
  convertData,
};

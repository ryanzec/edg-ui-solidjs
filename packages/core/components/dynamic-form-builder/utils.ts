// @todo add support for the following inputs:
// - date
// - date range
// - combobox

import type * as zod from 'zod';
import type { CreateFormStoreReturn } from '$/core/stores/form.store';
import { loggerUtils } from '$/core/utils/logger';

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
  COMPLEX: 'complex',
  COMPLEX_ARRAY: 'complex_array',
} as const;

export type DynamicFormBuilderFieldType =
  (typeof DynamicFormBuilderFieldType)[keyof typeof DynamicFormBuilderFieldType];

export type DynamicFormBuilderField = {
  name: string;
  label?: string;
  type: DynamicFormBuilderFieldType;
  required?: boolean;
  placeholder?: string;
  readonly?: boolean;
  isSecret?: boolean;
  requiredGroup?: string;
  requiredGroupValidationMessage?: string;
  options?: {
    value: string | number;
    label: string;
  }[];

  // used for complex and complex_array types
  nestedFields?: DynamicFormBuilderField[];

  //
  arrayLimit?: number;
};

export type DynamicFormBuilderFields = DynamicFormBuilderField[];

export type DynamicFormBuilderProps<TFormData extends object> = {
  fields: DynamicFormBuilderFields;
  formStore: CreateFormStoreReturn<TFormData>;
  staticFormSchema?: Record<string, zod.ZodType>;
  namePrefix?: string;
  encloseForm?: boolean;
  skipSecretValidation?: boolean;
  groupedFields?: Record<string, string[]>;
};

type ConvertDataOptions = {
  onlyIncludeStructuredData?: boolean;
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

    if (options.onlyIncludeStructuredData && !fieldStructure) {
      continue;
    }

    // a required secret should be allowed to be empty in the context of updating in which case an empty value means
    // keep the existing value as it (without forcing the user to fill it in again)
    if (fieldStructure?.required && fieldStructure.isSecret && data[key] === '') {
      continue;
    }

    newData[key] = data[key];
  }

  return newData;
};

export type DefaultFormValue = string | number | boolean | DefaultFormValue[] | { [key: string]: DefaultFormValue };

const generateDefaultValues = (fields: DynamicFormBuilderFields): { [key: string]: DefaultFormValue } => {
  const defaultValues: { [key: string]: DefaultFormValue } = {};

  for (const field of fields) {
    defaultValues[field.name] = getDefaultValueForField(field);
  }

  return defaultValues;
};

const getDefaultValueForField = (field: DynamicFormBuilderField): DefaultFormValue => {
  switch (field.type) {
    case DynamicFormBuilderFieldType.TEXT:
    case DynamicFormBuilderFieldType.PASSWORD:
    case DynamicFormBuilderFieldType.TEXTAREA:
    case DynamicFormBuilderFieldType.SELECT:
    case DynamicFormBuilderFieldType.RADIO:
      return '';

    case DynamicFormBuilderFieldType.NUMBER:
      return 0;

    case DynamicFormBuilderFieldType.CHECKBOX:
    case DynamicFormBuilderFieldType.TEXT_MULTIPLE:
    case DynamicFormBuilderFieldType.CHECKBOX_MULTIPLE:
    case DynamicFormBuilderFieldType.COMPLEX_ARRAY:
      return [];

    case DynamicFormBuilderFieldType.COMPLEX:
      if (field.nestedFields) {
        return generateDefaultValues(field.nestedFields);
      }

      return {};

    default:
      loggerUtils.error(`attempted to get default value for unknown field type: ${field.type}`);

      return '';
  }
};

export const dynamicFormBuilderComponentUtils = {
  convertData,
  generateDefaultValues,
};

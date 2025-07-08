import { default as BaseFormArray, type FormArrayProps } from '$/core/components/form-array/form-array';
import { type FormArrayItemProps, default as Item } from '$/core/components/form-array/form-array-item';

export type { FormArrayProps, FormArrayItemProps };

export const FormArray = Object.assign(BaseFormArray, { Item });

export default FormArray;

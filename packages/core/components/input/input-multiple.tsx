import * as lodash from 'lodash';
import { type Accessor, Index, type JSX, mergeProps, splitProps } from 'solid-js';
import FormArrayAddContainer from '$/core/components/form-array';
import FormField, { type FormFieldProps } from '$/core/components/form-field';
import Icon, { IconColor } from '$/core/components/icon';
import Input from '$/core/components/input/input';
import styles from '$/core/components/input/input.module.css';
import type { CreateFormStoreReturn } from '$/core/stores/form.store';

export type InputMultipleProps<TFormData extends object> = JSX.HTMLAttributes<HTMLDivElement> & {
  fieldName: keyof TFormData;
  formStore: CreateFormStoreReturn<TFormData>;
  addLabel?: string;
  autofocus?: boolean;
};

const InputMultiple = <TFormData extends object>(passedProps: InputMultipleProps<TFormData>) => {
  const [props, restOfProps] = splitProps(mergeProps({ addLabel: 'Add' }, passedProps), [
    'fieldName',
    'formStore',
    'addLabel',
    'class',
    'autofocus',
  ]);
  const values = props.formStore.getFieldValue(props.fieldName) as Accessor<TFormData[]>;

  return (
    <FormArrayAddContainer onAdd={() => props.formStore.addArrayField(props.fieldName, '')} addLabel={props.addLabel}>
      <Index each={values()}>
        {(_arrayField, index) => {
          const getArrayFieldError = () => {
            const errors = lodash.get(props.formStore.errors(), `${props.fieldName as string}.${index}`) as Pick<
              FormFieldProps,
              'errors'
            >;

            return errors || {};
          };

          const handleDelete = (event: Event) => {
            // we need to stop propagation otherwise if there is an input below the one being removed, that
            // will be focused which is not the intent from this action
            event.stopPropagation();

            props.formStore.removeArrayField(props.fieldName, index);
          };

          return (
            <div class={styles.inputMultipleItem}>
              <FormField errors={getArrayFieldError()?.errors} class={styles.inputMultipleItemFormField}>
                <Input
                  type="text"
                  name={`${props.fieldName as string}.${index}` as keyof TFormData}
                  formData={props.formStore.data}
                  postElement={<Icon color={IconColor.DANGER} icon="trash" onClick={handleDelete} />}
                  autofocus={props.autofocus}
                />
              </FormField>
            </div>
          );
        }}
      </Index>
    </FormArrayAddContainer>
  );
};
export default InputMultiple;

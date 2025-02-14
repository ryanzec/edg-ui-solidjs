import Button, { ButtonColor } from '$/components/button';
import FormField from '$/components/form-field';
import Input from '$/components/input';
import styles from '$/components/input/input.module.css';
import type { CreateFormStoreReturn } from '$/stores/form.store';
import { Index } from 'solid-js';

export type InputMultipleProps<TFormData extends object> = {
  fieldName: keyof TFormData;
  formStore: CreateFormStoreReturn<TFormData>;
};

const InputMultiple = <TFormData extends object>(props: InputMultipleProps<TFormData>) => {
  return (
    <div class={styles.inputMultipleContainer}>
      <Index each={props.formStore.data()[props.fieldName] as string[]}>
        {(_arrayField, index) => {
          const getArrayFieldError = () => props.formStore.errors()[props.fieldName]?.[index] ?? {};

          return (
            <div class={styles.inputMultipleItem}>
              <FormField errors={getArrayFieldError()?.errors} class={styles.inputMultipleItemFormField}>
                <Input
                  type="text"
                  name={`${props.fieldName as string}.${index}` as keyof TFormData}
                  formData={props.formStore.data}
                />
              </FormField>
              <Button
                color={ButtonColor.DANGER}
                onclick={() => props.formStore.removeArrayField(props.fieldName, index)}
              >
                REMOVE
              </Button>
            </div>
          );
        }}
      </Index>
      <Button
        data-id="add-array-field-button"
        type="button"
        onclick={() => props.formStore.addArrayField(props.fieldName, '')}
      >
        + Add
      </Button>
    </div>
  );
};

export default InputMultiple;

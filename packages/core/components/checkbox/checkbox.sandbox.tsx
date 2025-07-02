import { onMount } from 'solid-js';
import * as zod from 'zod';

import Checkbox from '$/core/components/checkbox';
import FormField from '$/core/components/form-field';
import { formStoreUtils } from '$/core/stores/form.store';
import { ValidationMessageType, validationUtils } from '$/core/utils/validation';
import { zodUtils } from '$/core/utils/zod';

export default {
  title: 'Components/Checkbox',
};

export const Indeterminate = () => {
  let inputRef: HTMLInputElement | undefined;

  onMount(() => {
    if (!inputRef) {
      return;
    }

    inputRef.indeterminate = true;
    inputRef.dispatchEvent(new Event('change'));
  });

  return (
    <div>
      <Checkbox ref={inputRef} labelElement="Indeterminate" />
    </div>
  );
};

export const CheckedByDefault = () => {
  type FormData = {
    checkbox: string[];
  };
  const formSchema = zodUtils.schemaForType<FormData>()(
    zod.object({
      checkbox: zod.string().array().min(1, validationUtils.getMessage(ValidationMessageType.REQUIRED)),
    }),
  );

  const formStore = formStoreUtils.createStore<FormData>({
    schema: formSchema,
    initialValues: {
      checkbox: ['1'],
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const formDirective = formStore.formDirective;

  return (
    <form use:formDirective>
      <FormField errors={formStore.errors().checkbox?.errors}>
        <Checkbox labelElement="checkbox" name="checkbox" value="1" />
      </FormField>
    </form>
  );
};

export const Toggle = () => {
  type FormData = {
    checkbox: string[];
  };

  const formSchema = zodUtils.schemaForType<FormData>()(
    zod.object({
      checkbox: zod.string().array().min(1, validationUtils.getMessage(ValidationMessageType.REQUIRED)),
    }),
  );

  const formStore = formStoreUtils.createStore<FormData>({
    schema: formSchema,
    initialValues: {
      checkbox: ['1'],
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const formDirective = formStore.formDirective;

  return (
    <form use:formDirective>
      <FormField errors={formStore.errors().checkbox?.errors}>
        <Checkbox.Toggle labelElement="checkbox" name="checkbox" value="1" />
      </FormField>
    </form>
  );
};

// not exported as this is only for testing and would be caught in a `pnpm build:check`
const NameTypingTest = () => {
  const form = formStoreUtils.createStore<{ checkbox: string[] }>({
    onSubmit: async (values) => {
      console.log(values);
    },
  });
  return (
    <FormField>
      {/* @ts-expect-error should error since it is not part of the form data, intended to test this functionality */}
      <Checkbox labelElement="checkbox" name="checkbo" value="1" formData={form.data} />
    </FormField>
  );
};

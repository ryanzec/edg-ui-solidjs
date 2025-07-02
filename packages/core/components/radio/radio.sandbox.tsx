import FormField from '$/core/components/form-field';
import Radio from '$/core/components/radio';
import { formStoreUtils } from '$/core/stores/form.store';
import { ValidationMessageType, validationUtils } from '$/core/utils/validation';
import { zodUtils } from '$/core/utils/zod';
import * as zod from 'zod';

export default {
  title: 'Components/Radio',
};

export const WithoutValue = () => {
  type FormData = {
    radio: string;
  };
  const formSchema = zodUtils.schemaForType<FormData>()(
    zod.object({
      radio: zod.string().min(1, validationUtils.getMessage(ValidationMessageType.REQUIRED)),
    }),
  );
  const formStore = formStoreUtils.createStore<FormData>({
    schema: formSchema,
    initialValues: {
      radio: '',
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const formDirective = formStore.formDirective;
  return (
    <form use:formDirective>
      <FormField errors={formStore.errors().radio?.errors}>
        <Radio labelElement="radio" name="radio" value="1" />
      </FormField>
    </form>
  );
};

export const WithValue = () => {
  type FormData = {
    radio: string;
  };
  const formSchema = zodUtils.schemaForType<FormData>()(
    zod.object({
      radio: zod.string().min(1, validationUtils.getMessage(ValidationMessageType.REQUIRED)),
    }),
  );
  const formStore = formStoreUtils.createStore<FormData>({
    schema: formSchema,
    initialValues: {
      radio: '1',
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const formDirective = formStore.formDirective;
  return (
    <form use:formDirective>
      <FormField errors={formStore.errors().radio?.errors}>
        <Radio labelElement="radio" name="radio" value="1" />
      </FormField>
    </form>
  );
};

// not exported as this is only for testing and would be caught in a `pnpm build:check`
const NameTypingTest = () => {
  const form = formStoreUtils.createStore<{ radio: string[] }>({
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  return (
    <FormField>
      {/* @ts-expect-error should error since it is not part of the form data, intended to test this functionality */}
      <Radio labelElement="radio" name="radi" value="1" formData={form.data} />
    </FormField>
  );
};

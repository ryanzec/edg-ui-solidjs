import FormField from '$/core/components/form-field';
import TimeInput from '$/core/components/time-input';
import { formStoreUtils } from '$/core/stores/form.store';

export default {
  title: 'Components/TimeInput',
};

export const Default = () => {
  return (
    <>
      <TimeInput />
    </>
  );
};

export const Prepopulated = () => {
  return (
    <>
      <TimeInput value="1:34 pm" />
      <TimeInput value="11:34 pm" />
    </>
  );
};

// not exported as this is only for testing and would be caught in a `pnpm build:check`
const NameTypingTest = () => {
  const form = formStoreUtils.createStore<{ time: string[] }>({
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  return (
    <FormField>
      {/* @ts-expect-error should error since it is not part of the form data, intended to test this functionality */}
      <TimeInput name="tim" formData={form.data} />
    </FormField>
  );
};

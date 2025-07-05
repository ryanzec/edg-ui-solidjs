import { createEffect, onMount } from 'solid-js';
import * as zod from 'zod';

import Checkbox from '$/core/components/checkbox';
import FormField from '$/core/components/form-field';
import { formStoreUtils } from '$/core/stores/form.store';
import { ValidationMessageType, validationUtils } from '$/core/utils/validation';
import { zodUtils } from '$/core/utils/zod';
import { SandboxExamplesContainer } from '$sandbox/components/sandbox-examples-container';

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
    <SandboxExamplesContainer>
      <Checkbox ref={inputRef} labelElement="Indeterminate" />
    </SandboxExamplesContainer>
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
    <SandboxExamplesContainer>
      <form use:formDirective>
        <FormField errors={formStore.errors().checkbox?.errors}>
          <Checkbox labelElement="checkbox" name="checkbox" value="1" />
        </FormField>
      </form>
    </SandboxExamplesContainer>
  );
};

export const ToggleOffOn = () => {
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
    <SandboxExamplesContainer>
      <form use:formDirective>
        <FormField errors={formStore.errors().checkbox?.errors}>
          <Checkbox.Toggle labelElement="checkbox" name="checkbox" value="1" />
        </FormField>
      </form>
    </SandboxExamplesContainer>
  );
};

export const ToggleValue = () => {
  return (
    <SandboxExamplesContainer>
      <Checkbox.Toggle labelElement="value2" alternateLabelElement="value1" name="checkbox" value="1" />
    </SandboxExamplesContainer>
  );
};

export const InForm = () => {
  const formStore = formStoreUtils.createStore<{ checkbox: string[]; checkbox2: string[]; checkbox3: string[] }>({
    initialValues: {
      checkbox: ['1'],
      checkbox2: ['2'],
      checkbox3: ['3'],
    },
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  const formDirective = formStore.formDirective;

  createEffect(() => {
    console.log(formStore.data());
  });

  return (
    <SandboxExamplesContainer>
      <form use:formDirective>
        <FormField>
          <Checkbox labelElement="checkbox" name="checkbox" value="1" formData={formStore.data} />
        </FormField>
        <FormField>
          <Checkbox.Toggle labelElement="checkbox2" name="checkbox2" value="2" formData={formStore.data} />
        </FormField>
        <FormField>
          <Checkbox.Toggle
            labelElement="value2"
            name="checkbox3"
            value="3"
            alternateValue="alt3"
            alternateLabelElement="value1"
            formData={formStore.data}
          />
        </FormField>
      </form>
    </SandboxExamplesContainer>
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
    <SandboxExamplesContainer>
      <FormField>
        <Checkbox
          labelElement="checkbox"
          // @ts-expect-error should error since it is not part of the form data, intended to test this functionality
          name="checkbo"
          value="1"
          formData={form.data}
        />
      </FormField>
    </SandboxExamplesContainer>
  );
};

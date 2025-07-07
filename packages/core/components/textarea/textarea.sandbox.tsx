import Button from '$/core/components/button';
import FormField from '$/core/components/form-field';
import FormFields from '$/core/components/form-fields';
import Label from '$/core/components/label';
import Peek, { peekComponentUtils } from '$/core/components/peek';
import Textarea from '$/core/components/textarea';
import TextareaInnerActions from '$/core/components/textarea/textarea-inner-actions';
import { formStoreUtils } from '$/core/stores/form.store';
import { createSignal } from 'solid-js';

export default {
  title: 'Components/Textarea',
};

export const Default = () => {
  return (
    <FormFields>
      <FormField>
        <Label for="test1">Placeholder</Label>
        <Textarea id="test1" placeholder="Placeholder value" />
      </FormField>
      <FormField>
        <Label for="test2">Value</Label>
        <Textarea id="test2">Some value</Textarea>
      </FormField>
      <FormField errors={['error text']}>
        <Label for="test3">Error</Label>
        <Textarea id="test3" placeholder="Placeholder value" />
      </FormField>
      <FormField>
        <Label for="test4">Disabled</Label>
        <Textarea id="test4" disabled>
          Disabled value
        </Textarea>
      </FormField>
      <FormField>
        <Label for="test5">Readonly</Label>
        <Textarea id="test5" readonly>
          Readonly value
        </Textarea>
      </FormField>
    </FormFields>
  );
};

export const AutoFocus = () => {
  const peekStore = peekComponentUtils.createStore();
  return (
    <>
      <FormField>
        <Textarea autofocus />
      </FormField>
      <Button onClick={() => peekStore.open()}>open peek</Button>
      <Peek peekStore={peekStore}>
        <Peek.Header title="Peek Header" />
        <Peek.Content>
          <FormField>
            <Textarea autofocus />
          </FormField>
        </Peek.Content>
        <Peek.Footer>
          <Button.Group>
            <Peek.CloseButton />
            <Button>Process</Button>
          </Button.Group>
        </Peek.Footer>
      </Peek>
    </>
  );
};

export const SelectAll = () => {
  return (
    <>
      <FormField>
        <Textarea value="test" selectAllOnFocus />
      </FormField>
    </>
  );
};

export const InnerActions = () => {
  const formStore = formStoreUtils.createStore<{ textarea: string[] }>({
    onSubmit: async (values) => {
      console.log(values);
    },
  });
  const [isProcessing, setIsProcessing] = createSignal(false);

  const handleToggleProcessing = () => {
    setIsProcessing(!isProcessing());
  };

  return (
    <>
      <Button onClick={handleToggleProcessing}>Toggle Processing</Button>
      <TextareaInnerActions
        name="textarea"
        placeholder="Add instructions"
        formData={formStore.data}
        errors={formStore.errors()?.textarea?.errors}
        isProcessing={isProcessing()}
        mainButtonLabelElement={isProcessing() ? 'Generating...' : 'Generate'}
      />
    </>
  );
};

// not exported as this is only for testing and would be caught in a `pnpm build:check`
const NameTypingTest = () => {
  const form = formStoreUtils.createStore<{ textarea: string[] }>({
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  return (
    <FormField>
      {/* @ts-expect-error should error since it is not part of the form data, intended to test this functionality */}
      <Textarea name="textare" value="1" formData={form.data} />
    </FormField>
  );
};

import UserForm, { type UserFormProps } from '$/application/components/user-form';
import Button from '$/core/components/button';
import Loading from '$/core/components/loading';
import Peek, { type PeekComponentRef } from '$/core/components/peek';
import { type ComponentRef, componentRefUtils } from '$/core/stores/component-ref';
import { Show, createSignal, splitProps } from 'solid-js';

export type UserFormPeekProps<TCreateInput, TUpdateInput> = Omit<
  UserFormProps<TCreateInput, TUpdateInput>,
  'submitButtonRef' | 'onFormSubmitted'
> & {
  peekComponentRef?: ComponentRef<PeekComponentRef>;
};

const UserFormPeek = <TCreateInput, TUpdateInput>(passedProps: UserFormPeekProps<TCreateInput, TUpdateInput>) => {
  const [props, restOfProps] = splitProps(passedProps, ['peekComponentRef']);
  const [submitButtonElementRef, setSubmitButtonElementRef] = createSignal<HTMLButtonElement | undefined>();
  const peekComponentRef = componentRefUtils.createRef<PeekComponentRef>({
    onReady: (componentRef) => {
      props.peekComponentRef?.onReady(componentRef);
    },
  });

  const handleSubmitForm = () => {
    const button = submitButtonElementRef();

    if (!button) {
      return;
    }

    button.click();
  };

  const handleFormSubmitted = () => {
    peekComponentRef.api()?.close();
  };

  return (
    <Peek peekComponentRef={peekComponentRef}>
      <Show when={restOfProps.isProcessingForm}>
        <Loading.Section>{restOfProps.editingUser ? 'Updating' : 'Creating'}...</Loading.Section>
      </Show>
      <Peek.Header title={`${restOfProps.editingUser ? 'Update' : 'Create'} User`} />
      <Peek.Content>
        <UserForm
          useButton={false}
          submitButtonElementRef={setSubmitButtonElementRef}
          onFormSubmitted={handleFormSubmitted}
          {...restOfProps}
        />
      </Peek.Content>
      <Peek.Footer>
        <Button.Group>
          <Peek.CloseButton />
          <Button disabled={restOfProps.isProcessingForm} onClick={handleSubmitForm}>
            {restOfProps.editingUser ? 'Update' : 'Create'}
          </Button>
        </Button.Group>
      </Peek.Footer>
    </Peek>
  );
};

export default UserFormPeek;

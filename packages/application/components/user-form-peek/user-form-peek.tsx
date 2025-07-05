import UserForm, { type UserFormProps } from '$/application/components/user-form';
import Button from '$/core/components/button';
import Loading from '$/core/components/loading';
import Peek, { type PeekStore } from '$/core/components/peek';
import { Show, createSignal, splitProps } from 'solid-js';

export type UserFormPeekProps<TCreateInput, TUpdateInput> = Omit<
  UserFormProps<TCreateInput, TUpdateInput>,
  'submitButtonRef' | 'onFormSubmitted'
> & {
  peekStore: PeekStore;
};

const UserFormPeek = <TCreateInput, TUpdateInput>(passedProps: UserFormPeekProps<TCreateInput, TUpdateInput>) => {
  const [props, restOfProps] = splitProps(passedProps, ['peekStore']);
  const [submitButtonElementRef, setSubmitButtonElementRef] = createSignal<HTMLButtonElement | undefined>();

  const handleSubmitForm = () => {
    const button = submitButtonElementRef();

    if (!button) {
      return;
    }

    button.click();
  };

  const handleFormSubmitted = () => {
    props.peekStore.close();
  };

  return (
    <Peek peekStore={props.peekStore}>
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

import UserForm, { type UserFormProps } from '$/application/components/user-form';
import Button from '$/core/components/button';
import Peek, { type PeekStore } from '$/core/components/peek';
import { createSignal, splitProps } from 'solid-js';

export type UserFormPeekProps = Omit<UserFormProps, 'submitButtonRef' | 'onFormSubmitted'> & {
  peekStore: PeekStore;
};

const UserFormPeek = (passedProps: UserFormPeekProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['peekStore']);
  const [submitButtonRef, setSubmitButtonRef] = createSignal<HTMLButtonElement | undefined>();

  const handleSubmitForm = () => {
    const button = submitButtonRef();

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
      <Peek.Header title={`${restOfProps.editingUser ? 'Update' : 'Create'} User`} />
      <Peek.Content>
        <UserForm submitButtonRef={setSubmitButtonRef} onFormSubmitted={handleFormSubmitted} {...restOfProps} />
      </Peek.Content>
      <Peek.Footer>
        <Button.Group>
          <Peek.CloseButton />
          <Button onClick={handleSubmitForm}>{restOfProps.editingUser ? 'Update' : 'Create'}</Button>
        </Button.Group>
      </Peek.Footer>
    </Peek>
  );
};

export default UserFormPeek;

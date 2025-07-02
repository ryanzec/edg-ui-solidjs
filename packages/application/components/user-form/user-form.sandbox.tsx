import UserForm from '$/application/components/user-form';
import type { FormSaveMode } from '$/core/stores/form.store';
import { UserRoleName } from '$api/types/user';
import SandboxExamplesContainer from '$sandbox/components/sandbox-examples-container/sandbox-examples-container';
import { createSignal } from 'solid-js';

export default {
  title: 'Application/UserForm',
};

const defaultUser = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  roles: [UserRoleName.USER, UserRoleName.ADMIN],
};

export const CreateUser = () => {
  const [formError, setFormError] = createSignal<string | string[] | undefined>(undefined);
  const [isProcessingForm, setIsProcessingForm] = createSignal(false);

  const handleProcessForm = async (saveMode: FormSaveMode, data: { name: string; email: string; roles: string[] }) => {
    setIsProcessingForm(true);
    setFormError(undefined);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Form submitted:', { saveMode, data });
    } catch (error) {
      setFormError('Failed to process form');
    } finally {
      setIsProcessingForm(false);
    }
  };

  return (
    <SandboxExamplesContainer>
      <UserForm formError={formError()} isProcessingForm={isProcessingForm()} onProcessForm={handleProcessForm} />
    </SandboxExamplesContainer>
  );
};

export const UpdateUser = () => {
  const [formError, setFormError] = createSignal<string | string[] | undefined>(undefined);
  const [isProcessingForm, setIsProcessingForm] = createSignal(false);

  const handleProcessForm = async (saveMode: FormSaveMode, data: { name: string; email: string; roles: string[] }) => {
    setIsProcessingForm(true);
    setFormError(undefined);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Form submitted:', { saveMode, data });
    } catch (error) {
      setFormError('Failed to process form');
    } finally {
      setIsProcessingForm(false);
    }
  };

  return (
    <SandboxExamplesContainer>
      <UserForm
        editingUser={defaultUser}
        formError={formError()}
        isProcessingForm={isProcessingForm()}
        onProcessForm={handleProcessForm}
      />
    </SandboxExamplesContainer>
  );
};

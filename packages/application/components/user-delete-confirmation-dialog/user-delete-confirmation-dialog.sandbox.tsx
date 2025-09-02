import UserDeleteConfirmationDialog from '$/application/components/user-delete-confirmation-dialog';
import Button from '$/core/components/button';
import type { DialogComponentRef } from '$/core/components/dialog';
import { componentRefUtils } from '$/core/stores/component-ref';
import { asyncUtils } from '$/core/utils/async';
import { loggerUtils } from '$/core/utils/logger';
import SandboxExamplesContainer from '$sandbox/components/sandbox-examples-container/sandbox-examples-container';

export default {
  title: 'Application/UserDeleteConfirmationDialog',
};

export const Default = () => {
  const dialogComponentRef = componentRefUtils.createRef<DialogComponentRef>();
  const mockUser = {
    id: '123',
    name: 'Example User',
  };

  const processDelete = async (id: string) => {
    try {
      console.log('Processing delete for user ID:', id);
      await asyncUtils.sleep(1000);

      return true;
    } catch (error: unknown) {
      //@todo proper error handling
      loggerUtils.error(error);

      return false;
    }
  };

  return (
    <>
      <Button onClick={dialogComponentRef.api()?.open}>Delete User</Button>
      <SandboxExamplesContainer>
        <UserDeleteConfirmationDialog
          dialogComponentRef={dialogComponentRef}
          selectedUser={mockUser}
          onDeleted={(user) => console.log('User deleted:', user)}
          processDelete={processDelete}
        />
      </SandboxExamplesContainer>
    </>
  );
};

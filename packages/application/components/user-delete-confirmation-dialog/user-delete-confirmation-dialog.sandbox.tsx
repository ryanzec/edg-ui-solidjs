import UserDeleteConfirmationDialog from '$/application/components/user-delete-confirmation-dialog';
import Button from '$/core/components/button';
import type { DialogComponentApi } from '$/core/components/dialog';
import { componentApiStoreUtils } from '$/core/stores/component-api.store';
import { asyncUtils } from '$/core/utils/async';
import { loggerUtils } from '$/core/utils/logger';
import SandboxExamplesContainer from '$sandbox/components/sandbox-examples-container/sandbox-examples-container';

export default {
  title: 'Application/UserDeleteConfirmationDialog',
};

export const Default = () => {
  const dialogComponentApiStore = componentApiStoreUtils.createStore<DialogComponentApi>();
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
      <Button onclick={dialogComponentApiStore.api()?.open}>Delete User</Button>
      <SandboxExamplesContainer>
        <UserDeleteConfirmationDialog
          onReady={dialogComponentApiStore.onReady}
          onCleanup={dialogComponentApiStore.onCleanup}
          selectedUser={mockUser}
          onDeleted={(user) => console.log('User deleted:', user)}
          processDelete={processDelete}
        />
      </SandboxExamplesContainer>
    </>
  );
};

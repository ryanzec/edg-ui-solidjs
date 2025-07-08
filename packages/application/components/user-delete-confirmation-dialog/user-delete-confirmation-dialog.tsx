import Dialog, { type DialogProps, type DialogComponentApi } from '$/core/components/dialog';
import { componentApiStoreUtils } from '$/core/stores/component-api.store';
import { loggerUtils } from '$/core/utils/logger';
import type { User } from '$api/types/user';

type InternalUser = Pick<User, 'id' | 'name'>;

export type UserDeleteConfirmationDialogProps = Pick<DialogProps, 'onReady' | 'onCleanup'> & {
  selectedUser?: InternalUser;
  onDeleted?: (user: InternalUser) => void;
  processDelete: (id: string) => Promise<boolean>;
};

const UserDeleteConfirmationDialog = (props: UserDeleteConfirmationDialogProps) => {
  const dialogComponentApiStore = componentApiStoreUtils.createStore<DialogComponentApi>({
    onReady: (componentApi) => {
      props.onReady?.(componentApi);
    },
    onCleanup: () => {
      props.onCleanup?.();
    },
  });

  const processDelete = async () => {
    try {
      if (!props.selectedUser) {
        dialogComponentApiStore.api()?.close();

        return true;
      }

      await props.processDelete(props.selectedUser.id);

      props.onDeleted?.(props.selectedUser);

      return true;
    } catch (error: unknown) {
      //@todo proper error handling
      loggerUtils.error(error);

      return false;
    }
  };

  return (
    <Dialog.DeleteConfirmation
      onReady={dialogComponentApiStore.onReady}
      onCleanup={dialogComponentApiStore.onCleanup}
      processDelete={processDelete}
      selectedItem={props.selectedUser}
      headerElement="Remove User?"
    >
      Are you sure you want to remove {props.selectedUser?.name}, this action can not be undone?
    </Dialog.DeleteConfirmation>
  );
};

export default UserDeleteConfirmationDialog;

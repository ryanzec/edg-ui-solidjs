import { CalloutColor } from '$/core/components/callout';
import Dialog, { type DialogStore } from '$/core/components/dialog';
import { globalNotificationsStore } from '$/core/stores/global-notifications.store';
import { MutationState } from '$/core/utils/query';
import type { User } from '$api/types/user';
import { usersApi } from '$web/apis/users';

type InternalUser = Pick<User, 'id' | 'name'>;

export type UserDeleteConfirmationDialogProps = {
  dialogStore: DialogStore;
  selectedUser?: InternalUser;
  onDeleted?: (deletedUser: InternalUser) => void;
};

const UserDeleteConfirmationDialog = (props: UserDeleteConfirmationDialogProps) => {
  const deleteUserMutation = usersApi.delete({
    onSuccess: () => {
      globalNotificationsStore.addNotification({
        message: () => 'User deleted',
        color: CalloutColor.SUCCESS,
      });
    },
  });

  const processDelete = async () => {
    if (!props.selectedUser) {
      props.dialogStore.close();

      return;
    }

    await deleteUserMutation.mutate({ id: props.selectedUser.id });
    props.onDeleted?.(props.selectedUser);
    props.dialogStore.close();
  };

  return (
    <Dialog.DeleteConfirmation
      dialogStore={props.dialogStore}
      selectedItem={props.selectedUser}
      processDelete={processDelete}
      headerElement="Remove User"
      messageElement={<div>Are you sure you want to remove {props.selectedUser?.name}, this can not be undone?</div>}
      isProcessing={deleteUserMutation.state() === MutationState.PROCESSING}
    />
  );
};

export default UserDeleteConfirmationDialog;

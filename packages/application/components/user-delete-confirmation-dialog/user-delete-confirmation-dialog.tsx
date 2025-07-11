import Dialog, { type DialogDeleteConfirmationProps } from '$/core/components/dialog';
import { loggerUtils } from '$/core/utils/logger';
import type { User } from '$api/types/user';

type InternalUser = Pick<User, 'id' | 'name'>;

export type UserDeleteConfirmationDialogProps = Pick<
  DialogDeleteConfirmationProps<InternalUser>,
  'dialogComponentRef'
> & {
  selectedUser?: InternalUser;
  onDeleted?: (user: InternalUser) => void;
  processDelete: (id: string) => Promise<boolean>;
};

const UserDeleteConfirmationDialog = (props: UserDeleteConfirmationDialogProps) => {
  const processDelete = async () => {
    try {
      if (!props.selectedUser) {
        props.dialogComponentRef.api()?.close();

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
      dialogComponentRef={props.dialogComponentRef}
      processDelete={processDelete}
      selectedItem={props.selectedUser}
      headerElement="Remove User?"
    >
      Are you sure you want to remove {props.selectedUser?.name}, this action can not be undone?
    </Dialog.DeleteConfirmation>
  );
};

export default UserDeleteConfirmationDialog;

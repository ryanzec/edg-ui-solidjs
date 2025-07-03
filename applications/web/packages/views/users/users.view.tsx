import { usersApi } from '$/application/apis/users';
import Page from '$/application/components/page';
import UserDeleteConfirmationDialog from '$/application/components/user-delete-confirmation-dialog';
import type { CreateUserFormData, UpdateUserFormData } from '$/application/components/user-form';
import UserFormPeek from '$/application/components/user-form-peek';
import { UsersList, type UsersListProps } from '$/application/components/users-list';
import { authenticationStore } from '$/application/stores/authentication.store';
import Button from '$/core/components/button';
import { CalloutColor } from '$/core/components/callout';
import { dialogComponentUtils } from '$/core/components/dialog';
import { peekComponentUtils } from '$/core/components/peek';
import { Skeleton } from '$/core/components/skeleton';
import { FormSaveMode } from '$/core/stores/form.store';
import { globalNotificationsStore } from '$/core/stores/global-notifications.store';
import { ErrorMessage } from '$/core/utils/error';
import { loggerUtils } from '$/core/utils/logger';
import type { User } from '$api/types/user';
import { Show, Suspense, createSignal } from 'solid-js';

type UsersListUser = UsersListProps['users'][0];

const UsersView = () => {
  const [userListQuery, users] = usersApi.getList();
  const createUserMutation = usersApi.create();
  const updateUserMutation = usersApi.update();
  const deleteUserMutation = usersApi.delete({
    onSuccess: () => {
      globalNotificationsStore.addNotification({
        message: () => 'User deleted',
        color: CalloutColor.SUCCESS,
      });
    },
  });

  const editPeekStore = peekComponentUtils.createStore();
  const deleteDialogStore = dialogComponentUtils.createStore();

  const [formError, setFormError] = createSignal<string | string[] | undefined>();
  const [activeUser, setActiveUser] = createSignal<UsersListUser>();

  const handleAddUser = () => {
    setActiveUser(undefined);
    editPeekStore.open();
  };

  const handleEditUser = (user: UsersListUser) => {
    setActiveUser(user);
    editPeekStore.open();
  };

  const handleRemoveUser = (user: UsersListUser) => {
    setActiveUser(user);
    deleteDialogStore.open();
  };

  const handleSubmitForm = async () => {
    setFormError(undefined);
  };

  const processForm = async (saveMode: FormSaveMode, data: CreateUserFormData | UpdateUserFormData) => {
    try {
      const userId = activeUser()?.id;
      const organizationId = authenticationStore.sessionUser()?.user.organizationId;

      if (!organizationId) {
        loggerUtils.error('organization id was not found when creating a user which should never happen');

        throw new Error('Unable to create the user');
      }

      if (saveMode === FormSaveMode.UPDATE) {
        if (!userId) {
          loggerUtils.error('user id was not found when updating a user which should never happen');

          throw new Error('Unable to update the user');
        }

        await updateUserMutation.mutateAsync({
          id: userId,
          name: data.name,
          email: data.email,
          roles: data.roles,
          oldPassword: data.oldPassword,
          password: data.password,
          confirmPassword: data.confirmPassword,
        });

        return;
      }

      await createUserMutation.mutateAsync({
        ...(data as CreateUserFormData),
        organizationId,
      });
    } catch (error: unknown) {
      // @todo properly error handling
      setFormError(ErrorMessage.UNKNOWN as string);

      throw error;
    }
  };

  const processDelete = async (id: User['id']) => {
    try {
      await deleteUserMutation.mutateAsync({ id });

      return true;
    } catch (error) {
      // @todo proper error handling
      loggerUtils.log(error);

      return false;
    }
  };

  return (
    <>
      <Page>
        <Page.Header label="Users" actionElements={[<Button onClick={handleAddUser}>New User</Button>]} />
        <Suspense fallback={<Skeleton />}>
          <Show when={users()}>
            {(users) => (
              <UsersList users={users()} onEdit={handleEditUser} onDelete={handleRemoveUser} onAdd={handleAddUser} />
            )}
          </Show>
        </Suspense>
      </Page>
      <UserFormPeek
        peekStore={editPeekStore}
        editingUser={activeUser()}
        formError={formError()}
        processForm={processForm}
        isProcessingForm={createUserMutation.isPending || updateUserMutation.isPending}
        onSubmitForm={handleSubmitForm}
      />
      <UserDeleteConfirmationDialog
        dialogStore={deleteDialogStore}
        selectedUser={activeUser()}
        processDelete={processDelete}
      />
    </>
  );
};

export default UsersView;

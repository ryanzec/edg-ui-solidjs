import { usersApi } from '$/application/apis/users';
import Page from '$/application/components/page';
import UserDeleteConfirmationDialog from '$/application/components/user-delete-confirmation-dialog';
import UserFormPeek from '$/application/components/user-form-peek';
import UsersList, { type UsersListProps } from '$/application/components/users-list';
import Button from '$/core/components/button';
import { dialogComponentUtils } from '$/core/components/dialog';
import { peekComponentUtils } from '$/core/components/peek';
import Skeleton from '$/core/components/skeleton';
import { Suspense, createSignal } from 'solid-js';

type UsersListUser = UsersListProps['users'][0];

const UsersView = () => {
  const userQuery = usersApi.getList();

  const deleteDialogStore = dialogComponentUtils.createStore();
  const editPeekStore = peekComponentUtils.createStore();

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

  return (
    <>
      <Page>
        <Page.Header>
          Users <Button onClick={handleAddUser}>New User</Button>
        </Page.Header>
        <Suspense fallback={<Skeleton />}>
          <UsersList users={userQuery.data()} onEdit={handleEditUser} onDelete={handleRemoveUser} />
        </Suspense>
      </Page>
      <UserFormPeek peekStore={editPeekStore} editingUser={activeUser()} />
      <UserDeleteConfirmationDialog dialogStore={deleteDialogStore} selectedUser={activeUser()} />
    </>
  );
};

export default UsersView;

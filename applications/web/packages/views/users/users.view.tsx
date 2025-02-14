import Button from '$/components/button';
import { dialogComponentUtils } from '$/components/dialog';
import { peekComponentUtils } from '$/components/peek';
import Skeleton from '$/components/skeleton';
import { usersApi } from '$web/apis/users';
import Page from '$web/components/page';
import UserDeleteConfirmationDialog from '$web/components/user-delete-confirmation-dialog';
import UserFormPeek from '$web/components/user-form-peek';
import UsersList, { type UsersListProps } from '$web/components/users-list';
import { Suspense, createSignal } from 'solid-js';

type UsersListUser = UsersListProps['users'][0];

const UsersView = () => {
  const userQuery = usersApi.getList();

  const deleteDialogStore = dialogComponentUtils.createStore();
  const editPeekStore = peekComponentUtils.createStore();

  const [activeUser, setActiveUser] = createSignal<UsersListUser>();

  const handleAddUser = () => {
    setActiveUser(undefined);
    editPeekStore.setIsOpened(true);
  };

  const handleEditUser = (user: UsersListUser) => {
    setActiveUser(user);
    editPeekStore.setIsOpened(true);
  };

  const handleRemoveUser = (user: UsersListUser) => {
    setActiveUser(user);
    deleteDialogStore.openDialog();
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

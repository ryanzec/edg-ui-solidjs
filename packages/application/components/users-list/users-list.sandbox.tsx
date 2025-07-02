import UsersList, { type UsersListProps } from '$/application/components/users-list';
import { UserRoleName } from '$api/types/user';
import SandboxExamplesContainer from '$sandbox/components/sandbox-examples-container/sandbox-examples-container';

export default {
  title: 'Application/UsersList',
};

const mockUsers: UsersListProps['users'] = [
  {
    id: '1',
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    roles: [UserRoleName.ADMIN, UserRoleName.USER],
  },
  {
    id: '2',
    name: 'Alex Smith',
    email: 'alex.smith@example.com',
    roles: [UserRoleName.USER],
  },
  {
    id: '3',
    name: 'Bob Wilson',
    email: 'bob.wilson@example.com',
    roles: [UserRoleName.ADMIN],
  },
  {
    id: '4',
    name: 'Grace Lee',
    email: 'grace.lee@example.com',
    roles: [UserRoleName.ADMIN, UserRoleName.USER],
  },
];

export const Default = () => {
  const handleUserEdit = (user: UsersListProps['users'][0]) => {
    console.log('Edit user:', user);
  };

  const handleUserDelete = (user: UsersListProps['users'][0]) => {
    console.log('Delete user:', user);
  };

  return (
    <SandboxExamplesContainer>
      <UsersList users={mockUsers} onEdit={handleUserEdit} onDelete={handleUserDelete} />
    </SandboxExamplesContainer>
  );
};

export const EmptyList = () => {
  const handleAdd = () => {
    console.log('add');
  };

  return (
    <SandboxExamplesContainer>
      <UsersList users={[]} onAdd={handleAdd} />
    </SandboxExamplesContainer>
  );
};

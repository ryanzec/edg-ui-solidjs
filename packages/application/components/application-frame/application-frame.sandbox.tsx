import ApplicationFrame from '$/application/components/application-frame';
import Page from '$/application/components/page';
import PageContent from '$/application/components/page/page-content';
import UsersList, { type UsersListProps } from '$/application/components/users-list';
import { ApplicationFeature } from '$/application/utils/application';
import { UserRoleName } from '$api/types/user';
import SandboxExamplesContainer from '$sandbox/components/sandbox-examples-container/sandbox-examples-container';
import type { Navigator } from '@solidjs/router';

export default {
  title: 'Application/ApplicationFrame',
};

const userProfileImage = {
  name: 'John Doe',
  email: 'basire@gmail.com',
};

const userNoProfileImage = {
  name: 'John Doe',
  email: 'john.doe@example.com',
};

const navigate: Navigator = (route: string | number) => {
  console.log('navigate', route);
};

const handleSettings = () => {
  console.log('settings');
};

const handleInternalTools = () => {
  console.log('internal tools');
};

const handleLogout = () => {
  console.log('logout');
};

export const Default = () => {
  const applicationFrameProps = {
    navigate: navigate,
    homeRoute: '#',
    topNavigationItems: [
      {
        label: 'Page 1',
        route: '#',
        isActive: true,
      },
      {
        label: 'Page 2',
        route: '#',
        isActive: false,
      },
      {
        label: 'Page 3',
        route: '#',
        isActive: false,
      },
      {
        label: 'Page 4',
        route: '#',
        isActive: false,
      },
    ],
    isInitializing: false,
    isAuthenticated: true,
    user: userProfileImage,
    onSettings: handleSettings,
    onInternalTools: handleInternalTools,
    onLogout: handleLogout,
  };
  return (
    <SandboxExamplesContainer class="h-full w-full">
      <ApplicationFrame {...applicationFrameProps} />
    </SandboxExamplesContainer>
  );
};

export const NoProfileImage = () => {
  const applicationFrameProps = {
    navigate: navigate,
    homeRoute: '#',
    topNavigationItems: [
      {
        label: 'Page 1',
        route: '#',
        isActive: false,
      },
      {
        label: 'Page 2',
        route: '#',
        isActive: true,
      },
      {
        label: 'Page 3',
        route: '#',
        isActive: false,
      },
      {
        label: 'Page 4',
        route: '#',
        isActive: false,
      },
    ],
    isInitializing: false,
    isAuthenticated: true,
    user: userNoProfileImage,
    onSettings: handleSettings,
    onInternalTools: handleInternalTools,
    onLogout: handleLogout,
  };
  return (
    <SandboxExamplesContainer class="h-full w-full">
      <ApplicationFrame {...applicationFrameProps} />
    </SandboxExamplesContainer>
  );
};

export const WithInternalTools = () => {
  const applicationFrameProps = {
    navigate: navigate,
    homeRoute: '#',
    topNavigationItems: [
      {
        label: 'Page 1',
        route: '#',
        isActive: true,
      },
      {
        label: 'Page 2',
        route: '#',
        isActive: false,
      },
      {
        label: 'Page 3',
        route: '#',
        isActive: false,
      },
      {
        label: 'Page 4',
        route: '#',
        isActive: false,
      },
    ],
    isInitializing: false,
    isAuthenticated: true,
    user: userProfileImage,
    onSettings: handleSettings,
    onInternalTools: handleInternalTools,
    onLogout: handleLogout,
    features: [ApplicationFeature.INTERNAL_TOOLS],
  };
  return (
    <SandboxExamplesContainer class="h-full w-full">
      <ApplicationFrame {...applicationFrameProps} />
    </SandboxExamplesContainer>
  );
};

export const WithPageContent = () => {
  const applicationFrameProps = {
    navigate: navigate,
    homeRoute: '#',
    topNavigationItems: [
      {
        label: 'Page 1',
        route: '#',
        isActive: false,
      },
      {
        label: 'Page 2',
        route: '#',
        isActive: true,
      },
      {
        label: 'Page 3',
        route: '#',
        isActive: false,
      },
      {
        label: 'Page 4',
        route: '#',
        isActive: false,
      },
    ],
    isInitializing: false,
    isAuthenticated: true,
    user: userProfileImage,
    onSettings: handleSettings,
    onInternalTools: handleInternalTools,
    onLogout: handleLogout,
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
    {
      id: '5',
      name: 'John Doe',
      email: 'john.doe@example.com',
      roles: [UserRoleName.ADMIN, UserRoleName.USER],
    },
    {
      id: '6',
      name: 'John Doe',
      email: 'john.doe@example.com',
      roles: [UserRoleName.ADMIN, UserRoleName.USER],
    },
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
    {
      id: '5',
      name: 'John Doe',
      email: 'john.doe@example.com',
      roles: [UserRoleName.ADMIN, UserRoleName.USER],
    },
    {
      id: '6',
      name: 'John Doe',
      email: 'john.doe@example.com',
      roles: [UserRoleName.ADMIN, UserRoleName.USER],
    },
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
    {
      id: '5',
      name: 'John Doe',
      email: 'john.doe@example.com',
      roles: [UserRoleName.ADMIN, UserRoleName.USER],
    },
    {
      id: '6',
      name: 'John Doe',
      email: 'john.doe@example.com',
      roles: [UserRoleName.ADMIN, UserRoleName.USER],
    },
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
    {
      id: '5',
      name: 'John Doe',
      email: 'john.doe@example.com',
      roles: [UserRoleName.ADMIN, UserRoleName.USER],
    },
    {
      id: '6',
      name: 'John Doe',
      email: 'john.doe@example.com',
      roles: [UserRoleName.ADMIN, UserRoleName.USER],
    },
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
    {
      id: '5',
      name: 'John Doe',
      email: 'john.doe@example.com',
      roles: [UserRoleName.ADMIN, UserRoleName.USER],
    },
    {
      id: '6',
      name: 'John Doe',
      email: 'john.doe@example.com',
      roles: [UserRoleName.ADMIN, UserRoleName.USER],
    },
  ];

  // @todo(v1) type this properly when data structure known
  // biome-ignore lint/suspicious/noExplicitAny: type not known right now
  const handleEdit = (item: any) => {
    console.log('edit', item);
  };

  // @todo(v1) type this properly when data structure known
  // biome-ignore lint/suspicious/noExplicitAny: type not known right now
  const handleDelete = (item: any) => {
    console.log('delete', item);
  };

  return (
    <SandboxExamplesContainer class="h-full w-full">
      <ApplicationFrame {...applicationFrameProps}>
        <Page>
          <Page.Header label="Users" />
          <PageContent>
            <UsersList users={mockUsers} onEdit={handleEdit} onDelete={handleDelete} />
          </PageContent>
        </Page>
      </ApplicationFrame>
    </SandboxExamplesContainer>
  );
};

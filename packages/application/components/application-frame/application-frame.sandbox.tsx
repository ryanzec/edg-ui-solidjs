import type { Navigator } from '@solidjs/router';
import { useContext } from 'solid-js';
import ApplicationFrame, { ApplicationFrameContextComponent } from '$/application/components/application-frame';
import Page, { PageLayout } from '$/application/components/page';
import PageContent from '$/application/components/page/page-content';
import UsersList, { type UsersListProps } from '$/application/components/users-list';
import { ApplicationFeature } from '$/application/utils/application';
import Badge, { BadgeColor, BadgeVariant } from '$/core/components/badge';
import Callout, { CalloutColor, CalloutVariant } from '$/core/components/callout';
import Card from '$/core/components/card';
import FormField from '$/core/components/form-field';
import FormFields from '$/core/components/form-fields';
import Input from '$/core/components/input';
import { debouncedUpdateStoreUtils } from '$/core/stores/debounced-update.store';
import { loggerUtils } from '$/core/utils/logger';
import { UserRoleName } from '$api/types/user';
import SandboxExamplesContainer from '$sandbox/components/sandbox-examples-container/sandbox-examples-container';

export default {
  title: 'Application/ApplicationFramePlusPage',
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

const applicationFrameProps = {
  navigate: navigate,
  pathname: '/',
  isInitializing: false,
  isAuthenticated: true,
  user: userProfileImage,
  onSettings: handleSettings,
  onInternalTools: handleInternalTools,
  onLogout: handleLogout,
};

export const BackLink = () => {
  return (
    <SandboxExamplesContainer class="h-full w-full" withPadding={false}>
      <ApplicationFrame {...applicationFrameProps}>
        <Page onClickBackLink={() => console.log('Back link clicked')} backLinkLabel="Previous Page">
          <Page.Content>
            <div>This page has a back link.</div>
          </Page.Content>
        </Page>
      </ApplicationFrame>
    </SandboxExamplesContainer>
  );
};

export const CenteredLayout = () => {
  return (
    <SandboxExamplesContainer class="h-full w-full" withPadding={false}>
      <ApplicationFrame {...applicationFrameProps}>
        <Page layout={PageLayout.CENTERED}>
          <Page.Header label="Centered Page" />
          <Page.Content>
            <Card>
              <Card.Content>This page uses the centered layout option.</Card.Content>
            </Card>
          </Page.Content>
        </Page>
      </ApplicationFrame>
    </SandboxExamplesContainer>
  );
};

export const Default = () => {
  return (
    <SandboxExamplesContainer class="h-full w-full" withPadding={false}>
      <ApplicationFrame {...applicationFrameProps} />
    </SandboxExamplesContainer>
  );
};

export const ForceFullHeight = () => {
  const Test = () => {
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
        name: 'John Doe (end)',
        email: 'john.doe@example.com',
        roles: [UserRoleName.ADMIN, UserRoleName.USER],
      },
    ];

    const applicationFrameContext = useContext(ApplicationFrameContextComponent);

    if (!applicationFrameContext) {
      loggerUtils.error({
        type: 'application-frame-context-not-found',
      });

      return null;
    }

    applicationFrameContext.setForceFullHeight(true);

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
      <Page forceFullHeight={applicationFrameContext.forceFullHeight() ?? false}>
        <Page.Header label="Users" />
        <PageContent>
          <UsersList users={mockUsers} onSelectEdit={handleEdit} onSelectDelete={handleDelete} />
        </PageContent>
      </Page>
    );
  };

  return (
    <SandboxExamplesContainer class="h-full w-full" withPadding={false}>
      <ApplicationFrame {...applicationFrameProps}>
        <Test />
      </ApplicationFrame>
    </SandboxExamplesContainer>
  );
};

export const MultipleContentSections = () => {
  const debouncedUpdateStore = debouncedUpdateStoreUtils.createStore();

  return (
    <SandboxExamplesContainer class="h-full w-full" withPadding={false}>
      <ApplicationFrame {...applicationFrameProps}>
        <Page>
          <Page.Header label="Multiple Content Sections" />
          <Page.Content>
            <Card>
              <Card.Content>This is the first content section as a card.</Card.Content>
            </Card>
            <div>
              <FormFields>
                <FormField>
                  <Input.DebouncedSearch placeholder="Search" debouncedUpdateStore={debouncedUpdateStore} />
                </FormField>
              </FormFields>
            </div>
            <Card>
              <Card.Content>This is the third content section.</Card.Content>
            </Card>
          </Page.Content>
        </Page>
      </ApplicationFrame>
    </SandboxExamplesContainer>
  );
};

export const NoProfileImage = () => {
  return (
    <SandboxExamplesContainer class="h-full w-full" withPadding={false}>
      <ApplicationFrame {...applicationFrameProps} user={userNoProfileImage} />
    </SandboxExamplesContainer>
  );
};

export const WithActivePage = () => {
  return (
    <SandboxExamplesContainer class="h-full w-full" withPadding={false}>
      <ApplicationFrame {...applicationFrameProps} pathname="/projects" />
    </SandboxExamplesContainer>
  );
};

export const WithPageContent = () => {
  const Test = () => {
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
        name: 'John Doe (end)',
        email: 'john.doe@example.com',
        roles: [UserRoleName.ADMIN, UserRoleName.USER],
      },
    ];

    const applicationFrameContext = useContext(ApplicationFrameContextComponent);

    if (!applicationFrameContext) {
      loggerUtils.error({
        type: 'application-frame-context-not-found',
      });

      return null;
    }

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
      <Page forceFullHeight={applicationFrameContext.forceFullHeight() ?? false}>
        <Page.Header label="Users" />
        <PageContent>
          <UsersList users={mockUsers} onSelectEdit={handleEdit} onSelectDelete={handleDelete} />
        </PageContent>
      </Page>
    );
  };

  return (
    <SandboxExamplesContainer class="h-full w-full" withPadding={false}>
      <ApplicationFrame {...applicationFrameProps}>
        <Test />
      </ApplicationFrame>
    </SandboxExamplesContainer>
  );
};

export const WithScrollablePageContent = () => {
  const Test = () => {
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
        name: 'John Doe (end)',
        email: 'john.doe@example.com',
        roles: [UserRoleName.ADMIN, UserRoleName.USER],
      },
    ];

    const applicationFrameContext = useContext(ApplicationFrameContextComponent);

    if (!applicationFrameContext) {
      loggerUtils.error({
        type: 'application-frame-context-not-found',
      });

      return null;
    }

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
      <Page forceFullHeight={applicationFrameContext.forceFullHeight() ?? false}>
        <Page.Header label="Users" />
        <PageContent>
          <Callout
            variant={CalloutVariant.WEAK}
            color={CalloutColor.WARNING_HIGH}
            extraContentElement={
              <>
                <Badge color={BadgeColor.BRAND_SECONDARY} variant={BadgeVariant.STRONG}>
                  Badge
                </Badge>
                {`This is just some long extra content for testing purposes.\nThis is just some long extra content for
              testing purposes. This is just some long extra content for testing purposes.\nThis is just some long extra
              content for testing purposes.\nThis is just some long extra content for testing purposes. This is just some
              long extra content for testing purposes.This is just some long extra content for testing purposes.\nThis is just some long extra content for
              testing purposes. This is just some long extra content for testing purposes.\nThis is just some long extra
              content for testing purposes.\nThis is just some long extra content for testing purposes. This is just some
              long extra content for testing purposes.This is just some long extra content for testing purposes.\nThis is just some long extra content for
              testing purposes. This is just some long extra content for testing purposes.\nThis is just some long extra
              content for testing purposes.\nThis is just some long extra content for testing purposes. This is just some
              long extra content for testing purposes.This is just some long extra content for testing purposes.\nThis is just some long extra content for
              testing purposes. This is just some long extra content for testing purposes.\nThis is just some long extra
              content for testing purposes.\nThis is just some long extra content for testing purposes. This is just some
              long extra content for testing purposes.This is just some long extra content for testing purposes.\nThis is just some long extra content for
              testing purposes. This is just some long extra content for testing purposes.\nThis is just some long extra
              content for testing purposes.\nThis is just some long extra content for testing purposes. This is just some
              long extra content for testing purposes.`}
              </>
            }
          >
            Hey
          </Callout>
          <UsersList class="max-h-[550px]" users={mockUsers} onSelectEdit={handleEdit} onSelectDelete={handleDelete} />
        </PageContent>
      </Page>
    );
  };

  return (
    <SandboxExamplesContainer class="h-full w-full" withPadding={false}>
      <ApplicationFrame {...applicationFrameProps}>
        <Test />
      </ApplicationFrame>
    </SandboxExamplesContainer>
  );
};

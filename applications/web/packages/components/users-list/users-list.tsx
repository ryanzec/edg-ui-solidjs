import Button, { ButtonColor } from '$/components/button';
import { CalloutColor } from '$/components/callout';
import Table, { TableShape } from '$/components/table';
import { globalNotificationsStore } from '$/stores/global-notifications.store';
import { type User, type UserRole, userRoleNameToDisplayMap } from '$api/types/user';
import styles from '$web/components/users-list/users-list.module.css';
import { authenticationStore } from '$web/stores/authentication.store';
import { For, Show } from 'solid-js';

type InternalUser = Pick<User, 'id' | 'email' | 'name' | 'roles'>;

export type UsersListProps = {
  users: InternalUser[];
  onEdit?: (user: InternalUser) => void;
  onDelete?: (user: InternalUser) => void;
};

const UsersList = (props: UsersListProps) => {
  return (
    <Table
      shape={TableShape.SQUARE}
      tableHead={
        <Table.Row>
          <Table.Header class={styles.nameCell}>Name</Table.Header>
          <Table.Header class={styles.emailCell}>Email</Table.Header>
          <Table.Header>Roles</Table.Header>
          <Table.Header />
        </Table.Row>
      }
    >
      <For each={props.users}>
        {(user) => {
          const handleEdit = () => {
            props.onEdit?.(user);
          };

          const handleRemove = () => {
            props.onDelete?.(user);
          };

          const handleSendResetPasswordEmail = () => {
            authenticationStore.sendResetPassword({ email: user.email }, { redirect: false });

            globalNotificationsStore.addNotification({
              message: () => 'Reset password email sent to user',
              color: CalloutColor.SUCCESS,
            });
          };

          const mapRoleToDisplay = (role: UserRole) => {
            return userRoleNameToDisplayMap[role.id];
          };

          return (
            <Table.Row>
              <Table.Data class={styles.nameCell}>{user.name}</Table.Data>
              <Table.Data class={styles.emailCell}>{user.email}</Table.Data>
              <Table.Data>{user.roles.map(mapRoleToDisplay).join(', ')}</Table.Data>
              <Table.Data>
                <Show when={!!props.onEdit}>
                  <Button onClick={handleEdit}>S</Button>
                </Show>
                <Button onClick={handleRemove} color={ButtonColor.DANGER}>
                  D
                </Button>
                <Button onClick={handleSendResetPasswordEmail} color={ButtonColor.WARNING}>
                  R
                </Button>
              </Table.Data>
            </Table.Row>
          );
        }}
      </For>
    </Table>
  );
};

export default UsersList;

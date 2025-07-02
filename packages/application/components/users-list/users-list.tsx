import Page from '$/application/components/page';
import EmptyIndicator from '$/core/components/empty-indicator';
import GridTable from '$/core/components/grid-table';
import Icon from '$/core/components/icon';
import List from '$/core/components/list';
import { tooltipComponentUtils } from '$/core/components/tooltip';
import type { User } from '$api/types/user';
import { For, Show } from 'solid-js';

type InternalUser = Pick<User, 'id' | 'email' | 'name' | 'roles'>;

export type UsersListProps = {
  users: InternalUser[];
  onEdit?: (user: InternalUser) => void;
  onDelete?: (user: InternalUser) => void;
  onAdd?: () => void;
};

const UsersList = (props: UsersListProps) => {
  return (
    <Page.ContentSection>
      <Show
        when={props.users.length > 0}
        fallback={
          <EmptyIndicator label="No users found" actionLabel="Add User" onTriggerAction={props.onAdd} noBorder />
        }
      >
        <GridTable class="grid-cols-[300px_300px_1fr_auto]">
          <GridTable.HeaderData>Name</GridTable.HeaderData>
          <GridTable.HeaderData>Email</GridTable.HeaderData>
          <GridTable.HeaderData>Roles</GridTable.HeaderData>
          <GridTable.HeaderData />
          <For each={props.users}>
            {(user, index) => {
              const isLastRow = index() === props.users.length - 1;
              const dropDownStore = tooltipComponentUtils.createStore();

              const handleEdit = () => {
                props.onEdit?.(user);

                dropDownStore.hide();
              };

              const handleRemove = () => {
                props.onDelete?.(user);

                dropDownStore.hide();
              };

              return (
                <>
                  <GridTable.Data onClick={handleEdit} isLastRow={isLastRow} isStartOfRow>
                    {user.name}
                  </GridTable.Data>
                  <GridTable.Data onClick={handleEdit} isLastRow={isLastRow}>
                    {user.email}
                  </GridTable.Data>
                  <GridTable.Data onClick={handleEdit} isLastRow={isLastRow}>
                    {user.roles.join(', ')}
                  </GridTable.Data>
                  <GridTable.DataActions
                    isLastRow={isLastRow}
                    isEndOfRow
                    dropDownStore={dropDownStore}
                    contentElement={
                      <>
                        <List.Item onClick={handleEdit} preItem={<Icon icon="pencil" />}>
                          Edit
                        </List.Item>
                        <List.Item onClick={handleRemove} preItem={<Icon icon="x" />}>
                          Remove
                        </List.Item>
                      </>
                    }
                  />
                </>
              );
            }}
          </For>
        </GridTable>
      </Show>
    </Page.ContentSection>
  );
};

export default UsersList;

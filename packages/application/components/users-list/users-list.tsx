import EmptyIndicator from '$/core/components/empty-indicator';
import GridTable from '$/core/components/grid-table';
import Icon from '$/core/components/icon';
import List from '$/core/components/list';
import { tooltipComponentUtils } from '$/core/components/tooltip';
import type { User } from '$api/types/user';
import { Show } from 'solid-js';

type InternalUser = Pick<User, 'id' | 'email' | 'name' | 'roles'>;

export type UsersListProps = {
  users: InternalUser[];
  onSelectEdit?: (user: InternalUser) => void;
  onSelectDelete?: (user: InternalUser) => void;
  onSelectAdd?: () => void;
};

const UsersList = (props: UsersListProps) => {
  return (
    <Show
      when={props.users.length > 0}
      fallback={
        <EmptyIndicator label="No users found" actionLabel="Add User" onTriggerAction={props.onSelectAdd} noBorder />
      }
    >
      <GridTable.Simple
        class="grid-cols-[300px_300px_1fr_auto]"
        headerData={['Name', 'Email', 'Roles']}
        hasActions
        items={props.users}
        columnCount={4}
      >
        {(user, index) => {
          const isLastRow = index() === props.users.length - 1;
          const dropDownStore = tooltipComponentUtils.createStore();

          const handleEdit = () => {
            props.onSelectEdit?.(user);

            dropDownStore.hide();
          };

          const handleRemove = () => {
            props.onSelectDelete?.(user);

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
                actionsTooltipStore={dropDownStore}
                dropDownContentElement={
                  <>
                    <List.Item onClick={handleEdit} preElement={<Icon icon="pencil" />}>
                      Edit
                    </List.Item>
                    <List.Item onClick={handleRemove} preElement={<Icon icon="x" />}>
                      Remove
                    </List.Item>
                  </>
                }
              />
            </>
          );
        }}
      </GridTable.Simple>
    </Show>
  );
};

export default UsersList;

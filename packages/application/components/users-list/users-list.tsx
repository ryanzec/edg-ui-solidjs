import { Show } from 'solid-js';
import EmptyIndicator from '$/core/components/empty-indicator';
import GridTable from '$/core/components/grid-table';
import Icon from '$/core/components/icon';
import List from '$/core/components/list';
import type { TooltipComponentRef } from '$/core/components/tooltip';
import { componentRefUtils } from '$/core/stores/component-ref';
import { tailwindUtils } from '$/core/utils/tailwind';
import type { User } from '$api/types/user';

type InternalUser = Pick<User, 'id' | 'email' | 'name' | 'roles'>;

export type UsersListProps = {
  class?: string;
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
        class={tailwindUtils.merge('grid-cols-[300px_300px_1fr_auto]', props.class)}
        headerData={['Name', 'Email', 'Roles']}
        hasActions
        items={props.users}
        columnCount={4}
      >
        {(user, index) => {
          const isLastRow = () => index() === props.users.length - 1;
          const dropDownComponentRef = componentRefUtils.createRef<TooltipComponentRef>();

          const handleEdit = () => {
            props.onSelectEdit?.(user);

            dropDownComponentRef.api()?.hide();
          };

          const handleRemove = () => {
            props.onSelectDelete?.(user);

            dropDownComponentRef.api()?.hide();
          };

          return (
            <>
              <GridTable.Data onClick={handleEdit} isLastRow={isLastRow()} isStartOfRow>
                {user.name}
              </GridTable.Data>
              <GridTable.Data onClick={handleEdit} isLastRow={isLastRow()}>
                {user.email}
              </GridTable.Data>
              <GridTable.Data onClick={handleEdit} isLastRow={isLastRow()}>
                {user.roles.join(', ')}
              </GridTable.Data>
              <GridTable.DataActions
                isLastRow={isLastRow()}
                isEndOfRow
                actionsDropDownComponentRef={dropDownComponentRef}
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

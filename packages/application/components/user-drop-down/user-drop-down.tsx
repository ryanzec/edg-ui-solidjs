import { ApplicationFeature } from '$/application/utils/application';
import Avatar, { AvatarSize } from '$/core/components/avatar';
import Checkbox from '$/core/components/checkbox';
import DropDown from '$/core/components/drop-down';
import Icon, { IconColor } from '$/core/components/icon';
import List from '$/core/components/list';
import type { TooltipStore } from '$/core/components/tooltip';
import type { User } from '$api/types/user';
import { Show } from 'solid-js';

export type UserMenuProps = {
  tooltipStore: TooltipStore;
  user: Pick<User, 'name' | 'email'>;
  onSettings: () => void;
  onInternalTools: () => void;
  onLogout: () => void;
  features: ApplicationFeature[];
};

const UserMenu = (props: UserMenuProps) => {
  const handleUserItemClick = (event: MouseEvent) => {
    // event.stopPropagation();
    // props.tooltipStore.hide();
  };

  return (
    <button type="button" onClick={handleUserItemClick} class="w-full">
      <DropDown.Menu
        class="w-full"
        store={props.tooltipStore}
        placement="right-end"
        handleClass="w-full"
        offset={{ mainAxis: -5, crossAxis: -5 }}
        handleElement={
          <div class="flex w-full items-center justify-between cursor-pointer px-2xs mx-xs py-4xs mb-2xs rounded-full hover:bg-[#a8bfb6]">
            <Avatar.User avatarSize={AvatarSize.SMALL} name={props.user.name} email={props.user.email} />
            <Icon class="ml-auto" icon="caret-right" color={IconColor.INHERIT} />
          </div>
        }
        contentClass="min-w-[250px]"
        contentElement={
          <>
            <List.Item>
              <Checkbox.Toggle labelElement="Color Theme" />
            </List.Item>
            <List.Item onClick={props.onSettings}>Settings</List.Item>
            <Show when={props.features.includes(ApplicationFeature.INTERNAL_TOOLS)}>
              <List.Item onClick={props.onInternalTools}>Internal Tools</List.Item>
            </Show>
            <List.Item onClick={props.onLogout}>Logout</List.Item>
          </>
        }
      />
    </button>
  );
};

export default UserMenu;

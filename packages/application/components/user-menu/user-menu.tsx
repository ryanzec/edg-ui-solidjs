import { authenticationStore } from '$/application/stores/authentication.store';
import { ApplicationFeature, UiRouteName } from '$/application/utils/application';
import Avatar, { AvatarSize } from '$/core/components/avatar';
import Checkbox from '$/core/components/checkbox';
import DropDown from '$/core/components/drop-down';
import Icon, { IconColor } from '$/core/components/icon';
import List from '$/core/components/list';
import type { TooltipStore } from '$/core/components/tooltip';
import { tailwindUtils } from '$/core/utils/tailwind';
import type { User } from '$api/types/user';
import { useNavigate } from '@solidjs/router';
import { Show, mergeProps } from 'solid-js';

export type UserMenuProps = {
  userMenuTooltipStore: TooltipStore;
  user: Pick<User, 'name' | 'email'>;
  features: ApplicationFeature[];
  showName?: boolean;
  isCollapsed?: boolean;
};

const UserMenu = (passedProps: UserMenuProps) => {
  const props = mergeProps(
    {
      isCollapsed: false,
    },
    passedProps,
  );

  const navigate = useNavigate();

  const handleSettings = () => {
    navigate(UiRouteName.USERS);

    props.userMenuTooltipStore.hide();
  };

  const handleInternalTools = () => {
    navigate(UiRouteName.HOME);

    props.userMenuTooltipStore.hide();
  };

  const handleLogout = () => {
    authenticationStore.logout();

    props.userMenuTooltipStore.hide();
  };

  return (
    <button type="button" class="w-full">
      <DropDown.Menu
        class="w-full"
        tooltipStore={props.userMenuTooltipStore}
        placement="right-end"
        handleClass="w-full"
        offset={{ mainAxis: -5, crossAxis: -5 }}
        handleElement={
          <div
            class={tailwindUtils.merge(
              'flex w-full items-center justify-between cursor-pointer mx-xs mb-2xs rounded-full hover:bg-[#a8bfb6]',
              {
                'px-2xs py-4xs': props.isCollapsed === false,
              },
            )}
          >
            <Avatar.User
              avatarSize={props.isCollapsed ? AvatarSize.FILL : AvatarSize.SMALL}
              name={props.user.name}
              email={props.user.email}
              showName={props.showName}
            />
            <Show when={props.isCollapsed === false}>
              <Icon class="ml-auto" icon="caret-right" color={IconColor.INHERIT} />
            </Show>
          </div>
        }
        contentClass="min-w-[250px]"
        contentElement={
          <>
            <List.Item>
              <Checkbox.Toggle labelElement="Color Theme" />
            </List.Item>
            <List.Item onClick={handleSettings}>Settings</List.Item>
            <Show when={props.features.includes(ApplicationFeature.INTERNAL_TOOLS)}>
              <List.Item onClick={handleInternalTools}>Internal Tools</List.Item>
            </Show>
            <List.Item onClick={handleLogout}>Logout</List.Item>
          </>
        }
      />
    </button>
  );
};

export default UserMenu;

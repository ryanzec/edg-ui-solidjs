import { useNavigate } from '@solidjs/router';
import { mergeProps, Show } from 'solid-js';
import { authenticationStore } from '$/application/stores/authentication.store';
import { ApplicationFeature, UiRouteName } from '$/application/utils/application';
import Avatar, { AvatarSize } from '$/core/components/avatar';
import Checkbox from '$/core/components/checkbox';
import { checkboxComponentsUtils } from '$/core/components/checkbox/utils';
import DropDown from '$/core/components/drop-down';
import type { DropDownMenuProps } from '$/core/components/drop-down/drop-down-menu';
import FormField from '$/core/components/form-field';
import Icon, { IconColor } from '$/core/components/icon';
import List from '$/core/components/list';
import { themeManagerStore } from '$/core/stores/theme-manager.store';
import { ThemeName } from '$/core/utils/styles';
import { tailwindUtils } from '$/core/utils/tailwind';
import type { User } from '$api/types/user';
import ApplicationFrameTopItem from './application-frame-top-item';

export type ApplicationFrameSecondaryMenuProps = {
  tooltipComponentRef: DropDownMenuProps['tooltipComponentRef'];
  class?: string;
};

const ApplicationFrameSecondaryMenu = (passedProps: ApplicationFrameSecondaryMenuProps) => {
  const props = mergeProps(
    {
      isCollapsed: false,
    },
    passedProps,
  );

  const handleLogout = () => {
    authenticationStore.logout();

    props.tooltipComponentRef.api()?.hide();
  };

  return (
    <button type="button" class={tailwindUtils.merge('w-full', props.class)}>
      <DropDown.Menu
        class="w-full"
        tooltipComponentRef={props.tooltipComponentRef}
        placement="right-end"
        handleClass="w-full h-full"
        offset={{ mainAxis: -5, crossAxis: -5 }}
        handleElement={<ApplicationFrameTopItem label="Other Menu" icon="puzzle-piece" isMenu />}
        contentClass="min-w-[250px]"
        contentElement={
          <>
            <List.Item onClick={handleLogout}>Item 1</List.Item>
            <List.Item onClick={handleLogout}>Item 2</List.Item>
            <List.Item onClick={handleLogout}>Item 3</List.Item>
            <List.Item onClick={handleLogout}>Item 4</List.Item>
            <List.Item onClick={handleLogout}>Item 5</List.Item>
            <List.Item onClick={handleLogout}>Item 6</List.Item>
            <List.Item onClick={handleLogout}>Item 7</List.Item>
            <List.Item onClick={handleLogout}>Item 8</List.Item>
            <List.Item onClick={handleLogout}>Item 9</List.Item>
            <List.Item onClick={handleLogout}>Item 10</List.Item>
          </>
        }
      />
    </button>
  );
};

export default ApplicationFrameSecondaryMenu;

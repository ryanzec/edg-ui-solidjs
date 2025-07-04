import { tailwindUtils } from '$/core/utils/tailwind';
import { type JSX, splitProps } from 'solid-js';

import type { CommonDataAttributes } from '$/core/types/generic';
import styles from '$sandbox/components/application-frame/application-frame.module.css';
import type { DynamicRouteNavigation } from '$sandbox/stores/dynamic-routes';

import Button, { ButtonShape } from '$/core/components/button';
import { ThemeName } from '$/core/utils/styles';
import { applicationStore } from '$sandbox/stores/application-store';
import ApplicationFrameSubNavigation from './application-frame-sub-navigation';

type ApplicationFrameNavigationProps = JSX.HTMLAttributes<HTMLDivElement> &
  CommonDataAttributes & {
    routes: DynamicRouteNavigation;
  };

const ApplicationFrameNavigation = (passedProps: ApplicationFrameNavigationProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['routes', 'class']);

  const handleToggleTheme = () => {
    applicationStore.setTheme(applicationStore.theme() === ThemeName.LIGHT ? ThemeName.DARK : ThemeName.LIGHT);
  };

  return (
    <div data-id="navigation" class={tailwindUtils.merge(styles.navigation, props.class)} {...restOfProps}>
      {/*<ScrollArea>*/}
      <Button
        shape={ButtonShape.CIRCLE}
        onClick={handleToggleTheme}
        class={styles.toggleThemeTrigger}
        icon={applicationStore.theme() === ThemeName.LIGHT ? 'moon' : 'sun'}
      />
      <ApplicationFrameSubNavigation routes={props.routes} />
      {/*</ScrollArea>*/}
    </div>
  );
};

export default ApplicationFrameNavigation;

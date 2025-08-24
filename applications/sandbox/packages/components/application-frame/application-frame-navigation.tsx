import { type JSX, splitProps } from 'solid-js';
import Button, { ButtonShape } from '$/core/components/button';
import ScrollArea, { type ScrollAreaProps } from '$/core/components/scroll-area';
import type { CommonDataAttributes } from '$/core/types/generic';
import { ThemeName } from '$/core/utils/styles';
import { tailwindUtils } from '$/core/utils/tailwind';
import styles from '$sandbox/components/application-frame/application-frame.module.css';
import { applicationStore } from '$sandbox/stores/application-store';
import type { DynamicRouteNavigation } from '$sandbox/stores/dynamic-routes';
import ApplicationFrameSubNavigation from './application-frame-sub-navigation';

type ApplicationFrameNavigationProps = ScrollAreaProps & {
  routes: DynamicRouteNavigation;
};

const ApplicationFrameNavigation = (passedProps: ApplicationFrameNavigationProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['routes', 'class']);

  const handleToggleTheme = () => {
    applicationStore.setTheme(applicationStore.theme() === ThemeName.LIGHT ? ThemeName.DARK : ThemeName.LIGHT);
  };

  return (
    <ScrollArea class={tailwindUtils.merge(styles.navigation, props.class)} {...restOfProps}>
      <Button
        shape={ButtonShape.CIRCLE}
        onClick={handleToggleTheme}
        class={styles.toggleThemeTrigger}
        icon={applicationStore.theme() === ThemeName.LIGHT ? 'moon' : 'sun'}
      />
      <ApplicationFrameSubNavigation routes={props.routes} />
    </ScrollArea>
  );
};

export default ApplicationFrameNavigation;

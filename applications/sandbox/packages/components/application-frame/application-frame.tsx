import { tailwindUtils } from '$/core/utils/tailwind';
import { type JSX, Show, splitProps } from 'solid-js';

import type { CommonDataAttributes } from '$/core/types/generic';
import styles from '$sandbox/components/application-frame/application-frame.module.css';
// @todo(refactor) replace with sandbox specific store
import type { DynamicRouteNavigation } from '$sandbox/stores/dynamic-routes';

import ApplicationFrameNavigation from './application-frame-navigation';

type ApplicationFrameProps = JSX.HTMLAttributes<HTMLDivElement> &
  CommonDataAttributes & {
    isLoading: boolean;
    navigation: DynamicRouteNavigation;
  };

const ApplicationFrame = (passedProps: ApplicationFrameProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['isLoading', 'navigation', 'class', 'children']);

  return (
    <div class={tailwindUtils.merge(styles.applicationFrame, props.class)} {...restOfProps}>
      <Show when={props.isLoading === false} fallback={<div>Loading</div>}>
        <ApplicationFrameNavigation routes={props.navigation} />
        <div class={tailwindUtils.merge(styles.subContainer)}>
          <div data-id="sandbox-main-content" class={tailwindUtils.merge(styles.mainContent)}>
            {props.children}
          </div>
        </div>
      </Show>
    </div>
  );
};

export default ApplicationFrame;

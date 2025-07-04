import { tailwindUtils } from '$/core/utils/tailwind';
import { Show, createEffect, createSignal, splitProps } from 'solid-js';

import styles from '$sandbox/components/application-frame/application-frame.module.css';

import SideNavigation from '$/core/components/side-navgiation';
import type { DynamicRouteNavigation } from '$sandbox/stores/dynamic-routes';

import { toggleStoreUtils } from '$/core/stores/toggle.store';
import { stringUtils } from '$/core/utils/string';
import ApplicationFrameSubNavigation from '$sandbox/components/application-frame/application-frame-sub-navigation';
import { useLocation } from '@solidjs/router';

type ApplicationFrameExpandableItemProps = {
  routes: DynamicRouteNavigation;
  routeKey: string;
};

const ApplicationFrameExpandableItem = (passedProps: ApplicationFrameExpandableItemProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['routes', 'routeKey']);
  const [isExpanded, setIsExpanded] = createSignal<boolean>(true);
  const location = useLocation();

  const hasSubNavigation = () => typeof Object.values(props.routes)[0] !== 'string';

  const isCurrentSideNavigation = (currentPath: string) => {
    if (hasSubNavigation() || currentPath.length <= 1) {
      return false;
    }

    const sideNavigationGroupRoutePrefix = ((Object.values(props.routes)[0] as string) || '').substring(
      0,
      location.pathname.lastIndexOf('/'),
    );
    const currentRoutePrefix = currentPath.substring(0, location.pathname.lastIndexOf('/'));

    return currentRoutePrefix === sideNavigationGroupRoutePrefix;
  };

  const toggleStore = toggleStoreUtils.createStore();

  createEffect(function toggleItemState() {
    if (isCurrentSideNavigation(location.pathname) === false) {
      return;
    }

    toggleStore.setIsToggled(true);
  });

  return (
    <>
      <Show when={hasSubNavigation()}>
        <div class={styles.navigationGroupHeader}>
          <button type="button" onClick={() => setIsExpanded(!isExpanded())}>
            {stringUtils.toWords(props.routeKey)}
          </button>
        </div>
        <Show when={isExpanded()}>
          <ApplicationFrameSubNavigation routes={props.routes} />
        </Show>
      </Show>
      <Show when={!hasSubNavigation()}>
        <SideNavigation.Item
          class={tailwindUtils.merge(styles.navigationSubSection, {
            [styles.navigationSection]: hasSubNavigation(),
          })}
          headerElement={stringUtils.toWords(props.routeKey)}
          childrenToggleStore={toggleStore}
        >
          <ApplicationFrameSubNavigation routes={props.routes} />
        </SideNavigation.Item>
      </Show>
    </>
  );
};

export default ApplicationFrameExpandableItem;

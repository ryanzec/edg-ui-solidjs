import { tailwindUtils } from '$/core/utils/tailwind';
import { For, type JSX, Show, mergeProps, splitProps } from 'solid-js';

import GlobalNotificationsItem from '$/core/components/global-notifications/global-notifications-item';
import styles from '$/core/components/global-notifications/global-notifications.module.css';
import { GlobalNotificationPosition } from '$/core/components/global-notifications/utils';
import type { GlobalNotification } from '$/core/stores/global-notifications.store';

export type GlobalNotificationsListProps = JSX.HTMLAttributes<HTMLDivElement> & {
  notifications?: GlobalNotification[];
  position?: GlobalNotificationPosition;
};

const GlobalNotifications = (passedProps: GlobalNotificationsListProps) => {
  const [props, restOfProps] = splitProps(
    mergeProps({ notifications: [], position: GlobalNotificationPosition.TOP_RIGHT }, passedProps),
    ['notifications', 'class', 'position'],
  );

  return (
    <Show when={props.notifications.length > 0}>
      {/*<Portal mount={props.mount}>*/}
      <div
        data-id="global-notifications"
        {...restOfProps}
        class={tailwindUtils.merge(props.class, styles.notifications, {
          [styles.topLeft]: props.position === GlobalNotificationPosition.TOP_LEFT,
          [styles.topRight]: props.position === GlobalNotificationPosition.TOP_RIGHT,
          [styles.bottomLeft]: props.position === GlobalNotificationPosition.BOTTOM_LEFT,
          [styles.bottomRight]: props.position === GlobalNotificationPosition.BOTTOM_RIGHT,
        })}
      >
        <For each={props.notifications}>
          {(notification) => {
            return <GlobalNotificationsItem notification={notification} />;
          }}
        </For>
      </div>
      {/*</Portal>*/}
    </Show>
  );
};

export default GlobalNotifications;

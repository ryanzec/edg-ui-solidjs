import { type JSX, Show, splitProps } from 'solid-js';
import Callout, { CalloutColor, CalloutVariant } from '$/core/components/callout';
import styles from '$/core/components/global-notifications/global-notifications.module.css';
import Icon from '$/core/components/icon';
import {
  type GlobalNotification,
  globalNotificationsStore,
  REMOVE_ANIMATION_DURATION,
} from '$/core/stores/global-notifications.store';
import { tailwindUtils } from '$/core/utils/tailwind';

export type GlobalNotificationsListItemProps = JSX.HTMLAttributes<HTMLDivElement> & {
  notification: GlobalNotification;
};

const GlobalNotificationsItem = (passedProps: GlobalNotificationsListItemProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['notification', 'class']);
  const calloutColor = () => props.notification.color ?? CalloutColor.NEUTRAL;

  return (
    <Callout
      data-id="item"
      {...restOfProps}
      class={tailwindUtils.merge(styles.notification, props.class, {
        [styles.isRemoving]: props.notification.isRemoving || false,
      })}
      color={calloutColor()}
      variant={CalloutVariant.WEAK}
      style={{ 'animation-duration': `${REMOVE_ANIMATION_DURATION * 1.05}ms` }}
      preElement={props.notification.preElement?.()}
      postElement={
        <Show when={props.notification.canClose}>
          <Icon
            icon="x"
            class={styles.removeTrigger}
            onClick={() => {
              globalNotificationsStore.removeNotification(props.notification.id);
            }}
          />
        </Show>
      }
    >
      {props.notification.message()}{' '}
    </Callout>
  );
};

export default GlobalNotificationsItem;

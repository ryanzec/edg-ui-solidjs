import { createSignal, type JSX, onMount, Show, splitProps } from 'solid-js';
import Callout, { CalloutColor, CalloutVariant } from '$/core/components/callout';
import styles from '$/core/components/global-notifications/global-notifications.module.css';
import Icon from '$/core/components/icon';
import {
  GLOBAL_NOTIFICATION_REMOVE_ANIMATION_DURATION,
  type GlobalNotification,
  globalNotificationsStore,
} from '$/core/stores/global-notifications.store';
import { tailwindUtils } from '$/core/utils/tailwind';

export type GlobalNotificationsListItemProps = JSX.HTMLAttributes<HTMLDivElement> & {
  notification: GlobalNotification;
  ref?: (element: HTMLDivElement) => void;
};

const GlobalNotificationsItem = (passedProps: GlobalNotificationsListItemProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['notification', 'class', 'ref']);

  const [calloutElement, setCalloutElement] = createSignal<HTMLDivElement>();

  const calloutColor = () => props.notification.color ?? CalloutColor.NEUTRAL;

  onMount(() => {
    const currentCalloutElement = calloutElement();

    if (!currentCalloutElement) {
      return;
    }

    const closeElements = currentCalloutElement.querySelectorAll('[data-global-noptification-close="true"]');

    for (const closeElement of closeElements) {
      closeElement.addEventListener('click', () => {
        globalNotificationsStore.removeNotification(props.notification.id);
      });
    }

    props.ref?.(currentCalloutElement);
  });

  return (
    <Callout
      ref={setCalloutElement}
      data-id="item"
      {...restOfProps}
      class={tailwindUtils.merge(styles.notification, props.class, {
        [styles.isRemoving]: props.notification.isRemoving || false,
      })}
      color={calloutColor()}
      variant={CalloutVariant.WEAK}
      style={{ 'animation-duration': `${GLOBAL_NOTIFICATION_REMOVE_ANIMATION_DURATION * 1.05}ms` }}
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
      extraContentElement={props.notification.extraContentElement?.()}
    >
      {props.notification.message()}
    </Callout>
  );
};

export default GlobalNotificationsItem;

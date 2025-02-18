import classnames from 'classnames';
import { type JSX, Show, splitProps } from 'solid-js';

import Button, { ButtonColor, ButtonShape, ButtonVariant } from '$/core/components/button';
import Callout, { CalloutColor } from '$/core/components/callout';
import Emoji, { EmojiSpacing } from '$/core/components/emoji';
import styles from '$/core/components/global-notifications/global-notifications.module.css';
import Icon, { IconSize } from '$/core/components/icon';
import {
  type GlobalNotification,
  REMOVE_ANIMATION_DURATION,
  globalNotificationsStore,
} from '$/core/stores/global-notifications.store';

export type GlobalNotificationsListItemProps = JSX.HTMLAttributes<HTMLDivElement> & {
  notification: GlobalNotification;
};

const calloutColorToButtonColor: Record<CalloutColor, ButtonColor> = {
  [CalloutColor.NEUTRAL]: ButtonColor.NEUTRAL,
  [CalloutColor.BRAND]: ButtonColor.BRAND,
  [CalloutColor.SUCCESS]: ButtonColor.SUCCESS,
  [CalloutColor.INFO]: ButtonColor.INFO,
  [CalloutColor.WARNING]: ButtonColor.WARNING,
  [CalloutColor.DANGER]: ButtonColor.DANGER,
};

const GlobalNotificationsItem = (passedProps: GlobalNotificationsListItemProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['notification', 'class']);
  const calloutColor = () => props.notification.color ?? CalloutColor.NEUTRAL;

  return (
    <Callout
      data-id="global-notifications-item"
      {...restOfProps}
      class={classnames(styles.notification, props.class, {
        [styles.isRemoving]: props.notification.isRemoving || false,
      })}
      color={calloutColor()}
      style={{ 'animation-duration': `${REMOVE_ANIMATION_DURATION * 1.05}ms` }}
    >
      <Show when={!!props.notification.emoji}>
        <Emoji emoji={props.notification.emoji ?? ''} spacing={EmojiSpacing.RIGHT} size={IconSize.SMALL} />
      </Show>
      {props.notification.message()}{' '}
      <Button
        variant={ButtonVariant.GHOST}
        color={calloutColorToButtonColor[calloutColor()]}
        class={styles.removeTrigger}
        shape={ButtonShape.CIRCLE}
        onClick={() => {
          globalNotificationsStore.removeNotification(props.notification.id);
        }}
      >
        <Icon icon="x" />
      </Button>
    </Callout>
  );
};

export default GlobalNotificationsItem;

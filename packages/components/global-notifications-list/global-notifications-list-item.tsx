import classnames from 'classnames';
import { JSX, Show, splitProps } from 'solid-js';

import Button, { ButtonVariant } from '$/components/button';
import Callout, { CalloutSentiment } from '$/components/callout';
import Emoji, { EmojiSize, EmojiSpacing } from '$/components/emoji';
import styles from '$/components/global-notifications-list/global-notifications-list.module.css';
import Icon from '$/components/icon';
import { GlobalNotification, globalNotificationsStore, REMOVE_ANIMATION_DURATION } from '$/stores/global-notifications';

export interface GlobalNotificationsListItemProps extends JSX.HTMLAttributes<HTMLDivElement> {
  notification: GlobalNotification;
}

const GlobalNotificationsListItem = (passedProps: GlobalNotificationsListItemProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['notification', 'class']);

  return (
    <Callout
      class={classnames(styles.notification, props.class, {
        [styles.isRemoving]: props.notification.isRemoving || false,
      })}
      {...restOfProps}
      sentiment={CalloutSentiment.NEUTRAL}
      style={{ 'animation-duration': `${REMOVE_ANIMATION_DURATION * 1.05}ms` }}
    >
      <Show when={!!props.notification.emoji}>
        <Emoji emoji={props.notification.emoji ?? ''} spacing={EmojiSpacing.RIGHT} size={EmojiSize.SMALL} />
      </Show>
      {props.notification.message()}{' '}
      <Button.IconButton
        variant={ButtonVariant.TEXT}
        class={styles.removeTrigger}
        icon="close"
        onClick={() => {
          globalNotificationsStore.removeNotification(props.notification.id);
        }}
      >
        <Icon icon="close" />
      </Button.IconButton>
    </Callout>
  );
};

export default GlobalNotificationsListItem;

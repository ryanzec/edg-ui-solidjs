import {
  default as BaseGlobalNotifications,
  type GlobalNotificationsListProps,
} from '$/core/components/global-notifications/global-notifications';
import Item, {
  type GlobalNotificationsListItemProps,
} from '$/core/components/global-notifications/global-notifications-item';

export type { GlobalNotificationsListProps, GlobalNotificationsListItemProps };

export { GlobalNotificationPosition } from '$/core/components/global-notifications/utils';

export const GlobalNotifications = Object.assign(BaseGlobalNotifications, { Item });

export default GlobalNotifications;

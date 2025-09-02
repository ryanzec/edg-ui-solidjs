import { produce } from 'immer';
import { pullAt } from 'lodash';
import { type Accessor, createRoot, createSignal, type JSX, untrack } from 'solid-js';
import * as uuid from 'uuid';
import { CalloutColor } from '$/core/components/callout';

export type GlobalNotification = {
  id: string;
  autoClose?: number;
  isRemoving?: boolean;
  removeAnimationDuration?: number;
  color?: CalloutColor;
  canClose: boolean;

  // we make this a function instead of just a JSX.Element in case the message has signal based data
  message: () => JSX.Element;
  preElement?: () => JSX.Element;
  extraContentElement?: () => JSX.Element;
};

export type AddUpdateGlobalNotification = Omit<GlobalNotification, 'id' | 'canClose'> & {
  id?: GlobalNotification['id'];
  canClose?: boolean;
};

export type GlobalNotificationsStore = {
  notifications: Accessor<GlobalNotification[]>;
  addNotification: (notification: AddUpdateGlobalNotification) => GlobalNotification;
  updateNotification: (
    id: GlobalNotification['id'],
    notification: AddUpdateGlobalNotification,
  ) => GlobalNotification | undefined;
  removeNotification: (id: GlobalNotification['id']) => void;
  clearNotifications: () => void;
};

export const GLOBAL_NOTIFICATION_DEFAULT_AUTO_CLOSE = 3000;

export const GLOBAL_NOTIFICATION_DEFAULT_DANGER_AUTO_CLOSE = 7000;

export const GLOBAL_NOTIFICATION_REMOVE_ANIMATION_DURATION = 350;

export const closeTimeoutIds: Record<string, ReturnType<typeof setTimeout>> = {};

const generateNotification = (notification: AddUpdateGlobalNotification): GlobalNotification => {
  const autoClose =
    notification.color === CalloutColor.DANGER
      ? GLOBAL_NOTIFICATION_DEFAULT_DANGER_AUTO_CLOSE
      : GLOBAL_NOTIFICATION_DEFAULT_AUTO_CLOSE;
  return {
    id: notification.id || uuid.v4(),
    ...notification,
    autoClose: notification.autoClose ?? autoClose,
    removeAnimationDuration: notification.removeAnimationDuration ?? GLOBAL_NOTIFICATION_REMOVE_ANIMATION_DURATION,
    canClose: notification.canClose ?? true,
  };
};

const createGlobalNotificationsStore = (): GlobalNotificationsStore => {
  const [notifications, setNotifications] = createSignal<GlobalNotification[]>([]);

  const addRemoveTimeout = (notification: GlobalNotification) => {
    if (notification.autoClose !== 0) {
      closeTimeoutIds[notification.id] = setTimeout(() => {
        untrack(() => {
          removeNotification(notification.id);
        });
      }, notification.autoClose);
    }
  };

  const clearRemoveTimeout = (id: GlobalNotification['id']) => {
    const currentCloseTimeout = closeTimeoutIds[id];

    if (currentCloseTimeout) {
      clearTimeout(currentCloseTimeout);

      delete closeTimeoutIds[id];
    }
  };

  const addNotification = (notification: AddUpdateGlobalNotification): GlobalNotification => {
    // calls of this method should not trigger reactive changes to signals change here
    return untrack(() => {
      const newNotification = generateNotification(notification);

      addRemoveTimeout(newNotification);

      setNotifications(
        produce(notifications(), (draft) => {
          draft.push(newNotification);
        }),
      );

      return newNotification;
    });
  };

  const updateNotification = (
    id: GlobalNotification['id'],
    updateData: AddUpdateGlobalNotification,
  ): GlobalNotification | undefined => {
    // calls of this method should not trigger reactive changes to signals change here
    return untrack(() => {
      const currentNotificationIndex = notifications().findIndex((notification) => notification.id === id);

      if (currentNotificationIndex === -1) {
        return;
      }

      clearRemoveTimeout(id);

      const updatedNotification = generateNotification({
        ...notifications()[currentNotificationIndex],
        ...updateData,
      });

      addRemoveTimeout(updatedNotification);

      setNotifications(
        produce(notifications(), (draft) => {
          draft[currentNotificationIndex] = updatedNotification;
        }),
      );

      return updatedNotification;
    });
  };

  const removeNotification = (id: GlobalNotification['id']) => {
    // calls of this method should not trigger reactive changes to signals change here
    untrack(() => {
      const matchingIndex = notifications().findIndex((notification) => notification.id === id);

      if (matchingIndex === -1) {
        return;
      }

      const removeAnimationDuration = notifications()[matchingIndex].removeAnimationDuration;

      clearRemoveTimeout(id);

      setNotifications(
        produce(notifications(), (draft) => {
          draft[matchingIndex].isRemoving = true;
        }),
      );

      setTimeout(() => {
        untrack(() => {
          setNotifications(
            produce(notifications(), (draft) => {
              // since it is possible for this or another notification to be removed between the start of the removal and
              // this being processed, we need to double-check the index to remove to makes sure the wrong notification
              // is not removed
              const removeIndex = notifications().findIndex((notification) => notification.id === id);

              if (removeIndex === -1) {
                return;
              }

              pullAt(draft, [removeIndex]);
            }),
          );
        });
      }, removeAnimationDuration);
    });
  };

  const clearNotifications = () => {
    // calls of this method should not trigger reactive changes to signals change here
    untrack(() => {
      setNotifications(() => []);
    });
  };

  return {
    notifications,
    addNotification,
    updateNotification,
    removeNotification,
    clearNotifications,
  };
};

const globalNotificationsStore = createRoot(createGlobalNotificationsStore);

export { globalNotificationsStore };

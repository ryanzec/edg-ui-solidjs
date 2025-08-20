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

export type AddNotification = Omit<GlobalNotification, 'id' | 'canClose'> & {
  canClose?: boolean;
};

export type GlobalNotificationsStore = {
  notifications: Accessor<GlobalNotification[]>;
  addNotification: (notification: AddNotification) => GlobalNotification;
  removeNotification: (id: GlobalNotification['id']) => void;
  clearNotifications: () => void;
};

export const DEFAULT_AUTO_CLOSE = 3000;

export const DEFAULT_DANGER_AUTO_CLOSE = 7000;

export const REMOVE_ANIMATION_DURATION = 350;

const createGlobalNotificationsStore = (): GlobalNotificationsStore => {
  const [notifications, setNotifications] = createSignal<GlobalNotification[]>([]);

  const addNotification = (notification: AddNotification) => {
    // calls of this method should not trigger reactive changes to signals change here
    return untrack(() => {
      const autoClose = notification.color === CalloutColor.DANGER ? DEFAULT_DANGER_AUTO_CLOSE : DEFAULT_AUTO_CLOSE;
      const newNotification = {
        id: uuid.v4(),
        ...notification,
        autoClose: notification.autoClose ?? autoClose,
        removeAnimationDuration: notification.removeAnimationDuration ?? REMOVE_ANIMATION_DURATION,
        canClose: notification.canClose ?? true,
      };

      if (newNotification.autoClose !== 0) {
        setTimeout(() => {
          untrack(() => {
            removeNotification(newNotification.id);
          });
        }, newNotification.autoClose);
      }

      setNotifications(
        produce(notifications(), (draft) => {
          draft.push(newNotification);
        }),
      );

      return newNotification;
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
    removeNotification,
    clearNotifications,
  };
};

const globalNotificationsStore = createRoot(createGlobalNotificationsStore);

export { globalNotificationsStore };

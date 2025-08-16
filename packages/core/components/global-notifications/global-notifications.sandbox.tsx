import { createSignal, type JSX } from 'solid-js';

import Button from '$/core/components/button';
import { CalloutColor } from '$/core/components/callout';
import Icon from '$/core/components/icon';
import Input from '$/core/components/input';
import { type GlobalNotification, globalNotificationsStore } from '$/core/stores/global-notifications.store';

export default {
  title: 'Components/GlobalNotifications',
};

export const Default = () => {
  const [test, setTest] = createSignal('test');

  const onClick: JSX.EventHandlerUnion<HTMLInputElement, Event> = (event) => {
    setTest(event.currentTarget?.value);
  };

  return (
    <>
      <Input type="text" onChange={onClick} value={test()} />
      <Button
        onClick={() => {
          // this needs to happen in order to make sure solidjs reactive system properly disposes of the computation
          const forNotification = test();

          globalNotificationsStore.addNotification({
            message: () => <div>This is a test message: {forNotification}</div>,
          });
        }}
      >
        Add Temp Notification
      </Button>
      <Button
        onClick={() => {
          globalNotificationsStore.addNotification({
            message: () => 'This is a test message',
            autoClose: 0,
          });
        }}
      >
        Add Perm Notification
      </Button>
      <Button
        onClick={() => {
          globalNotificationsStore.addNotification({
            message: () => 'This is a test message',
            extraContentElement: () => (
              <div>{'This is a test \n\t\textra \n\ncontent message\nwith whitespace that should show'}</div>
            ),
            autoClose: 0,
          });
        }}
      >
        Add Extra Content Whitespace Notification
      </Button>
      <Button
        onClick={() => {
          globalNotificationsStore.addNotification({
            message: () => 'This is a test message',
            color: CalloutColor.DANGER,
            autoClose: 0,
          });
        }}
      >
        Add Perm Notification (Danger)
      </Button>
    </>
  );
};

export const ManuallyCloseNotification = () => {
  const [test, setTest] = createSignal('test');
  const [activeNotification, setActiveNotification] = createSignal<GlobalNotification>();

  const handleClick: JSX.EventHandlerUnion<HTMLInputElement, Event> = (event) => {
    setTest(event.currentTarget?.value);
  };

  const handleCloseNotification = () => {
    const currentNotification = activeNotification();

    if (!currentNotification) {
      return;
    }

    globalNotificationsStore.removeNotification(currentNotification.id);
    globalNotificationsStore.addNotification({
      message: () => 'Process completed',
    });
    setActiveNotification(undefined);
  };

  return (
    <>
      <Input type="text" onChange={handleClick} value={test()} />
      <Button
        onClick={() => {
          const notification = globalNotificationsStore.addNotification({
            message: () => 'Process running...',
            preElement: () => <Icon icon="spinner" class="animate-spin" />,
            autoClose: 0,
            canClose: false,
          });

          setActiveNotification(notification);
        }}
      >
        Add Perm Notification
      </Button>
      <Button onClick={handleCloseNotification}>Close Notification</Button>
    </>
  );
};

import { createSignal } from 'solid-js';
import Button, { ButtonColor, ButtonVariant } from '$/core/components/button';
import Dialog from '$/core/components/dialog';
import type { DialogComponentRef } from '$/core/components/dialog/utils';
import { componentRefUtils } from '$/core/stores/component-ref';
import { asyncUtils } from '$/core/utils/async';
import { loggerUtils } from '$/core/utils/logger';

export default {
  title: 'Components/Dialog',
};

export const Default = () => {
  const dialogComponentRef = componentRefUtils.createRef<DialogComponentRef>();

  return (
    <div>
      <Button onclick={dialogComponentRef.api()?.open}>Toggle Dialog</Button>
      <Dialog
        dialogComponentRef={dialogComponentRef}
        headerElement="Header"
        footerElement={
          <Button.Group>
            <Button variant={ButtonVariant.GHOST} onClick={() => dialogComponentRef.api()?.close()}>
              Close
            </Button>
            <Button color={ButtonColor.BRAND} onClick={() => alert('test')}>
              Primary
            </Button>
          </Button.Group>
        }
      >
        This is a dialog
      </Dialog>
    </div>
  );
};

export const CloseOnClickOverlay = () => {
  const dialogComponentRef = componentRefUtils.createRef<DialogComponentRef>();

  return (
    <div>
      <Button onclick={dialogComponentRef.api()?.open}>Toggle Dialog</Button>
      <Dialog
        dialogComponentRef={dialogComponentRef}
        headerElement="Header"
        closeOnClickOverlay
        footerElement={
          <Button.Group>
            <Button variant={ButtonVariant.GHOST} onClick={() => dialogComponentRef.api()?.close()}>
              Close
            </Button>
            <Button color={ButtonColor.BRAND} onClick={() => alert('test')}>
              Primary
            </Button>
          </Button.Group>
        }
      >
        This is a dialog
      </Dialog>
    </div>
  );
};

type SomeItem = {
  id: string;
  name: string;
};

const someItem: SomeItem = {
  id: '1',
  name: 'Item 1',
};

export const DeleteConfirmation = () => {
  const dialogComponentRef = componentRefUtils.createRef<DialogComponentRef>();

  const processDelete = async (item: SomeItem) => {
    try {
      console.log('delete', item);

      await asyncUtils.sleep(1000);

      return true;
    } catch (error: unknown) {
      //@todo proper error handling
      loggerUtils.error(error);

      return false;
    }
  };

  return (
    <div>
      <Button onclick={dialogComponentRef.api()?.open}>Delete</Button>
      <Dialog.DeleteConfirmation
        dialogComponentRef={dialogComponentRef}
        processDelete={processDelete}
        selectedItem={someItem}
        headerElement="Really Delete?"
      >
        Are you sure you want to delete, this action can not be undone?
      </Dialog.DeleteConfirmation>
    </div>
  );
};

export const Confirmation = () => {
  const dialogComponentRef = componentRefUtils.createRef<DialogComponentRef>();
  const [isProcessing, setIsProcessing] = createSignal(false);

  const processConfirmation = async () => {
    console.log('confirm');

    setIsProcessing(true);
    await asyncUtils.sleep(1000);
    setIsProcessing(false);

    dialogComponentRef.api()?.close();
  };

  return (
    <div>
      <Button onclick={dialogComponentRef.api()?.open}>Confirm</Button>
      <Dialog.Confirmation
        dialogComponentRef={dialogComponentRef}
        processConfirmation={processConfirmation}
        isProcessing={isProcessing()}
        headerElement="Confirm"
      >
        Are you sure you want to confirm?
      </Dialog.Confirmation>
    </div>
  );
};

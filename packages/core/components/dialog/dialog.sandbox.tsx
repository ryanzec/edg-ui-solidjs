import Button, { ButtonVariant, ButtonColor } from '$/core/components/button';
import Dialog from '$/core/components/dialog';
import { dialogComponentUtils } from '$/core/components/dialog/utils';
import { asyncUtils } from '$/core/utils/async';
import { loggerUtils } from '$/core/utils/logger';
import { createSignal } from 'solid-js';

export default {
  title: 'Components/Dialog',
};

export const Default = () => {
  const dialogStore = dialogComponentUtils.createStore();

  return (
    <div>
      <Button onclick={dialogStore.open}>Toggle Dialog</Button>
      <Dialog
        dialogStore={dialogStore}
        headerElement="Header"
        footerElement={
          <Button.Group>
            <Button variant={ButtonVariant.GHOST} onClick={() => dialogStore.close()}>
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
  const dialogStore = dialogComponentUtils.createStore();

  return (
    <div>
      <Button onclick={dialogStore.open}>Toggle Dialog</Button>
      <Dialog
        dialogStore={dialogStore}
        headerElement="Header"
        closeOnClickOverlay
        footerElement={
          <Button.Group>
            <Button variant={ButtonVariant.GHOST} onClick={() => dialogStore.close()}>
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
  const dialogStore = dialogComponentUtils.createStore();

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
      <Button onclick={dialogStore.open}>Delete</Button>
      <Dialog.DeleteConfirmation
        dialogStore={dialogStore}
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
  const dialogStore = dialogComponentUtils.createStore();
  const [isProcessing, setIsProcessing] = createSignal(false);

  const processConfirmation = async () => {
    console.log('confirm');

    setIsProcessing(true);
    await asyncUtils.sleep(1000);
    setIsProcessing(false);

    dialogStore.close();
  };

  return (
    <div>
      <Button onclick={dialogStore.open}>Confirm</Button>
      <Dialog.Confirmation
        dialogStore={dialogStore}
        processConfirmation={processConfirmation}
        isProcessing={isProcessing()}
        headerElement="Confirm"
      >
        Are you sure you want to confirm?
      </Dialog.Confirmation>
    </div>
  );
};

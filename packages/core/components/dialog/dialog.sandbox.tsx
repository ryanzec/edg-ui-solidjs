import Button, { ButtonVariant, ButtonColor } from '$/core/components/button';
import Dialog from '$/core/components/dialog';
import type { DialogComponentApi } from '$/core/components/dialog/utils';
import { componentApiStoreUtils } from '$/core/stores/component-api.store';
import { asyncUtils } from '$/core/utils/async';
import { loggerUtils } from '$/core/utils/logger';
import { createSignal } from 'solid-js';

export default {
  title: 'Components/Dialog',
};

export const Default = () => {
  const dialogComponentApiStore = componentApiStoreUtils.createStore<DialogComponentApi>();

  return (
    <div>
      <Button onclick={dialogComponentApiStore.api()?.open}>Toggle Dialog</Button>
      <Dialog
        onReady={dialogComponentApiStore.onReady}
        onCleanup={dialogComponentApiStore.onCleanup}
        headerElement="Header"
        footerElement={
          <Button.Group>
            <Button variant={ButtonVariant.GHOST} onClick={() => dialogComponentApiStore.api()?.close()}>
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
  const dialogComponentApiStore = componentApiStoreUtils.createStore<DialogComponentApi>();

  return (
    <div>
      <Button onclick={dialogComponentApiStore.api()?.open}>Toggle Dialog</Button>
      <Dialog
        onReady={dialogComponentApiStore.onReady}
        onCleanup={dialogComponentApiStore.onCleanup}
        headerElement="Header"
        closeOnClickOverlay
        footerElement={
          <Button.Group>
            <Button variant={ButtonVariant.GHOST} onClick={() => dialogComponentApiStore.api()?.close()}>
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
  const dialogComponentApiStore = componentApiStoreUtils.createStore<DialogComponentApi>();

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
      <Button onclick={dialogComponentApiStore.api()?.open}>Delete</Button>
      <Dialog.DeleteConfirmation
        onReady={dialogComponentApiStore.onReady}
        onCleanup={dialogComponentApiStore.onCleanup}
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
  const dialogComponentApiStore = componentApiStoreUtils.createStore<DialogComponentApi>();
  const [isProcessing, setIsProcessing] = createSignal(false);

  const processConfirmation = async () => {
    console.log('confirm');

    setIsProcessing(true);
    await asyncUtils.sleep(1000);
    setIsProcessing(false);

    dialogComponentApiStore.api()?.close();
  };

  return (
    <div>
      <Button onclick={dialogComponentApiStore.api()?.open}>Confirm</Button>
      <Dialog.Confirmation
        onReady={dialogComponentApiStore.onReady}
        onCleanup={dialogComponentApiStore.onCleanup}
        processConfirmation={processConfirmation}
        isProcessing={isProcessing()}
        headerElement="Confirm"
      >
        Are you sure you want to confirm?
      </Dialog.Confirmation>
    </div>
  );
};

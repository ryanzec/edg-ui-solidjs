import Button, { ButtonVariant, ButtonColor } from '$/core/components/button';
import Dialog from '$/core/components/dialog/index';
import { dialogComponentUtils } from '$/core/components/dialog/utils';
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

type Item = {
  id: string;
  name: string;
};

const item: Item = {
  id: '1',
  name: 'test',
};

export const DeleteConfirmation = () => {
  const dialogStore = dialogComponentUtils.createStore();
  const [isProcessing, setIsProcessing] = createSignal(false);

  const handleToggleProcessing = () => {
    setIsProcessing(!isProcessing());
  };

  const processDelete = (item: Item) => {
    console.log('delete', item);
    dialogStore.close();
  };

  return (
    <div>
      <Button onclick={dialogStore.open}>Toggle Dialog</Button>
      <Dialog.DeleteConfirmation
        dialogStore={dialogStore}
        selectedItem={item}
        processDelete={processDelete}
        headerElement="Really Delete?"
        messageElement={
          <div>
            Really, are you sure you want to delete?
            <Button data-id="toggle-processing" onclick={handleToggleProcessing}>
              Toggle Processing ({isProcessing() ? 'ON' : 'OFF'})
            </Button>
          </div>
        }
        isProcessing={isProcessing()}
      />
    </div>
  );
};

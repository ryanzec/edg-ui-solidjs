import Button, { ButtonColor, ButtonVariant } from '$/core/components/button';
import type { DialogProps } from '$/core/components/dialog/dialog';
import Dialog, { defaultDialogProps } from '$/core/components/dialog/index';
import type { DialogStore } from '$/core/components/dialog/utils';
import { type JSX, mergeProps, splitProps } from 'solid-js';

export type DialogDeleteConfirmationProps<TItem> = Omit<
  DialogProps,
  'footerElement' | 'closeOnEscape' | 'closeOnClickOverlay'
> & {
  selectedItem: TItem;
  dialogStore: DialogStore;
  processDelete: (item: TItem) => void;
  messageElement: JSX.Element;
  isProcessing: boolean;
};

const DialogDeleteConfirmation = <TItem,>(passedProp: DialogDeleteConfirmationProps<TItem>) => {
  const [props, restOfProps] = splitProps(mergeProps({ isProcessing: false }, passedProp), [
    'selectedItem',
    'dialogStore',
    'processDelete',
    'messageElement',
    'isProcessing',
  ]);

  const handleDelete = () => {
    props.processDelete(props.selectedItem);
  };

  return (
    <Dialog
      {...restOfProps}
      dialogStore={props.dialogStore}
      closeEnabled={props.isProcessing ? false : defaultDialogProps.closeEnabled}
      footerElement={
        <Button.Group>
          <Button
            disabled={props.isProcessing}
            onClick={props.dialogStore.close}
            color={ButtonColor.NEUTRAL}
            variant={ButtonVariant.GHOST}
          >
            Cancel
          </Button>
          <Button disabled={props.isProcessing} onClick={handleDelete} color={ButtonColor.DANGER}>
            Delete
          </Button>
        </Button.Group>
      }
    >
      {props.messageElement}
    </Dialog>
  );
};

export default DialogDeleteConfirmation;

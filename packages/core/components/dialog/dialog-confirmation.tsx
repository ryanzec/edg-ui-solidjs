import Button, { ButtonColor, ButtonVariant } from '$/core/components/button';
import Dialog, { defaultDialogProps, type DialogProps } from '$/core/components/dialog/dialog';
import type { DialogStore } from '$/core/components/dialog/utils';
import { mergeProps } from 'solid-js';
export type DialogConfirmationProps = Omit<DialogProps, 'footerElement' | 'closeOnEscape' | 'closeOnOverlayClick'> & {
  dialogStore: DialogStore;
  processConfirmation: () => Promise<void> | void;
  isProcessing?: boolean;
  confirmationText?: string;
  confirmationColor?: ButtonColor;
  cancelText?: string;
};

const DialogConfirmation = (passedProps: DialogConfirmationProps) => {
  const props = mergeProps(
    { isProcessing: false, confirmationText: 'Confirm', cancelText: 'Cancel', confirmationColor: ButtonColor.BRAND },
    passedProps,
  );

  const handleCloseDialog = () => {
    props.dialogStore.close();
  };

  return (
    <Dialog
      dialogStore={props.dialogStore}
      // it is only when processing do we want to override default closing functionality
      closeEnabled={props.isProcessing ? false : defaultDialogProps.closeEnabled}
      headerElement={props.headerElement}
      footerElement={
        <Button.Group>
          <Button
            disabled={props.isProcessing}
            color={ButtonColor.NEUTRAL}
            variant={ButtonVariant.GHOST}
            onClick={handleCloseDialog}
          >
            {props.cancelText}
          </Button>
          <Button disabled={props.isProcessing} color={props.confirmationColor} onClick={props.processConfirmation}>
            {props.confirmationText}
          </Button>
        </Button.Group>
      }
    >
      {props.children}
    </Dialog>
  );
};

export default DialogConfirmation;

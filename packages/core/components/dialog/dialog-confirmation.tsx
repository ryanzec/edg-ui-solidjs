import Button, { ButtonColor, ButtonVariant } from '$/core/components/button';
import Dialog, { defaultDialogProps, type DialogProps } from '$/core/components/dialog/dialog';
import type { DialogComponentApi } from '$/core/components/dialog/utils';
import { mergeProps } from 'solid-js';

export type DialogConfirmationProps = Omit<DialogProps, 'footerElement' | 'closeOnEscape' | 'closeOnOverlayClick'> & {
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

  let dialogComponentApi: DialogComponentApi | undefined = undefined;

  const handleCloseDialog = () => {
    dialogComponentApi?.close();
  };

  const handleReady = (componentApi: DialogComponentApi) => {
    dialogComponentApi = componentApi;
    props.onReady?.(componentApi);
  };

  const handleCleanup = () => {
    dialogComponentApi = undefined;
    props.onCleanup?.();
  };

  return (
    <Dialog
      onReady={handleReady}
      onCleanup={handleCleanup}
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

import Button, { ButtonColor, ButtonVariant } from '$/core/components/button';
import Dialog, { defaultDialogProps, type DialogProps } from '$/core/components/dialog/dialog';
import { mergeProps, splitProps } from 'solid-js';

export type DialogConfirmationProps = Omit<DialogProps, 'footerElement' | 'closeOnEscape' | 'closeOnOverlayClick'> & {
  processConfirmation: () => Promise<void> | void;
  isProcessing?: boolean;
  confirmationText?: string;
  confirmationColor?: ButtonColor;
  cancelText?: string;
};

const DialogConfirmation = (passedProps: DialogConfirmationProps) => {
  const [props, restOfProps] = splitProps(
    mergeProps(
      { isProcessing: false, confirmationText: 'Confirm', cancelText: 'Cancel', confirmationColor: ButtonColor.BRAND },
      passedProps,
    ),
    ['isProcessing', 'confirmationText', 'cancelText', 'confirmationColor', 'processConfirmation'],
  );

  const handleCloseDialog = () => {
    restOfProps.dialogComponentRef.api()?.close();
  };

  return (
    <Dialog
      // it is only when processing do we want to override default closing functionality
      {...restOfProps}
      closeEnabled={props.isProcessing ? false : defaultDialogProps.closeEnabled}
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
    />
  );
};

export default DialogConfirmation;

import Button, { ButtonColor, ButtonVariant } from '$/core/components/button';
import Dialog, { type DialogProps } from '$/core/components/dialog';

export type UnsavedChangesDialogProps = Pick<DialogProps, 'onReady' | 'onCleanup'> & {
  onLeave: () => void;
  onStay: () => void;
};

const UnsavedChangesDialog = (props: UnsavedChangesDialogProps) => {
  return (
    <Dialog
      onReady={props.onReady}
      onCleanup={props.onCleanup}
      headerElement="Unsaved Changes"
      footerElement={
        <Button.Group>
          <Button variant={ButtonVariant.GHOST} onClick={props.onLeave}>
            Leave
          </Button>
          <Button color={ButtonColor.BRAND} onClick={props.onStay}>
            Continue Editing
          </Button>
        </Button.Group>
      }
    >
      <div>You have unsaved changes, leaving this page will discard those changes.</div>
      <div>Are you sure you want to leave?</div>
    </Dialog>
  );
};

export default UnsavedChangesDialog;

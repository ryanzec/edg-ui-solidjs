import type { Navigator } from '@solidjs/router';
import { createSignal, onCleanup } from 'solid-js';
import Button, { ButtonColor, ButtonVariant } from '$/core/components/button';
import Dialog, { type DialogProps } from '$/core/components/dialog';
import type { UnsavedChangesDialogComponentRef } from '$/core/components/unsaved-changes-dialog/utils';
import type { ComponentRef } from '$/core/stores/component-ref';
import { loggerUtils } from '$/core/utils/logger';

export type UnsavedChangesDialogProps = Pick<DialogProps, 'dialogComponentRef'> & {
  unsavedChangesDialogComponentRef: ComponentRef<UnsavedChangesDialogComponentRef>;
  navigate: Navigator;
};

const UnsavedChangesDialog = (props: UnsavedChangesDialogProps) => {
  const [redirectUrl, setRedirectUrl] = createSignal<string>('');
  const [allowLeave, setAllowLeave] = createSignal<boolean>(false);

  const handleUnsavedDialogLeave = () => {
    const currentLeaveUrl = redirectUrl();

    if (currentLeaveUrl === undefined) {
      loggerUtils.error('no attempted leave url found which should never happen');
      props.dialogComponentRef.api()?.close();

      return;
    }

    setAllowLeave(true);
    props.navigate(currentLeaveUrl);
  };

  const handleUnsavedDialogStay = () => {
    props.dialogComponentRef.api()?.close();
  };

  const unsavedChangesDialogComponentRef: UnsavedChangesDialogComponentRef = {
    redirectUrl,
    setRedirectUrl,
    allowLeave,
    setAllowLeave,
  };

  props.unsavedChangesDialogComponentRef?.onReady(unsavedChangesDialogComponentRef);

  onCleanup(() => {
    props.unsavedChangesDialogComponentRef?.onCleanup();
  });

  return (
    <Dialog
      dialogComponentRef={props.dialogComponentRef}
      headerElement="Unsaved Changes"
      footerElement={
        <Button.Group>
          <Button variant={ButtonVariant.GHOST} onClick={handleUnsavedDialogLeave}>
            Leave
          </Button>
          <Button color={ButtonColor.BRAND} onClick={handleUnsavedDialogStay}>
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

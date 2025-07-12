import Button from '$/core/components/button';
import type { DialogComponentRef } from '$/core/components/dialog';
import UnsavedChangesDialog, { type UnsavedChangesDialogComponentRef } from '$/core/components/unsaved-changes-dialog';
import { createComponentRef } from '$/core/stores/component-ref';
import SandboxExamplesContainer from '$sandbox/components/sandbox-examples-container/sandbox-examples-container';

export default {
  title: 'Components/UnsavedChangesDialog',
};

const mockNavigate = (url: string | number) => {
  console.log('Navigate to:', url);
};

export const Default = () => {
  const dialogComponentRef = createComponentRef<DialogComponentRef>();
  const unsavedChangesDialogComponentRef = createComponentRef<UnsavedChangesDialogComponentRef>({
    onReady: (componentRef) => {
      componentRef.setRedirectUrl('/home');
    },
  });

  return (
    <>
      <Button onclick={() => dialogComponentRef.api()?.open()}>Open Dialog</Button>
      <SandboxExamplesContainer>
        <UnsavedChangesDialog
          dialogComponentRef={dialogComponentRef}
          unsavedChangesDialogComponentRef={unsavedChangesDialogComponentRef}
          navigate={mockNavigate}
        />
      </SandboxExamplesContainer>
    </>
  );
};

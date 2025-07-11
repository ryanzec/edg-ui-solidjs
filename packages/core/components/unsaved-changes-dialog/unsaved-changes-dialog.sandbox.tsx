import Button from '$/core/components/button';
import type { DialogComponentRef } from '$/core/components/dialog';
import UnsavedChangesDialog from '$/core/components/unsaved-changes-dialog';
import { createComponentRef } from '$/core/stores/component-ref';
import SandboxExamplesContainer from '$sandbox/components/sandbox-examples-container/sandbox-examples-container';

export default {
  title: 'Components/UnsavedChangesDialog',
};

export const Default = () => {
  const dialogComponentRef = createComponentRef<DialogComponentRef>();

  const handleLeave = () => {
    console.log('Leave');
    dialogComponentRef.api()?.close();
  };

  const handleStay = () => {
    console.log('Stay');
    dialogComponentRef.api()?.close();
  };

  return (
    <>
      <Button onclick={() => dialogComponentRef.api()?.open()}>Open Dialog</Button>
      <SandboxExamplesContainer>
        <UnsavedChangesDialog dialogComponentRef={dialogComponentRef} onLeave={handleLeave} onStay={handleStay} />
      </SandboxExamplesContainer>
    </>
  );
};

import Button from '$/core/components/button';
import type { DialogComponentApi } from '$/core/components/dialog';
import UnsavedChangesDialog from '$/core/components/unsaved-changes-dialog';
import { componentApiStoreUtils } from '$/core/stores/component-api.store';
import SandboxExamplesContainer from '$sandbox/components/sandbox-examples-container/sandbox-examples-container';

export default {
  title: 'Components/UnsavedChangesDialog',
};

export const Default = () => {
  const dialogComponentApiUtils = componentApiStoreUtils.createStore<DialogComponentApi>();

  const handleLeave = () => {
    console.log('Leave');
    dialogComponentApiUtils.api()?.close();
  };

  const handleStay = () => {
    console.log('Stay');
    dialogComponentApiUtils.api()?.close();
  };

  return (
    <>
      <Button onclick={() => dialogComponentApiUtils.api()?.open()}>Open Dialog</Button>
      <SandboxExamplesContainer>
        <UnsavedChangesDialog
          onReady={dialogComponentApiUtils.onReady}
          onCleanup={dialogComponentApiUtils.onCleanup}
          onLeave={handleLeave}
          onStay={handleStay}
        />
      </SandboxExamplesContainer>
    </>
  );
};

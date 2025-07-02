import Button from '$/core/components/button';
import { dialogComponentUtils } from '$/core/components/dialog/utils';
import UnsavedChangesDialog from '$/core/components/unsaved-changes-dialog';
import SandboxExamplesContainer from '$sandbox/components/sandbox-examples-container/sandbox-examples-container';

export default {
  title: 'Components/UnsavedChangesDialog',
};

export const Default = () => {
  const dialogStore = dialogComponentUtils.createStore();

  const handleLeave = () => {
    console.log('Leave');
    dialogStore.close();
  };

  const handleStay = () => {
    console.log('Stay');
    dialogStore.close();
  };

  return (
    <>
      <Button onclick={dialogStore.open}>Open Dialog</Button>
      <SandboxExamplesContainer>
        <UnsavedChangesDialog dialogStore={dialogStore} onLeave={handleLeave} onStay={handleStay} />
      </SandboxExamplesContainer>
    </>
  );
};

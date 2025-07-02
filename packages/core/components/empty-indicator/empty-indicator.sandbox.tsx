import EmptyIndicator from '$/core/components/empty-indicator';
import SandboxExamplesContainer from '$sandbox/components/sandbox-examples-container/sandbox-examples-container';

export default {
  title: 'Components/EmptyIndicator',
};

export const Default = () => {
  const handleTriggerAction = () => {
    console.log('action triggered');
  };

  return (
    <SandboxExamplesContainer>
      <EmptyIndicator label="This is the label" actionLabel="Some Action" onTriggerAction={handleTriggerAction} />
    </SandboxExamplesContainer>
  );
};

export const NoBorder = () => {
  const handleTriggerAction = () => {
    console.log('action triggered');
  };

  return (
    <SandboxExamplesContainer>
      <EmptyIndicator
        label="This is the label"
        actionLabel="Some Action"
        onTriggerAction={handleTriggerAction}
        noBorder
      />
    </SandboxExamplesContainer>
  );
};

export const NoAction = () => {
  return (
    <SandboxExamplesContainer>
      <EmptyIndicator label="This is the label" />
    </SandboxExamplesContainer>
  );
};

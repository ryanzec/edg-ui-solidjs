import ErrorIndicator from '$/core/components/error-indicator';
import SandboxExamplesContainer from '$sandbox/components/sandbox-examples-container/sandbox-examples-container';

export default {
  title: 'Components/ErrorIndicator',
};

export const Default = () => {
  const handleTriggerAction = () => {
    console.log('action triggered');
  };

  return (
    <SandboxExamplesContainer>
      <ErrorIndicator label="This is the label." actionLabel="Some Action" onTriggerAction={handleTriggerAction} />
    </SandboxExamplesContainer>
  );
};

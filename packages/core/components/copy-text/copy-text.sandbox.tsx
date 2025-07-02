import CopyText from '$/core/components/copy-text';
import SandboxExamplesContainer from '$sandbox/components/sandbox-examples-container/sandbox-examples-container';

export default {
  title: 'Components/CopyText',
};

export const Basic = () => {
  return (
    <SandboxExamplesContainer>
      <SandboxExamplesContainer>
        <div class="flex items-center gap-2xs">
          Text to copy <CopyText text="Text to copy" />
        </div>
      </SandboxExamplesContainer>
    </SandboxExamplesContainer>
  );
};

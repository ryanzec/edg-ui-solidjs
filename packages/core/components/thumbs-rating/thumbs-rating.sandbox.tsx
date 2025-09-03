import ThumbsRating from '$/core/components/thumbs-rating';
import SandboxExamplesContainer from '$sandbox/components/sandbox-examples-container/sandbox-examples-container';

export default {
  title: 'Components/ThumbsRating',
};

export const Default = () => {
  return (
    <SandboxExamplesContainer>
      <ThumbsRating onSelectRating={console.log} />
    </SandboxExamplesContainer>
  );
};

export const WithCurrentRating = () => {
  return (
    <SandboxExamplesContainer>
      <ThumbsRating onSelectRating={console.log} currentRating={1} />
      <ThumbsRating onSelectRating={console.log} currentRating={-1} />
    </SandboxExamplesContainer>
  );
};

export const CanChange = () => {
  return (
    <SandboxExamplesContainer>
      <ThumbsRating onSelectRating={console.log} currentRating={1} canChange />
      <ThumbsRating onSelectRating={console.log} currentRating={-1} canChange />
    </SandboxExamplesContainer>
  );
};

export const Processing = () => {
  return (
    <SandboxExamplesContainer>
      <ThumbsRating onSelectRating={console.log} currentRating={1} canChange isProcessing />
      <ThumbsRating onSelectRating={console.log} currentRating={-1} canChange isProcessing />
    </SandboxExamplesContainer>
  );
};

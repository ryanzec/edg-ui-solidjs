import EllipsisText from '$/core/components/ellipsis-text';
import SandboxExamplesContainer from '$sandbox/components/sandbox-examples-container/sandbox-examples-container';

export default {
  title: 'Components/EllipsisText',
};

export const NoEllipsis = () => {
  return (
    <SandboxExamplesContainer>
      <EllipsisText text="This is a long text that will be truncated" />
    </SandboxExamplesContainer>
  );
};

export const EllipsisSingleLine = () => {
  return (
    <SandboxExamplesContainer>
      <div class="w-[50px]">
        <EllipsisText class="line-clamp-1" text="This is a long text that will be truncated" />
      </div>
    </SandboxExamplesContainer>
  );
};

export const EllipsisMultiLine = () => {
  return (
    <SandboxExamplesContainer>
      <div class="w-[50px]">
        <EllipsisText class="line-clamp-3" text="This is a long text that will be truncated" />
      </div>
    </SandboxExamplesContainer>
  );
};

export const TooltipSignleLine = () => {
  return (
    <SandboxExamplesContainer>
      <div class="w-[50px]">
        <EllipsisText.Tooltip
          class="line-clamp-1"
          text="This is a long text that will be truncated"
          tooltipContent="This is a tooltip"
        />
      </div>
    </SandboxExamplesContainer>
  );
};

export const TooltipMultipleLines = () => {
  return (
    <SandboxExamplesContainer>
      <div class="w-[50px]">
        <EllipsisText.Tooltip
          class="line-clamp-3"
          text="This is a long text that will be truncated"
          tooltipContent="This is a tooltip"
        />
      </div>
    </SandboxExamplesContainer>
  );
};

import { DateTime } from 'luxon';
import DataUpdatedIndicator from '$/core/components/data-updated-indicator';
import SandboxExamplesContainer from '$sandbox/components/sandbox-examples-container/sandbox-examples-container';

export default {
  title: 'Components/DataUpdatedIndicator',
};

export const Default = () => {
  return (
    <SandboxExamplesContainer>
      <DataUpdatedIndicator lastUpdatedAt={DateTime.now()} />
    </SandboxExamplesContainer>
  );
};

export const Live = () => {
  return (
    <SandboxExamplesContainer>
      <DataUpdatedIndicator lastUpdatedAt={DateTime.now()} isLive />
    </SandboxExamplesContainer>
  );
};

export const Refreshing = () => {
  return (
    <SandboxExamplesContainer>
      <DataUpdatedIndicator lastUpdatedAt={DateTime.now()} isRefreshing />
    </SandboxExamplesContainer>
  );
};

export const LiveRefreshing = () => {
  return (
    <SandboxExamplesContainer>
      <DataUpdatedIndicator lastUpdatedAt={DateTime.now()} isLive isRefreshing />
    </SandboxExamplesContainer>
  );
};

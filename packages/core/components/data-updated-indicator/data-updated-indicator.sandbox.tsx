import dayjs from 'dayjs';
import DataUpdatedIndicator from '$/core/components/data-updated-indicator';
import { dateUtils } from '$/core/utils/date';
import SandboxExamplesContainer from '$sandbox/components/sandbox-examples-container/sandbox-examples-container';

export default {
  title: 'Components/DataUpdatedIndicator',
};

export const Default = () => {
  return (
    <SandboxExamplesContainer>
      <DataUpdatedIndicator lastUpdatedAt={dayjs().toISOString()} />
    </SandboxExamplesContainer>
  );
};

export const Live = () => {
  return (
    <SandboxExamplesContainer>
      <DataUpdatedIndicator lastUpdatedAt={dayjs().toISOString()} isLive />
    </SandboxExamplesContainer>
  );
};

export const Refreshing = () => {
  return (
    <SandboxExamplesContainer>
      <DataUpdatedIndicator lastUpdatedAt={dayjs().toISOString()} isRefreshing />
    </SandboxExamplesContainer>
  );
};

export const LiveRefreshing = () => {
  return (
    <SandboxExamplesContainer>
      <DataUpdatedIndicator lastUpdatedAt={dayjs().toISOString()} isLive isRefreshing />
    </SandboxExamplesContainer>
  );
};

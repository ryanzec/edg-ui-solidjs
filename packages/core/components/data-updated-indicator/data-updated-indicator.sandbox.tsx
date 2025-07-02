import DataUpdatedIndicator from '$/core/components/data-updated-indicator';
import { dateUtils } from '$/core/utils/date';
import SandboxExamplesContainer from '$sandbox/components/sandbox-examples-container/sandbox-examples-container';

export default {
  title: 'Components/DataUpdatedIndicator',
};

export const Default = () => {
  return (
    <SandboxExamplesContainer>
      <DataUpdatedIndicator lastUpdatedAt={dateUtils.getDateWithConfiguredTimezone().toISOString()} />
    </SandboxExamplesContainer>
  );
};

export const Live = () => {
  return (
    <SandboxExamplesContainer>
      <DataUpdatedIndicator lastUpdatedAt={dateUtils.getDateWithConfiguredTimezone().toISOString()} isLive />
    </SandboxExamplesContainer>
  );
};

export const Refreshing = () => {
  return (
    <SandboxExamplesContainer>
      <DataUpdatedIndicator lastUpdatedAt={dateUtils.getDateWithConfiguredTimezone().toISOString()} isRefreshing />
    </SandboxExamplesContainer>
  );
};

export const LiveRefreshing = () => {
  return (
    <SandboxExamplesContainer>
      <DataUpdatedIndicator
        lastUpdatedAt={dateUtils.getDateWithConfiguredTimezone().toISOString()}
        isLive
        isRefreshing
      />
    </SandboxExamplesContainer>
  );
};

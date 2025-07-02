import DateTime from '$/core/components/date-time';
import { TimeFormat, dateUtils } from '$/core/utils/date';
import SandboxExamplesContainer from '$sandbox/components/sandbox-examples-container/sandbox-examples-container';
export default {
  title: 'Components/DateTime',
};

export const Default = () => {
  console.log('dayjs');
  const date = dateUtils.getDateWithConfiguredTimezone();

  return (
    <SandboxExamplesContainer>
      <DateTime date={date} />
      <DateTime date={date} timeFormat={TimeFormat.STANDARD} />
    </SandboxExamplesContainer>
  );
};

export const TimeZone = () => {
  const dateString = '2020-12-31T23:00:00-04:00';
  const date = dateUtils.getDateWithConfiguredTimezone(dateString);

  return (
    <SandboxExamplesContainer>
      <div>
        date string used: {dateString}
        <DateTime date={date} />
      </div>
    </SandboxExamplesContainer>
  );
};

export const FromNow = () => {
  const date = dateUtils.getDateWithConfiguredTimezone().subtract(1, 'day');

  return (
    <SandboxExamplesContainer>
      <DateTime.FromNow date={date} />
    </SandboxExamplesContainer>
  );
};

export const Tooltip = () => {
  const date = dateUtils.getDateWithConfiguredTimezone().subtract(1, 'day');

  return (
    <SandboxExamplesContainer>
      <DateTime.Tooltip date={date} showTimezone={false} />
    </SandboxExamplesContainer>
  );
};

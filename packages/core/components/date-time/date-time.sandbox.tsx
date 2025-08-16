import dayjs from 'dayjs';
import DateTime from '$/core/components/date-time';
import { dateUtils, TimeFormat } from '$/core/utils/date';
import SandboxExamplesContainer from '$sandbox/components/sandbox-examples-container/sandbox-examples-container';
export default {
  title: 'Components/DateTime',
};

export const Default = () => {
  const date = dayjs();
  const invalidDate = dayjs('invalid');

  return (
    <SandboxExamplesContainer>
      <DateTime date={date} />
      <DateTime date={date} timeFormat={TimeFormat.STANDARD} />
    </SandboxExamplesContainer>
  );
};

export const TimeZone = () => {
  const dateString = '2020-12-31T23:00:00-04:00';
  const date = dayjs(dateString);
  const invalidDate = dayjs('invalid');

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
  const date = dayjs().subtract(1, 'day');
  const invalidDate = dayjs('invalid');

  return (
    <SandboxExamplesContainer>
      <DateTime.FromNow date={date} />
    </SandboxExamplesContainer>
  );
};

export const FromNowTooltip = () => {
  const date = dayjs().subtract(1, 'day');
  const invalidDate = dayjs('invalid');

  return (
    <SandboxExamplesContainer>
      <DateTime.FromNowTooltip date={date} />
    </SandboxExamplesContainer>
  );
};

export const Tooltip = () => {
  const date = dayjs().subtract(1, 'day');
  const invalidDate = dayjs('invalid');

  return (
    <SandboxExamplesContainer>
      <DateTime.Tooltip date={date} showTimezone={false} />
    </SandboxExamplesContainer>
  );
};

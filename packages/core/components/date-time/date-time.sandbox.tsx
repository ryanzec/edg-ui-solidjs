import { DateTime as LuxonDateTime } from 'luxon';
import DateTime from '$/core/components/date-time';
import { TimeFormat } from '$/core/utils/date';
import SandboxExamplesContainer from '$sandbox/components/sandbox-examples-container/sandbox-examples-container';
export default {
  title: 'Components/DateTime',
};

export const Default = () => {
  const date = LuxonDateTime.now();
  const invalidDate = LuxonDateTime.fromJSDate(new Date('invalid'));

  return (
    <SandboxExamplesContainer>
      <DateTime date={date} />
      <DateTime date={date} timeFormat={TimeFormat.STANDARD} />
      <DateTime date={invalidDate} />
      <DateTime date={invalidDate} timeFormat={TimeFormat.STANDARD} />
    </SandboxExamplesContainer>
  );
};

export const FromDifferentTimeZone = () => {
  const dateString = '2020-12-31T23:00:00-04:00';
  const date = LuxonDateTime.fromJSDate(new Date(dateString));

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
  const date = LuxonDateTime.now().minus({ days: 1 });
  const invalidDate = LuxonDateTime.fromJSDate(new Date('invalid'));

  return (
    <SandboxExamplesContainer>
      <DateTime.FromNow date={date} />
      <DateTime.FromNow date={invalidDate} />
    </SandboxExamplesContainer>
  );
};

export const FromNowTooltip = () => {
  const date = LuxonDateTime.now().minus({ days: 1 });
  const invalidDate = LuxonDateTime.fromJSDate(new Date('invalid'));

  return (
    <SandboxExamplesContainer>
      <DateTime.FromNowTooltip date={date} />
      <DateTime.FromNowTooltip date={invalidDate} />
    </SandboxExamplesContainer>
  );
};

export const Tooltip = () => {
  const date = LuxonDateTime.now().minus({ days: 1 });
  const invalidDate = LuxonDateTime.fromJSDate(new Date('invalid'));

  return (
    <SandboxExamplesContainer>
      <DateTime.Tooltip date={date} showTimezone={false} />
      <DateTime.Tooltip date={invalidDate} showTimezone={false} />
    </SandboxExamplesContainer>
  );
};

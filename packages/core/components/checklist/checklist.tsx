import { For } from 'solid-js';
import Icon, { type IconName, IconSize } from '$/core/components/icon';
import Typography, { TypographyColor } from '$/core/components/typography';

export const ChecklistItemStatus = {
  COMPLETED: 'completed',
  INCOMPLETE: 'incomplete',
} as const;

export type ChecklistItemStatus = (typeof ChecklistItemStatus)[keyof typeof ChecklistItemStatus];

export type ChecklistItem = {
  label: string;
  status: ChecklistItemStatus;
};

export type ChecklistProps = {
  items: ChecklistItem[];
};

const statusIconMap: Record<ChecklistItemStatus, IconName> = {
  [ChecklistItemStatus.COMPLETED]: 'check',
  [ChecklistItemStatus.INCOMPLETE]: 'x',
};

const statusColorMap: Record<ChecklistItemStatus, TypographyColor> = {
  [ChecklistItemStatus.COMPLETED]: TypographyColor.SUCCESS,
  [ChecklistItemStatus.INCOMPLETE]: TypographyColor.DANGER,
};

const Checklist = (props: ChecklistProps) => {
  return (
    <div class="flex flex-col gap-3xs">
      <For each={props.items}>
        {(item) => (
          <Typography class="flex items-center gap-3xs" color={statusColorMap[item.status]}>
            <Icon icon={statusIconMap[item.status]} size={IconSize.LARGE} />
            <span>{item.label}</span>
          </Typography>
        )}
      </For>
    </div>
  );
};

export default Checklist;

import { For, type JSX, mergeProps, splitProps } from 'solid-js';
import Typography, { TypographySize } from '$/core/components/typography';
import type { CommonDataAttributes } from '$/core/types/generic';
import { tailwindUtils } from '$/core/utils/tailwind';

export type PageHeaderProps = Omit<JSX.HTMLAttributes<HTMLDivElement>, 'children>'> &
  CommonDataAttributes & {
    label: string;
    actionElements?: JSX.Element[];
  };

const PageHeader = (passedProps: PageHeaderProps) => {
  const [props, restOfProps] = splitProps(mergeProps({}, passedProps), ['label', 'class', 'actionElements']);

  return (
    <div data-id="header" class={tailwindUtils.merge('flex items-center gap-sm', props.class)} {...restOfProps}>
      <Typography size={TypographySize.EXTRA_LARGE}>{props.label}</Typography>
      <div class="flex items-center ml-auto gap-2xs font-semibold">
        <For each={props.actionElements}>
          {(actionElement) => {
            return actionElement;
          }}
        </For>
      </div>
    </div>
  );
};

export default PageHeader;

import type { ParentProps } from 'solid-js';

import classnames from 'classnames';
import { mergeProps, splitProps } from 'solid-js';

type SandboxExamplesContainerProps = ParentProps<{
  asRow?: boolean;
  class?: string;
  isFull?: boolean;
  withPureBackground?: boolean;
  withPadding?: boolean;
}>;

const SandboxExamplesContainer = (passedProps: SandboxExamplesContainerProps) => {
  const [props] = splitProps(
    mergeProps(
      {
        isFull: true,
        withPureBackground: false,
        withPadding: true,
      },
      passedProps,
    ),
    ['class', 'isFull', 'asRow', 'children', 'withPureBackground', 'withPadding'],
  );

  return (
    <div
      class={classnames('flex flex-col gap-base', props.class, {
        'flex-row': props.asRow,
        'w-full min-h-full': props.isFull,
        'bg-surface-pure': props.withPureBackground,
        'p-base': props.withPadding,
      })}
    >
      {props.children}
    </div>
  );
};

export default SandboxExamplesContainer;

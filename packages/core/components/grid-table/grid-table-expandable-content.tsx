import { tailwindUtils } from '$/core/utils/tailwind';
import { type JSX, Show, mergeProps } from 'solid-js';

export type GridTableExpandableRowContentProps = {
  isExpanded: boolean;
  columnCount: number;
  children: JSX.Element;
  isLastRow?: boolean;
};

const GridTableExpandableRowContent = (passedProps: GridTableExpandableRowContentProps) => {
  const props = mergeProps({ isLastRow: false }, passedProps);

  return (
    <Show when={props.isExpanded}>
      <div
        class={tailwindUtils.merge('px-lg py-base bg-surface-secondary  min-w-[1px] rounded-b-base', {
          'mb-2xs -mt-2xs': props.isLastRow === false,
        })}
        style={`grid-column: span ${props.columnCount};`}
      >
        {props.children}
      </div>
    </Show>
  );
};

export default GridTableExpandableRowContent;

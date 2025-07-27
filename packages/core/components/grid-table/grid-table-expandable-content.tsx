import { type JSX, mergeProps, Show } from 'solid-js';
import { tailwindUtils } from '$/core/utils/tailwind';

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
        class={tailwindUtils.merge('px-lg py-base min-w-[1px] border-l border-r border-outline', {
          'border-b rounded-b-sm': props.isLastRow,
        })}
        style={`grid-column: span ${props.columnCount};`}
      >
        {props.children}
      </div>
    </Show>
  );
};

export default GridTableExpandableRowContent;

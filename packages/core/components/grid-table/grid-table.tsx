import GridTableFooter from '$/core/components/grid-table/grid-table-footer';
import { tailwindUtils } from '$/core/utils/tailwind';
import { type JSX, Show, mergeProps, splitProps } from 'solid-js';

export type GridTableProps = Omit<JSX.HTMLAttributes<HTMLDivElement>, 'role'> & {
  class?: string;
  children: JSX.Element;
  footerElement?: JSX.Element;
  role?: 'table' | 'row';
};

const defaultProps: Partial<GridTableProps> = {
  role: 'table',
};

const GridTable = (passedProps: GridTableProps) => {
  const [props, restOfProps] = splitProps(mergeProps(defaultProps, passedProps), [
    'class',
    'children',
    'footerElement',
    'role',
  ]);

  return (
    <>
      <div class={tailwindUtils.merge('grid', props.class)} role={props.role} {...restOfProps}>
        {props.children}
      </div>
      <Show when={props.footerElement}>
        <GridTableFooter>{props.footerElement}</GridTableFooter>
      </Show>
    </>
  );
};

export default GridTable;

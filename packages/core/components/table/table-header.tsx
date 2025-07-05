import { tailwindUtils } from '$/core/utils/tailwind';
import { type JSX, splitProps } from 'solid-js';

import styles from '$/core/components/table/table.module.css';
import type { CommonDataAttributes } from '$/core/types/generic';

export type TableHeaderProps = JSX.HTMLAttributes<HTMLTableCellElement> & CommonDataAttributes;

const TableHeader = (passedProps: TableHeaderProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['children', 'class']);

  return (
    <th data-id="header" {...restOfProps} class={tailwindUtils.merge(styles.tableHeader, props.class)}>
      {props.children}
    </th>
  );
};

export default TableHeader;

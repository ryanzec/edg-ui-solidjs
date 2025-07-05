import { tailwindUtils } from '$/core/utils/tailwind';
import { type JSX, splitProps } from 'solid-js';

import styles from '$/core/components/table/table.module.css';
import type { CommonDataAttributes } from '$/core/types/generic';

export type TableDataProps = JSX.HTMLAttributes<HTMLTableCellElement> & CommonDataAttributes;

const TableData = (passedProps: TableDataProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['children', 'class']);

  return (
    <td data-id="data" {...restOfProps} class={tailwindUtils.merge(styles.tableData, props.class)}>
      {props.children}
    </td>
  );
};

export default TableData;

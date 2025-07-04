import { tailwindUtils } from '$/core/utils/tailwind';
import { type JSX, Show, mergeProps, splitProps } from 'solid-js';

import Checkbox from '$/core/components/checkbox';
import TableData from '$/core/components/table/table-data';
import styles from '$/core/components/table/table.module.css';
import type { CommonDataAttributes } from '$/core/types/generic';

export type TableRowProps = JSX.HTMLAttributes<HTMLTableRowElement> &
  CommonDataAttributes & {
    isSelectable?: boolean;
    isSelected?: boolean;
    onSelected?: (id: string) => void;
    id?: string;
  };

const TableRow = (passedProps: TableRowProps) => {
  const [props, restOfProps] = splitProps(mergeProps({ isSelectable: false }, passedProps), [
    'children',
    'class',
    'isSelectable',
    'isSelected',
    'onSelected',
    'id',
  ]);

  const handleSelected = () => {
    if (!props.onSelected || !props.id) {
      return;
    }

    props.onSelected(props.id);
  };

  return (
    <tr
      data-id="row"
      {...restOfProps}
      class={tailwindUtils.merge(styles.tableRow, props.class, { [styles.tableRowIsSelected]: props.isSelected })}
    >
      <Show when={props.isSelectable}>
        {/* setting the width to 1px will make the table data element only take up the width of the content */}
        <TableData class={styles.tableCellSelectable}>
          <Checkbox
            checked={props.isSelected}
            name={`table-select-id-${props.id}`}
            value={props.id}
            onChange={handleSelected}
          />
        </TableData>
      </Show>
      {props.children}
    </tr>
  );
};

export default TableRow;

import classnames from 'classnames';
import { type JSX, Show, mergeProps, splitProps } from 'solid-js';

import ScrollArea from '$/core/components/scroll-area';
import styles from '$/core/components/table/table.module.css';
import { TableShape } from '$/core/components/table/utils';
import type { CommonDataAttributes } from '$/core/types/generic';

export type TableProps = JSX.HTMLAttributes<HTMLTableElement> &
  CommonDataAttributes & {
    hasFixedHeader?: boolean;
    shape?: TableShape;
    tableHead?: JSX.Element;
    tableFooter?: JSX.Element;
  };

const Table = (passedProps: TableProps) => {
  const [props, restOfProps] = splitProps(mergeProps({ hasFixedHeader: false }, passedProps), [
    'children',
    'class',
    'hasFixedHeader',
    'shape',
    'tableHead',
    'tableFooter',
  ]);

  return (
    <div
      class={classnames(styles.tableContainer, props.class, {
        [styles.tableRounded]: props.shape === TableShape.ROUNDED,
      })}
    >
      <div class={styles.innerContainer}>
        <ScrollArea class={styles.tableScrollArea}>
          <table data-id="table" {...restOfProps} class={classnames(styles.table, props.class)}>
            <Show when={props.tableHead}>
              <thead class={classnames({ [styles.tableHeadSticky]: props.hasFixedHeader })}>{props.tableHead}</thead>
            </Show>
            <tbody>{props.children}</tbody>
          </table>
          <Show when={props.tableFooter}>
            <div class={classnames(styles.tableFooter)}>{props.tableFooter}</div>
          </Show>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Table;

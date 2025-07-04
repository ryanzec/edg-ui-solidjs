import { tailwindUtils } from '$/core/utils/tailwind';
import { type JSX, Show, mergeProps, splitProps } from 'solid-js';

import styles from '$/core/components/list/list.module.css';
import type { CommonDataAttributes } from '$/core/types/generic';
import { Dynamic, type DynamicProps } from 'solid-js/web';

export type ListItemProps = Omit<DynamicProps<'button' | 'div', JSX.HTMLAttributes<HTMLDivElement>>, 'component'> &
  CommonDataAttributes & {
    isSelected?: boolean;
    isClickable?: boolean;
    isEndOfSection?: boolean;
    preElement?: JSX.Element;
  };

const ListItem = (passedProps: ListItemProps) => {
  const [props, restOfProps] = splitProps(mergeProps({ isSelected: false, isClickable: false }, passedProps), [
    'class',
    'children',
    'isSelected',
    'preElement',
    'isClickable',
    'onClick',
    'isEndOfSection',
  ]);

  const checkIsClickable = () => {
    return !!props.onClick || props.isClickable;
  };

  const elementType = () => {
    return checkIsClickable() ? 'button' : 'div';
  };

  const extraProps = () => {
    return checkIsClickable() ? { type: 'button' } : {};
  };

  return (
    <Dynamic
      data-id="list-item"
      {...extraProps()}
      {...restOfProps}
      component={elementType()}
      onClick={props.onClick}
      class={tailwindUtils.merge(styles.listItem, props.class, {
        [styles.selectedItem]: props.isSelected,
        [styles.isClickable]: checkIsClickable(),
        [styles.endOfSection]: props.isEndOfSection,
      })}
    >
      <Show when={props.preElement}>
        <span class={styles.preItem}>{props.preElement}</span>
      </Show>
      {props.children}
    </Dynamic>
  );
};

export default ListItem;

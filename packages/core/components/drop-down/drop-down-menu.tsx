import DropDown, { type DropDownProps } from '$/core/components/drop-down/drop-down';
import styles from '$/core/components/drop-down/drop-down.module.css';
import List from '$/core/components/list';
import ScrollArea from '$/core/components/scroll-area';
import { mergeProps } from 'solid-js';

export type DropDownMenuProps = Pick<
  DropDownProps,
  'handleElement' | 'handleClass' | 'contentElement' | 'contentClass' | 'store' | 'placement' | 'disabled' | 'class'
>;

const defaultProps: Omit<DropDownMenuProps, 'handleElement' | 'contentElement' | 'store'> = {
  placement: 'bottom-end',
  disabled: false,
  class: '',
};

export const DropDownMenu = (passedProps: DropDownMenuProps) => {
  const props = mergeProps(defaultProps, passedProps);

  return (
    <DropDown
      class={props.class}
      store={props.store}
      placement={props.placement}
      handleElement={props.handleElement}
      handleClass={props.handleClass}
      contentIsStyled={false}
      contentClass={props.contentClass}
      contentElement={
        <List class={styles.dropDownMenuContent}>
          <ScrollArea>{props.contentElement}</ScrollArea>
        </List>
      }
      disabled={props.disabled}
    />
  );
};

export default DropDownMenu;

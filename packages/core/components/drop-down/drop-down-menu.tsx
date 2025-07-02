import DropDown from '$/core/components/drop-down/drop-down';
import styles from '$/core/components/drop-down/drop-down.module.css';
import List from '$/core/components/list';
import ScrollArea from '$/core/components/scroll-area';
import type { TooltipStore } from '$/core/components/tooltip';
import type { Placement } from '@floating-ui/dom';
import { type JSX, mergeProps } from 'solid-js';

export type DropDownMenuProps = {
  handleElement: JSX.Element;
  contentElement: JSX.Element;
  store: TooltipStore;
  placement?: Placement;
  disabled?: boolean;
};

const defaultProps: Omit<DropDownMenuProps, 'handleElement' | 'contentElement' | 'store'> = {
  placement: 'bottom-end',
  disabled: false,
};

export const DropDownMenu = (passedProps: DropDownMenuProps) => {
  const props = mergeProps(defaultProps, passedProps);

  return (
    <DropDown
      store={props.store}
      placement={props.placement}
      handleElement={props.handleElement}
      contentIsStyled={false}
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

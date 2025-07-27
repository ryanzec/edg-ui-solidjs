import { mergeProps } from 'solid-js';
import DropDown, { type DropDownProps } from '$/core/components/drop-down/drop-down';
import styles from '$/core/components/drop-down/drop-down.module.css';
import List from '$/core/components/list';
import ScrollArea from '$/core/components/scroll-area';
import { tailwindUtils } from '$/core/utils/tailwind';

export type DropDownMenuProps = Pick<
  DropDownProps,
  | 'handleElement'
  | 'handleClass'
  | 'contentElement'
  | 'contentClass'
  | 'tooltipComponentRef'
  | 'placement'
  | 'disabled'
  | 'class'
  | 'offset'
>;

const defaultProps: Omit<DropDownMenuProps, 'handleElement' | 'contentElement' | 'tooltipComponentRef'> = {
  placement: 'bottom-end',
  disabled: false,
  class: '',
};

export const DropDownMenu = (passedProps: DropDownMenuProps) => {
  const props = mergeProps(defaultProps, passedProps);

  return (
    <DropDown
      class={props.class}
      tooltipComponentRef={props.tooltipComponentRef}
      placement={props.placement}
      offset={props.offset}
      handleElement={props.handleElement}
      handleClass={props.handleClass}
      contentIsStyled={false}
      contentClass={props.contentClass}
      contentElement={
        <List class={tailwindUtils.merge('w-full', styles.dropDownMenuContent)}>
          <ScrollArea>{props.contentElement}</ScrollArea>
        </List>
      }
      disabled={props.disabled}
    />
  );
};

export default DropDownMenu;

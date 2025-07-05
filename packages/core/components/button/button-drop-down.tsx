import type { Placement } from '@floating-ui/dom';
import { type JSX, mergeProps, splitProps } from 'solid-js';

import Button, { type ButtonProps } from '$/core/components/button/button';
import DropDown from '$/core/components/drop-down';
import Icon, { type IconName } from '$/core/components/icon';
import type { TooltipStore, TooltipTriggerEvent } from '$/core/components/tooltip';
import type { CommonDataAttributes } from '$/core/types/generic';

export type ButtonDropDownProps = ButtonProps &
  CommonDataAttributes & {
    label: string | JSX.Element;
    placement?: Placement;
    triggerEvent?: TooltipTriggerEvent;
    buttonClass?: string;
    contentClass?: string;
    tooltipStore: TooltipStore;
  };

const defaultProps: Omit<ButtonDropDownProps, 'label' | 'tooltipStore'> = {
  placement: 'bottom-end',
};

export const ButtonDropDown = (passedProps: ButtonDropDownProps) => {
  const [props, restOfProps] = splitProps(mergeProps(defaultProps, passedProps), [
    'label',
    'placement',
    'triggerEvent',
    'children',
    'class',
    'buttonClass',
    'contentClass',
    'tooltipStore',
  ]);

  const getIconName = (): IconName => {
    return props.tooltipStore.isShowing() ? 'caret-up' : 'caret-down';
  };

  return (
    <DropDown.Menu
      tooltipStore={props.tooltipStore}
      placement={props.placement}
      handleElement={
        <Button
          data-id="button-drop-down-trigger"
          {...restOfProps}
          class={props.class}
          postElement={<Icon icon={getIconName()} />}
        >
          {props.label}
        </Button>
      }
      contentElement={props.children}
    />
  );
};

export default ButtonDropDown;

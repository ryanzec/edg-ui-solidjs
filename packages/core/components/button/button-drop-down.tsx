import type { Placement } from '@floating-ui/dom';
import { type JSX, mergeProps, splitProps } from 'solid-js';

import Button, { type ButtonProps } from '$/core/components/button/button';
import DropDown from '$/core/components/drop-down';
import type { DropDownMenuProps } from '$/core/components/drop-down/drop-down-menu';
import Icon, { type IconName } from '$/core/components/icon';
import type { TooltipTriggerEvent } from '$/core/components/tooltip';
import type { CommonDataAttributes } from '$/core/types/generic';

export type ButtonDropDownProps = ButtonProps &
  Pick<DropDownMenuProps, 'tooltipComponentRef'> &
  CommonDataAttributes & {
    label: string | JSX.Element;
    placement?: Placement;
    triggerEvent?: TooltipTriggerEvent;
    buttonClass?: string;
    contentClass?: string;
  };

const defaultProps: Omit<ButtonDropDownProps, 'label' | 'tooltipComponentRef'> = {
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
    'tooltipComponentRef',
  ]);

  const getIconName = (): IconName => {
    return props.tooltipComponentRef.api()?.isShowing() ? 'caret-up' : 'caret-down';
  };

  return (
    <DropDown.Menu
      data-id="button-drop-down"
      tooltipComponentRef={props.tooltipComponentRef}
      placement={props.placement}
      handleElement={
        <Button data-id="handle" {...restOfProps} class={props.class} postElement={<Icon icon={getIconName()} />}>
          {props.label}
        </Button>
      }
      contentElement={props.children}
    />
  );
};

export default ButtonDropDown;

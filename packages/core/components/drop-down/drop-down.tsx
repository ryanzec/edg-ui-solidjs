import type { Placement } from '@floating-ui/dom';
import { type JSX, mergeProps, splitProps } from 'solid-js';
import Tooltip, { type TooltipProps } from '$/core/components/tooltip';

export type DropDownProps = Omit<TooltipProps, 'triggerEvent'> & {
  handleElement: JSX.Element;
  handleClass?: string;
  contentElement: JSX.Element;
  contentClass?: string;
  contentIsStyled?: boolean;
  disabled?: boolean;
};

const DropDown = (passedProps: DropDownProps) => {
  const [props, restOfProps] = splitProps(
    mergeProps({ placement: 'bottom-end' as Placement, contentIsStyled: true, disabled: false }, passedProps),
    ['handleElement', 'contentElement', 'contentIsStyled', 'disabled', 'handleClass', 'contentClass'],
  );
  return (
    <Tooltip data-id="drop-down" {...restOfProps} triggerEvent="click">
      <Tooltip.Handle data-id="handle" data-tooltip-enabled={props.disabled === false} class={props.handleClass}>
        {props.handleElement}
      </Tooltip.Handle>
      <Tooltip.Content data-id="content" isStyled={props.contentIsStyled} class={props.contentClass}>
        {props.contentElement}
      </Tooltip.Content>
    </Tooltip>
  );
};

export default DropDown;

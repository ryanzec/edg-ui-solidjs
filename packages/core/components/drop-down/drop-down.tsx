import Tooltip, { type TooltipProps } from '$/core/components/tooltip';
import type { Placement } from '@floating-ui/dom';
import { type JSX, mergeProps, splitProps } from 'solid-js';

export type DropDownProps = Omit<TooltipProps, 'triggerEvent'> & {
  handleElement: JSX.Element;
  contentElement: JSX.Element;
  contentIsStyled?: boolean;
  disabled?: boolean;
};

const DropDown = (passedProps: DropDownProps) => {
  const [props, restOfProps] = splitProps(
    mergeProps({ placement: 'bottom-end' as Placement, contentIsStyled: true, disabled: false }, passedProps),
    ['handleElement', 'contentElement', 'contentIsStyled', 'disabled'],
  );
  return (
    <Tooltip data-id="drop-down" {...restOfProps} triggerEvent="click">
      <Tooltip.Handle data-id="handle" data-tooltip-enabled={props.disabled === false}>
        {props.handleElement}
      </Tooltip.Handle>
      <Tooltip.Content data-id="content" isStyled={props.contentIsStyled}>
        {props.contentElement}
      </Tooltip.Content>
    </Tooltip>
  );
};

export default DropDown;

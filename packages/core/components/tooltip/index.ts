import { default as BaseTooltip, type TooltipProps } from '$/core/components/tooltip/tooltip';
import Content, { type TooltipContentProps } from '$/core/components/tooltip/tooltip-content';
import Handle, { type TooltipHandleProps } from '$/core/components/tooltip/tooltip-handle';

export { TooltipTriggerEvent } from '$/core/components/tooltip/utils';
export type { TooltipComponentRef } from '$/core/components/tooltip/utils';

export type { TooltipProps, TooltipHandleProps, TooltipContentProps };

export const Tooltip = Object.assign(BaseTooltip, { Handle, Content });

export default Tooltip;

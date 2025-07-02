import { default as BaseEllipsisText, type EllipsisTextProps } from '$/core/components/ellipsis-text/ellipsis-text';
import Tooltip, { type EllipsisTextTooltipProps } from '$/core/components/ellipsis-text/ellipsis-text-tooltip';

export type { EllipsisTextProps, EllipsisTextTooltipProps };

export const EllipsisText = Object.assign(BaseEllipsisText, {
  Tooltip,
});

export default EllipsisText;

import { type BadgeProps, default as BaseBadge } from '$/core/components/badge/badge';
import Group, { type BadgeGroupProps } from '$/core/components/badge/badge-group';

export type { BadgeProps, BadgeGroupProps };

export { BadgeColor, BadgeSize, BadgeVariant } from '$/core/components/badge/utils';

export const Badge = Object.assign(BaseBadge, { Group });

export default Badge;

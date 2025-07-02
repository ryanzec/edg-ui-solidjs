import { default as BaseIcon, type IconProps } from '$/core/components/icon/icon';
import Group, { type IconGroupProps } from '$/core/components/icon/icon-group';

export type { IconProps, IconGroupProps };

export { IconColor, IconSize, type IconName, IconVariant } from '$/core/components/icon/utils';

export const Icon = Object.assign(BaseIcon, { Group });

export default Icon;

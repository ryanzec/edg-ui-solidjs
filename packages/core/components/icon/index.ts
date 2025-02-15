import Icon, { type IconProps } from '$/core/components/icon/icon';
import Group, { type IconGroupProps } from '$/core/components/icon/icon-group';

export type { IconProps, IconGroupProps };

export { IconSize, IconColor } from '$/core/components/icon/utils';

export default Object.assign(Icon, { Group });

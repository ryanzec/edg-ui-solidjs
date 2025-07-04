import { default as BaseAvatar } from '$/core/components/avatar/avatar';
import Stack, { type AvatarStackProps } from '$/core/components/avatar/avatar-stack';
import User, { type AvatarUserProps } from '$/core/components/avatar/avatar-user';
import { type AvatarProps, AvatarSize } from '$/core/components/avatar/utils';

export type { AvatarProps, AvatarStackProps, AvatarUserProps };

export { AvatarSize };

export const Avatar = Object.assign(BaseAvatar, { Stack, User });

export default Avatar;

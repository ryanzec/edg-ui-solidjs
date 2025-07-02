import { type AvatarProps, default as BaseAvatar } from '$/core/components/avatar/avatar';
import Stack, { type AvatarStackProps } from '$/core/components/avatar/avatar-stack';
import User, { type AvatarUserProps } from '$/core/components/avatar/avatar-user';

export type { AvatarProps, AvatarStackProps, AvatarUserProps };

export const Avatar = Object.assign(BaseAvatar, { Stack, User });

export default Avatar;

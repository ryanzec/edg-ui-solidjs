import { createContext } from 'solid-js';
import type { TypographyProps } from '../typography';

export const AvatarSize = {
  SMALL: 'small',
  BASE: 'base',
  FILL: 'fill',
} as const;

export type AvatarSize = (typeof AvatarSize)[keyof typeof AvatarSize];

export type AvatarProps = TypographyProps & {
  src?: string;
  label?: string;
  count?: number;
  isClickable?: boolean;
  avatarSize?: AvatarSize;
};

export type AvatarStackContextData = {
  avatarSize?: AvatarProps['avatarSize'];
};

export const AvatarStackContext = createContext<AvatarStackContextData>();

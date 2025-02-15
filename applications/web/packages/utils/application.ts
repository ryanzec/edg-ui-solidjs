export const RoutePath = {
  LOGIN: '/login',
  HOME: '/home',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  USERS: '/users',
  ONBOARDING: '/onboarding',
  INVITE_AUTHENTICATE: '/invite-authenticate',
} as const;

export type RoutePath = (typeof RoutePath)[keyof typeof RoutePath];

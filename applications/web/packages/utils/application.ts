export const RoutePath = {
  LOGIN: '/login',
  HOME: '/home',
  USERS: '/users',
} as const;

export type RoutePath = (typeof RoutePath)[keyof typeof RoutePath];

export const applicationDataAttribute = {
  THEME: 'theme',
};

import { loggerUtils } from '$/core/utils/logger';

export const QueryKey = {
  USERS_GET_LIST: 'users-get-list',
} as const;

export type QueryKey = (typeof QueryKey)[keyof typeof QueryKey];

export const LocalStorageKey = {
  SESSION_USER: 'sessionUser',
  UI_THEME: 'uiTheme',
} as const;

export type LocalStorageKey = (typeof LocalStorageKey)[keyof typeof LocalStorageKey];

export const applicationDataAttribute = {
  THEME: 'theme',
};

export const ApplicationFeature = {} as const;

export type ApplicationFeature = (typeof ApplicationFeature)[keyof typeof ApplicationFeature];

const GlobalVariable = {
  BASE_API_URL: 'VITE_BASE_API_URL',
  POSTHOG_PUBLIC_KEY: 'VITE_POSTHOG_PUBLIC_KEY',
} as const;

export type GlobalVariable = (typeof GlobalVariable)[keyof typeof GlobalVariable];

export const getGlobalVariable = (globalVariable: GlobalVariable) => {
  const variable = import.meta.env[globalVariable];

  if (!variable) {
    loggerUtils.error(`global variable ${globalVariable} is not set`);

    return '';
  }

  return variable;
};

export const applicationConfiguration = {
  baseApiUrl: getGlobalVariable(GlobalVariable.BASE_API_URL),
  posthogPublicKey: getGlobalVariable(GlobalVariable.POSTHOG_PUBLIC_KEY),
};

export const QueryKey = {
  USERS_GET_LIST: 'user-get-list',
} as const;

export type QueryKey = (typeof QueryKey)[keyof typeof QueryKey];

export const LocalStorageKey = {
  SESSION_USER: 'sessionUser',
  UI_THEME: 'uiTheme',
} as const;

export type LocalStorageKey = (typeof LocalStorageKey)[keyof typeof LocalStorageKey];

export type ApplicationConfiguration = {
  baseApiUrl: string;
  baseWebsocketUrl: string;
};

export const applicationConfiguration: ApplicationConfiguration = {
  baseApiUrl: import.meta.env.VITE_BASE_API_URL,
  baseWebsocketUrl: import.meta.env.VITE_BASE_WEBSOCKET_URL,
};

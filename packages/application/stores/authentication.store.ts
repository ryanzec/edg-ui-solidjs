import { type Accessor, createRoot, createSignal } from 'solid-js';
import { authenticationApi } from '$/application/apis/authentication';
import { globalsStore } from '$/application/stores/globals.store';
import { LocalStorageKey } from '$/application/utils/application';
import { emailUtils } from '$/core/utils/email';
import { ErrorMessage } from '$/core/utils/error';
import { localStorageCacheUtils } from '$/core/utils/local-storage-cache';
import { loggerUtils } from '$/core/utils/logger';
import { userUtils } from '$api/data-models/user';
import type { AuthenticationAuthenticateRequest } from '$api/types/authentication';
import type { User, UserRoleName } from '$api/types/user';
import { featureFlagStore } from '$web/stores/feature-flag.store';
import { analyticsUtils } from '$web/utils/analytics';

export type SessionUser = {
  user: User;
};

export const LoginAction = {
  NONE: 'none',
  LOGIN: 'login',
  LOGOUT: 'logout',
  AUTHENTICATE: 'authenticate',
} as const;

export type LoginAction = (typeof LoginAction)[keyof typeof LoginAction];

type SendResetPasswordOption = {
  redirect?: boolean;
};

const defaultSendPasswordOption: SendResetPasswordOption = {
  redirect: true,
};

type StoreOptions = {
  homeRedirectRoute: string;
  loginRedirectRoute: string;
};

export type ApplicationStore = {
  sessionUser: Accessor<SessionUser | undefined>;
  isInitializing: Accessor<boolean>;
  isAuthenticated: Accessor<boolean>;
  currentLoginAction: Accessor<LoginAction>;
  loginError: Accessor<string[]>;
  login: (request: AuthenticationAuthenticateRequest) => Promise<void>;
  logout: () => Promise<void>;
  isProcessingLoginAction: () => boolean;
  initialize: (options: StoreOptions) => Promise<void>;
  hasRoles: (roles: UserRoleName[]) => boolean;
  clearErrors: () => void;
};

const createApplicationStore = (): ApplicationStore => {
  let storeOptions = {} as StoreOptions;

  const [sessionUser, setSessionUser] = createSignal<SessionUser>();
  const [isInitializing, setIsInitializing] = createSignal<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = createSignal<boolean>(false);
  const [currentLoginAction, setCurrentLoginAction] = createSignal<LoginAction>(LoginAction.NONE);
  const [loginError, setLoginError] = createSignal<string[]>([]);
  const [launchDarklyHash, setLaunchDarklyHash] = createSignal<string>();

  const handleAuthenticatedUser = (user?: User) => {
    let sessionUser: SessionUser | undefined = localStorageCacheUtils.get<SessionUser>(LocalStorageKey.SESSION_USER);

    // this means we are logging in and should override the session user and do initial setup work
    if (user) {
      sessionUser = {
        user,
      };

      localStorageCacheUtils.set<SessionUser>(LocalStorageKey.SESSION_USER, sessionUser);
    }

    if (!sessionUser?.user) {
      loggerUtils.error('handle authenticated user did not find the session user which really should not happen');

      handleNotAuthenticatedUser();

      return;
    }

    analyticsUtils.identifyUser(sessionUser.user.id, {
      organizationId: sessionUser.user.organizationId ?? '',
    });

    const currentLaunchDarklyHash = launchDarklyHash();

    if (currentLaunchDarklyHash) {
      featureFlagStore.initialize(
        {
          kind: 'multi',
          user: {
            key: sessionUser.user.id,
            emailDomain: emailUtils.getDomain(sessionUser.user.email),
          },
          organization: {
            key: sessionUser.user.organizationId,
          },
        },
        currentLaunchDarklyHash,
      );
    } else {
      loggerUtils.error({
        type: 'launchdarkly-hash-not-found',
        userId: sessionUser.user.id,
      });
    }

    setSessionUser(sessionUser);
    setIsAuthenticated(true);
  };

  const handleNotAuthenticatedUser = () => {
    setSessionUser(undefined);
    localStorageCacheUtils.remove(LocalStorageKey.SESSION_USER);
    setIsAuthenticated(false);
    setIsInitializing(false);
  };

  const initialize = async (options: StoreOptions) => {
    try {
      storeOptions = options;

      const sessionUser = localStorageCacheUtils.get<SessionUser>(LocalStorageKey.SESSION_USER);

      if (!sessionUser) {
        handleNotAuthenticatedUser();

        return;
      }

      const checkResponse = await authenticationApi.checkRaw();

      setLaunchDarklyHash(checkResponse.data?.launchDarklyHash);
      handleAuthenticatedUser();
    } catch (error: unknown) {
      // failure error is not an error, it just means we are not authenticated
      handleNotAuthenticatedUser();
    } finally {
      setIsInitializing(false);
    }
  };

  const login = async (requestData: AuthenticationAuthenticateRequest) => {
    try {
      setLoginError([]);
      setCurrentLoginAction(LoginAction.LOGIN);

      const authenticateResponse = await authenticationApi.authenticateRaw(requestData);

      if (!authenticateResponse.data) {
        loggerUtils.error(ErrorMessage.UNAUTHENTICATED);
        handleNotAuthenticatedUser();

        return;
      }

      const { user, launchDarklyHash } = authenticateResponse.data;

      setLaunchDarklyHash(launchDarklyHash);
      handleAuthenticatedUser(user);

      // @todo redirect to previously accessed page
      globalsStore.getNavigate()(storeOptions.homeRedirectRoute);
    } catch (error: unknown) {
      handleNotAuthenticatedUser();

      if (error instanceof Error) {
        const errorMessage = loggerUtils.getErrorInstanceMessage(error);

        loggerUtils.error(`error resetting password: ${errorMessage}`);

        setLoginError([errorMessage]);

        return;
      }

      setLoginError([ErrorMessage.UNAUTHENTICATED]);
    } finally {
      setCurrentLoginAction(LoginAction.NONE);
    }
  };

  const logout = async () => {
    try {
      setLoginError([]);
      setCurrentLoginAction(LoginAction.LOGOUT);

      await authenticationApi.logoutRaw();

      handleNotAuthenticatedUser();

      // incase the navigate is not available, we need to manually redirect
      if (!globalsStore.getNavigate()) {
        window.location.href = storeOptions.loginRedirectRoute;

        return;
      }

      globalsStore.getNavigate()(storeOptions.loginRedirectRoute);
    } finally {
      setCurrentLoginAction(LoginAction.NONE);
    }
  };

  const isProcessingLoginAction = () => {
    return currentLoginAction() !== LoginAction.NONE;
  };

  const hasRoles = (roles: UserRoleName[]) => {
    const currentSessionUser = sessionUser();

    if (!currentSessionUser?.user) {
      return false;
    }

    return userUtils.hasRoles(currentSessionUser.user, roles);
  };

  const clearErrors = () => {
    setLoginError([]);
  };

  return {
    sessionUser,
    isInitializing,
    isAuthenticated,
    currentLoginAction,
    isProcessingLoginAction,
    login,
    logout,
    initialize,
    loginError,
    hasRoles,
    clearErrors,
  };
};

const authenticationStore = createRoot(createApplicationStore);

export { authenticationStore };

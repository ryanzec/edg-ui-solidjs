import { authenticationApi } from '$/application/apis/authentication';
import { globalsStore } from '$/application/stores/globals.store';
import { LocalStorageKey } from '$/application/utils/application';
import { websocketManagerStore } from '$/core/stores/websocket-manager.store';
import { ErrorMessage } from '$/core/utils/error';
import { localStorageCacheUtils } from '$/core/utils/local-storage-cache';
import { loggerUtils } from '$/core/utils/logger';
import { userUtils } from '$api/data-models/user';
import type {
  AuthenticationAuthenticateRequest,
  AuthenticationResetPasswordRequest,
  AuthenticationSendResetPasswordRequest,
} from '$api/types/authentication';
import type { User, UserRoleName } from '$api/types/user';
import { type Accessor, createRoot, createSignal } from 'solid-js';
import type { Member as StytchMember, Organization as StytchOrganization } from 'stytch';

export type SessionUser = {
  user: User;
  organization: {
    id: string;
    name: string;
  };
};

export const LoginAction = {
  NONE: 'none',
  LOGIN: 'login',
  LOGOUT: 'logout',
  AUTHENTICATE: 'authenticate',
  RESET_PASSWORD: 'reset-password',
  SEND_RESET_PASSWORD: 'send-reset-password',
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
  resetPassword: (request: AuthenticationResetPasswordRequest, overrideRedirectRoute?: string) => Promise<void>;
  isProcessingLoginAction: () => boolean;
  sendResetPassword: (
    request: AuthenticationSendResetPasswordRequest,
    overrideOptions?: SendResetPasswordOption,
  ) => Promise<void>;
  initialize: (options: StoreOptions) => Promise<void>;
  authenticateInvite: (token: string) => Promise<void>;
  resetPasswordError: Accessor<string[]>;
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
  const [resetPasswordError, setResetPasswordError] = createSignal<string[]>([]);

  const handleAuthenticated = (member?: StytchMember, organization?: StytchOrganization) => {
    let sessionUser: SessionUser | undefined = localStorageCacheUtils.get<SessionUser>(LocalStorageKey.SESSION_USER);

    if (member && organization) {
      const user = userUtils.fromStytchMember(member);
      sessionUser = {
        user,
        organization: {
          id: organization.organization_id,
          name: organization.organization_name,
        },
      };

      localStorageCacheUtils.set<SessionUser>(LocalStorageKey.SESSION_USER, sessionUser);
    }

    setSessionUser(sessionUser);
    setIsAuthenticated(true);
    websocketManagerStore.connect();
  };

  const handleNotAuthenticated = () => {
    websocketManagerStore.disconnect();
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
        handleNotAuthenticated();

        return;
      }

      await authenticationApi.checkRaw();

      handleAuthenticated();
    } catch (error: unknown) {
      // failure error is not an error, it just means we are not authenticated
      handleNotAuthenticated();
    } finally {
      setIsInitializing(false);
    }
  };

  const login = async (formData: AuthenticationAuthenticateRequest) => {
    try {
      setLoginError([]);
      setCurrentLoginAction(LoginAction.LOGIN);

      const authenticateResponse = await authenticationApi.authenticateRaw({
        email: formData.email,
        password: formData.password,
      });

      if (!authenticateResponse.data) {
        loggerUtils.error(ErrorMessage.UNAUTHENTICATED);
        handleNotAuthenticated();

        return;
      }

      const { member, organization } = authenticateResponse.data;

      handleAuthenticated(member, organization);

      // @todo redirect to previously accessed page
      globalsStore.getNavigate()(storeOptions.homeRedirectRoute);
    } catch (error: unknown) {
      handleNotAuthenticated();

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
      setCurrentLoginAction(LoginAction.LOGOUT);

      const logout = authenticationApi.logout({
        onSuccess: async () => {
          handleNotAuthenticated();

          globalsStore.getNavigate()(storeOptions.loginRedirectRoute);
        },
      });

      // this is a little weird but a logout should be a DELETE since the request is actually deleting the session
      await logout.mutate(undefined);
    } finally {
      setCurrentLoginAction(LoginAction.NONE);
    }
  };

  const sendResetPassword = async (
    formData: AuthenticationSendResetPasswordRequest,
    overrideOptions: SendResetPasswordOption = {},
  ) => {
    try {
      const options = structuredClone(Object.assign({}, defaultSendPasswordOption, overrideOptions));

      setCurrentLoginAction(LoginAction.RESET_PASSWORD);

      const sendResetPassword = authenticationApi.sendResetPassword({
        onSuccess: async () => {
          if (options.redirect !== true) {
            return;
          }

          // @todo indicator that email should be sent if match email found
          globalsStore.getNavigate()(storeOptions.loginRedirectRoute);
        },
      });

      await sendResetPassword.mutate(formData);
    } finally {
      setCurrentLoginAction(LoginAction.NONE);
    }
  };

  const resetPassword = async (formData: AuthenticationResetPasswordRequest, overrideRedirectRoute?: string) => {
    const sendResetPassword = authenticationApi.resetPassword({
      onSuccess: async (mutateResponse) => {
        if (!mutateResponse.data) {
          loggerUtils.error(ErrorMessage.UNAUTHENTICATED);
          handleNotAuthenticated();

          globalsStore.getNavigate()(storeOptions.loginRedirectRoute);

          return;
        }

        const { member, organization } = mutateResponse.data;

        // while resetting the password might be done while the user is already authenticated, we want to process
        // the authentication response to make sure the user is properly updated
        handleAuthenticated(member, organization);

        globalsStore.getNavigate()(overrideRedirectRoute ?? storeOptions.homeRedirectRoute);
      },
      onError: (_mutateInput, error) => {
        if (error instanceof Error) {
          const errorMessage = loggerUtils.getErrorInstanceMessage(error);

          loggerUtils.error(`error resetting password: ${errorMessage}`);

          setResetPasswordError([errorMessage]);
          setCurrentLoginAction(LoginAction.NONE);

          return;
        }

        setResetPasswordError(['unknown error resetting password, try again']);
        setCurrentLoginAction(LoginAction.NONE);
      },
    });

    setResetPasswordError([]);
    setCurrentLoginAction(LoginAction.RESET_PASSWORD);

    await sendResetPassword.mutate(formData);

    setCurrentLoginAction(LoginAction.NONE);
  };

  const authenticateInvite = async (token: string) => {
    try {
      setCurrentLoginAction(LoginAction.AUTHENTICATE);

      const authenticateResponse = await authenticationApi.authenticateInviteRaw({
        token,
      });

      if (!authenticateResponse.data) {
        handleNotAuthenticated();

        globalsStore.getNavigate()(storeOptions.loginRedirectRoute);

        return;
      }

      const { member, organization } = authenticateResponse.data;

      handleAuthenticated(member, organization);

      globalsStore.getNavigate()(storeOptions.homeRedirectRoute);
    } finally {
      setCurrentLoginAction(LoginAction.NONE);
    }
  };

  const isProcessingLoginAction = () => {
    return currentLoginAction() !== LoginAction.NONE;
  };

  const hasRoles = (roleNames: UserRoleName[]) => {
    const currentSessionUser = sessionUser();

    if (!currentSessionUser?.user) {
      return false;
    }

    return userUtils.hasRoles(currentSessionUser.user, roleNames);
  };

  const clearErrors = () => {
    setLoginError([]);
    setResetPasswordError([]);
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
    resetPassword,
    sendResetPassword,
    loginError,
    authenticateInvite,
    resetPasswordError,
    hasRoles,
    clearErrors,
  };
};

const authenticationStore = createRoot(createApplicationStore);

export { authenticationStore };

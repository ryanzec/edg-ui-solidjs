import { A, type BeforeLeaveEventArgs, useBeforeLeave, useNavigate } from '@solidjs/router';
import { type JSX, Show, onCleanup, onMount } from 'solid-js';

import { authenticationStore } from '$/application/stores/authentication.store';
import { globalsStore } from '$/application/stores/globals.store';
import { themeManagerStore } from '$/application/stores/theme-manager.store';
import GlobalNotifications from '$/core/components/global-notifications';
import Loading from '$/core/components/loading';
import { globalNotificationsStore } from '$/core/stores/global-notifications.store';
import { type HttpRequest, httpUtils } from '$/core/utils/http';
import { userUtils } from '$api/data-models/user';
import { UserRoleName } from '$api/types/user';
import styles from '$web/components/application/application.module.css';
import { RoutePath } from '$web/utils/application';

const ApplicationContainer = (props: JSX.HTMLAttributes<HTMLDivElement>) => {
  const navigate = useNavigate();

  const hasRole = (roleName: UserRoleName) => {
    const sessionUser = authenticationStore.sessionUser();

    return sessionUser?.user && userUtils.hasRoles(sessionUser.user, [roleName]);
  };

  useBeforeLeave(function checkNeedsOnboarding(event: BeforeLeaveEventArgs) {
    const sessionUser = authenticationStore.sessionUser();

    if (event.to === RoutePath.ONBOARDING || !sessionUser || sessionUser.user.hasPassword) {
      return;
    }

    event.preventDefault();
    navigate(RoutePath.ONBOARDING);
  });

  onMount(() => {
    const responseAuthenticationInterceptor = async (
      // biome-ignore lint/suspicious/noExplicitAny: this handles generic requests so it needs to allow for any
      _requestOptions: HttpRequest<any>,
      // biome-ignore lint/suspicious/noExplicitAny: this handles generic requests so it needs to allow for any
      response: any,
      _rawResponse: Response,
    ) => {
      // @todo(!!!) logout with 401 error response
      return response;
    };

    httpUtils.addHttpResponseInterceptor(responseAuthenticationInterceptor);

    globalsStore.initialize({
      navigate,
    });
    authenticationStore.initialize({
      homeRedirectRoute: RoutePath.HOME,
      loginRedirectRoute: RoutePath.LOGIN,
    });

    onCleanup(() => {
      httpUtils.removeHttpResponseInterceptor(responseAuthenticationInterceptor);
    });
  });

  return (
    <div data-theme={themeManagerStore.theme()} class={styles.container}>
      <Show when={authenticationStore.isInitializing() === false} fallback={<Loading />}>
        <Show when={authenticationStore.isAuthenticated()}>
          <nav class={styles.navigation}>
            <A href={RoutePath.HOME}>Home</A>
            <Show when={hasRole(UserRoleName.STYTCH_ADMIN)}>
              <A href={RoutePath.USERS}>Users</A>
            </Show>
          </nav>
        </Show>
        <div class={styles.mainContent}>{props.children}</div>
      </Show>
      <GlobalNotifications notifications={globalNotificationsStore.notifications()} />
    </div>
  );
};

export default ApplicationContainer;

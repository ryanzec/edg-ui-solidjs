import { useNavigate } from '@solidjs/router';
import { type JSX, Show, onCleanup, onMount } from 'solid-js';

import ApplicationFrame, { type ApplicationFrameProps } from '$/application/components/application-frame';
import { authenticationStore } from '$/application/stores/authentication.store';
import { globalsStore } from '$/application/stores/globals.store';
import { themeManagerStore } from '$/application/stores/theme-manager.store';
import GlobalNotifications from '$/core/components/global-notifications';
import Loading from '$/core/components/loading';
import { globalNotificationsStore } from '$/core/stores/global-notifications.store';
import { type HttpRequest, httpUtils } from '$/core/utils/http';
import styles from '$web/components/application/application.module.css';
import { RoutePath } from '$web/utils/application';
import posthog from 'posthog-js';

const ApplicationContainer = (props: JSX.HTMLAttributes<HTMLDivElement>) => {
  const navigate = useNavigate();

  const getUserItems = (): ApplicationFrameProps['userItems'] => {
    const userItems = [
      {
        label: 'Settings',
        onClick: () => {
          navigate(RoutePath.USERS);
        },
      },
      {
        label: 'Logout',
        onClick: () => {
          authenticationStore.logout();
        },
      },
    ];

    if (posthog.isFeatureEnabled('internal-tools')) {
      userItems.push({
        label: 'Internal Tools',
        onClick: () => {
          navigate(RoutePath.HOME);
        },
      });
    }

    return userItems;
  };

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
        <ApplicationFrame
          navigate={navigate}
          homeRoute="#"
          topNavigationItems={[
            {
              label: 'Page 1',
              route: '#',
              isActive: true,
            },
            {
              label: 'Page 2',
              route: '#',
              isActive: false,
            },
            {
              label: 'Page 3',
              route: '#',
              isActive: false,
            },
            {
              label: 'Page 4',
              route: '#',
              isActive: false,
            },
          ]}
          userItems={getUserItems()}
          isInitializing={false}
          isAuthenticated
          user={authenticationStore.sessionUser()?.user}
        >
          <div class={styles.mainContent}>{props.children}</div>
        </ApplicationFrame>
      </Show>
      <GlobalNotifications notifications={globalNotificationsStore.notifications()} />
    </div>
  );
};

export default ApplicationContainer;

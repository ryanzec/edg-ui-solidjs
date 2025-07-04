import { useNavigate } from '@solidjs/router';
import { type JSX, Show, onCleanup, onMount } from 'solid-js';

import ApplicationFrame from '$/application/components/application-frame';
import { authenticationStore } from '$/application/stores/authentication.store';
import { globalsStore } from '$/application/stores/globals.store';
import { themeManagerStore } from '$/application/stores/theme-manager.store';
import { ApplicationFeature, UiRouteName } from '$/application/utils/application';
import GlobalNotifications from '$/core/components/global-notifications';
import Loading from '$/core/components/loading';
import { globalNotificationsStore } from '$/core/stores/global-notifications.store';
import { type HttpRequest, httpUtils } from '$/core/utils/http';
import { FeatureFlag, featureFlagUtils } from '$web/utils/feature-flag';

const ApplicationContainer = (props: JSX.HTMLAttributes<HTMLDivElement>) => {
  const navigate = useNavigate();

  const getFrameFeatures = (): ApplicationFeature[] => {
    const features: ApplicationFeature[] = [];

    if (featureFlagUtils.hasFeatureFlag(FeatureFlag.INTERNAL_TOOLS)) {
      features.push(ApplicationFeature.INTERNAL_TOOLS);
    }

    return features;
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
      homeRedirectRoute: UiRouteName.HOME,
      loginRedirectRoute: UiRouteName.LOGIN,
    });

    onCleanup(() => {
      httpUtils.removeHttpResponseInterceptor(responseAuthenticationInterceptor);
    });
  });

  return (
    <div data-theme={themeManagerStore.theme()} class="h-[100vh] w-[100vw] flex">
      <Show when={authenticationStore.isInitializing() === false} fallback={<Loading />}>
        <ApplicationFrame
          isInitializing={false}
          isAuthenticated={authenticationStore.isAuthenticated()}
          user={authenticationStore.sessionUser()?.user}
          features={getFrameFeatures()}
        >
          <div class="w-full">{props.children}</div>
        </ApplicationFrame>
      </Show>
      <GlobalNotifications notifications={globalNotificationsStore.notifications()} />
    </div>
  );
};

export default ApplicationContainer;

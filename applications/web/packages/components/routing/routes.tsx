import { Navigate, Route } from '@solidjs/router';
import { lazy } from 'solid-js';

import AuthenticatedRoute from '$web/components/routing/authenticated-route';
import UnauthenticatedRoute from '$web/components/routing/unauthenticated-route';
import { RoutePath } from '$web/utils/application';

const HomeView = lazy(() => import('$web/views/home'));
const LoginView = lazy(() => import('$web/views/login'));
const ForgotPasswordView = lazy(() => import('$web/views/forgot-password'));
const ResetPasswordView = lazy(() => import('$web/views/reset-password'));
const InviteAuthenticateView = lazy(() => import('$web/views/authenticate-invite/authenticate-invite.view'));
const UsersView = lazy(() => import('$web/views/users'));
const OnboardingView = lazy(() => import('$web/views/onboarding'));

const Routes = () => {
  return (
    <>
      <Route
        path={RoutePath.LOGIN}
        component={() => (
          <UnauthenticatedRoute>
            <LoginView />
          </UnauthenticatedRoute>
        )}
      />
      <Route
        path={RoutePath.INVITE_AUTHENTICATE}
        component={() => (
          <UnauthenticatedRoute>
            <InviteAuthenticateView />
          </UnauthenticatedRoute>
        )}
      />
      <Route
        path={RoutePath.FORGOT_PASSWORD}
        component={() => (
          <UnauthenticatedRoute>
            <ForgotPasswordView />
          </UnauthenticatedRoute>
        )}
      />
      <Route
        path={RoutePath.RESET_PASSWORD}
        component={() => (
          <UnauthenticatedRoute>
            <ResetPasswordView />
          </UnauthenticatedRoute>
        )}
      />
      <Route
        path={RoutePath.HOME}
        component={() => (
          <AuthenticatedRoute>
            <HomeView />
          </AuthenticatedRoute>
        )}
      />
      <Route
        path={RoutePath.USERS}
        component={() => (
          <AuthenticatedRoute>
            <UsersView />
          </AuthenticatedRoute>
        )}
      />
      <Route
        path={RoutePath.ONBOARDING}
        component={() => (
          <AuthenticatedRoute>
            <OnboardingView />
          </AuthenticatedRoute>
        )}
      />
      <Route path="*" component={() => <Navigate href="home" />} />
    </>
  );
};

export default Routes;

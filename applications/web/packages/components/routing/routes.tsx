import { Navigate, Route } from '@solidjs/router';
import { lazy } from 'solid-js';

import { UiRouteName } from '$/application/utils/application';
import AuthenticatedRoute from '$web/components/routing/authenticated-route';
import UnauthenticatedRoute from '$web/components/routing/unauthenticated-route';

const HomeView = lazy(() => import('$web/views/home'));
const LoginView = lazy(() => import('$web/views/login'));
const UsersView = lazy(() => import('$web/views/users'));

const Routes = () => {
  return (
    <>
      <Route
        path={UiRouteName.LOGIN}
        component={() => (
          <UnauthenticatedRoute>
            <LoginView />
          </UnauthenticatedRoute>
        )}
      />
      <Route
        path={UiRouteName.HOME}
        component={() => (
          <AuthenticatedRoute>
            <HomeView />
          </AuthenticatedRoute>
        )}
      />
      <Route
        path={UiRouteName.USERS}
        component={() => (
          <AuthenticatedRoute>
            <UsersView />
          </AuthenticatedRoute>
        )}
      />
      <Route path="*" component={() => <Navigate href="home" />} />
    </>
  );
};

export default Routes;

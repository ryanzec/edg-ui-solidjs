import { Navigate, Route } from '@solidjs/router';
import { lazy } from 'solid-js';

import AuthenticatedRoute from '$web/components/routing/authenticated-route';
import UnauthenticatedRoute from '$web/components/routing/unauthenticated-route';
import { RoutePath } from '$web/utils/application';

const HomeView = lazy(() => import('$web/views/home'));
const LoginView = lazy(() => import('$web/views/login'));
const UsersView = lazy(() => import('$web/views/users'));

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
      <Route path="*" component={() => <Navigate href="home" />} />
    </>
  );
};

export default Routes;

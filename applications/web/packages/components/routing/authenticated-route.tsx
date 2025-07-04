import { Navigate } from '@solidjs/router';
import type { JSX } from 'solid-js';

import { authenticationStore } from '$/application/stores/authentication.store';
import { UiRouteName } from '$/application/utils/application';

const AuthenticatedRoute = (props: JSX.HTMLAttributes<HTMLDivElement>) => {
  if (!authenticationStore.isAuthenticated()) {
    return <Navigate href={UiRouteName.LOGIN} />;
  }

  return props.children;
};

export default AuthenticatedRoute;

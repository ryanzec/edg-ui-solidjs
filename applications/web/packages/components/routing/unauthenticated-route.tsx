import { Navigate } from '@solidjs/router';
import type { JSX } from 'solid-js';

import { authenticationStore } from '$/application/stores/authentication.store';
import { UiRouteName } from '$/application/utils/application';

const UnauthenticatedRoute = (props: JSX.HTMLAttributes<HTMLDivElement>) => {
  if (authenticationStore.isAuthenticated()) {
    // @todo(!!!) look for redirect in query string
    return <Navigate href={UiRouteName.DASHBOARD} />;
  }

  return props.children;
};

export default UnauthenticatedRoute;

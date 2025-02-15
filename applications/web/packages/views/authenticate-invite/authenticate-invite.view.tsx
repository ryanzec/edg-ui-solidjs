import Page from '$/application/components/page';
import { PageLayout } from '$/application/components/page/page';
import { authenticationStore } from '$/application/stores/authentication.store';
import { useLocation } from '@solidjs/router';
import { onMount } from 'solid-js';

const AuthenticateInviteView = () => {
  const location = useLocation();

  onMount(() => {
    authenticationStore.authenticateInvite(location.query.token as string);
  });

  return <Page layout={PageLayout.CENTERED}>Authenticating...</Page>;
};

export default AuthenticateInviteView;

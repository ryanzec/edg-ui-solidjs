import Page from '$/application/components/page';
import SetPasswordForm from '$/application/components/set-password-form';
import { authenticationStore } from '$/application/stores/authentication.store';
import { RoutePath } from '$web/utils/application';
import { useNavigate } from '@solidjs/router';
import { onMount } from 'solid-js';

const OnboardingView = () => {
  const navigate = useNavigate();

  onMount(() => {
    if (authenticationStore.sessionUser()?.user.hasPassword === false) {
      return;
    }

    navigate(RoutePath.HOME);
  });

  return (
    <Page>
      <Page.Header>Onboarding</Page.Header>
      <SetPasswordForm />
    </Page>
  );
};

export default OnboardingView;

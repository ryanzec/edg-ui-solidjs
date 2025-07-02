import Page from '$/application/components/page';
import { authenticationStore } from '$/application/stores/authentication.store';
import Button from '$/core/components/button';

const HomeView = () => {
  const handleLogout = () => {
    authenticationStore.logout();
  };

  return (
    <Page>
      <Page.Header label="Home" />
      <Button onClick={handleLogout}>Logout</Button>
    </Page>
  );
};

export default HomeView;

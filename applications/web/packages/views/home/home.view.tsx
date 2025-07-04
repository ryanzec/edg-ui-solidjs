import Page from '$/application/components/page';
import { authenticationStore } from '$/application/stores/authentication.store';

const HomeView = () => {
  const handleLogout = () => {
    authenticationStore.logout();
  };

  return (
    <Page>
      <Page.Header label="Home" />
      <Page.Content>
        <Page.ContentSection>Home Page</Page.ContentSection>
      </Page.Content>
    </Page>
  );
};

export default HomeView;

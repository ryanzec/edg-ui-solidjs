import Page from '$/application/components/page';
import { authenticationStore } from '$/application/stores/authentication.store';
import Button from '$/core/components/button';
import { websocketManagerStore } from '$/core/stores/websocket-manager.store';

const HomeView = () => {
  const handleLogout = () => {
    authenticationStore.logout();
  };

  const handleWebsocket = () => {
    websocketManagerStore.send('test');
  };

  return (
    <Page>
      <Page.Header>Home</Page.Header>
      <Button onClick={handleLogout}>Logout</Button>
      {/* @todo remove */}
      <Button onClick={handleWebsocket}>Send To Websocket</Button>
    </Page>
  );
};

export default HomeView;

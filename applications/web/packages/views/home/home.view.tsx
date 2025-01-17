import Button from '$/components/button';
import { authenticationStore } from '$web/stores/authentication.store';
import { useNavigate } from '@solidjs/router';

const HomeView = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authenticationStore.logout(navigate);
  };

  return (
    <div>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default HomeView;

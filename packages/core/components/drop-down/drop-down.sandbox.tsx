import DropDown from '$/core/components/drop-down';
import Icon from '$/core/components/icon';
import List from '$/core/components/list';
import { tooltipComponentUtils } from '$/core/components/tooltip';
import SandboxExamplesContainer from '$sandbox/components/sandbox-examples-container/sandbox-examples-container';

export default {
  title: 'Components/DropDown',
};

export const Default = () => {
  const dropDownStore = tooltipComponentUtils.createStore();

  const handleLogout = () => {
    console.log('Logout');

    dropDownStore.hide();
  };

  return (
    <SandboxExamplesContainer>
      <DropDown
        store={dropDownStore}
        handleElement={<Icon icon="question-mark" isClickable />}
        contentElement="drop down content"
      />
    </SandboxExamplesContainer>
  );
};

export const UnstyledContent = () => {
  const dropDownStore1 = tooltipComponentUtils.createStore();
  const dropDownStore2 = tooltipComponentUtils.createStore();

  const handleLogout = () => {
    console.log('Logout');

    dropDownStore1.hide();
    dropDownStore2.hide();
  };

  return (
    <SandboxExamplesContainer>
      <DropDown
        store={dropDownStore1}
        handleElement={<button type="button">should not be done, just for testing and demonstration purposes</button>}
        contentIsStyled={false}
        contentElement="drop down content"
      />
      <DropDown
        store={dropDownStore2}
        handleElement={<button type="button">with extra styling</button>}
        contentIsStyled={false}
        contentElement={
          <List>
            <List.Item onClick={handleLogout}>Logout</List.Item>
          </List>
        }
      />
    </SandboxExamplesContainer>
  );
};

export const Menu = () => {
  const dropDownStore = tooltipComponentUtils.createStore();

  const handleLogout = () => {
    console.log('Logout');

    dropDownStore.hide();
  };

  return (
    <DropDown.Menu
      store={dropDownStore}
      handleElement={<Icon icon="question-mark" isClickable />}
      contentElement={
        <>
          <List.Item onClick={handleLogout}>Logout</List.Item>
          <List.Item onClick={handleLogout}>Logout</List.Item>
          <List.Item onClick={handleLogout}>Logout</List.Item>
          <List.Item onClick={handleLogout}>Logout</List.Item>
        </>
      }
    />
  );
};

export const ExtraLong = () => {
  const dropDownStore = tooltipComponentUtils.createStore();

  const handleLogout = () => {
    console.log('Logout');

    dropDownStore.hide();
  };

  return (
    <DropDown.Menu
      store={dropDownStore}
      handleElement={<Icon icon="question-mark" isClickable />}
      contentElement={
        <>
          <List.Item onClick={handleLogout}>Logout</List.Item>
          <List.Item onClick={handleLogout}>Logout</List.Item>
          <List.Item onClick={handleLogout}>Logout</List.Item>
          <List.Item onClick={handleLogout}>Logout</List.Item>
          <List.Item onClick={handleLogout}>Logout</List.Item>
          <List.Item onClick={handleLogout}>Logout</List.Item>
          <List.Item onClick={handleLogout}>Logout</List.Item>
          <List.Item onClick={handleLogout}>Logout</List.Item>
          <List.Item onClick={handleLogout}>Logout</List.Item>
          <List.Item onClick={handleLogout}>Logout</List.Item>
          <List.Item onClick={handleLogout}>Logout</List.Item>
          <List.Item onClick={handleLogout}>Logout</List.Item>
          <List.Item onClick={handleLogout}>Logout</List.Item>
          <List.Item onClick={handleLogout}>Logout</List.Item>
          <List.Item onClick={handleLogout}>Logout</List.Item>
          <List.Item onClick={handleLogout}>Logout</List.Item>
          <List.Item onClick={handleLogout}>Logout</List.Item>
          <List.Item onClick={handleLogout}>Logout</List.Item>
          <List.Item onClick={handleLogout}>Logout</List.Item>
          <List.Item onClick={handleLogout}>Logout</List.Item>
          <List.Item onClick={handleLogout}>Logout</List.Item>
          <List.Item onClick={handleLogout}>Logout</List.Item>
          <List.Item onClick={handleLogout}>Logout</List.Item>
          <List.Item onClick={handleLogout}>Logout</List.Item>
          <List.Item onClick={handleLogout}>Logout</List.Item>
          <List.Item onClick={handleLogout}>Logout</List.Item>
          <List.Item onClick={handleLogout}>Logout</List.Item>
          <List.Item onClick={handleLogout}>Logout</List.Item>
          <List.Item onClick={handleLogout}>Logout</List.Item>
          <List.Item onClick={handleLogout}>Logout</List.Item>
          <List.Item onClick={handleLogout}>Logout</List.Item>
          <List.Item onClick={handleLogout}>Logout</List.Item>
          <List.Item onClick={handleLogout}>Logout</List.Item>
        </>
      }
    />
  );
};

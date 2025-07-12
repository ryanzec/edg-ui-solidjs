import DropDown from '$/core/components/drop-down';
import Icon from '$/core/components/icon';
import List from '$/core/components/list';
import type { TooltipComponentRef } from '$/core/components/tooltip';
import { createComponentRef } from '$/core/stores/component-ref';
import SandboxExamplesContainer from '$sandbox/components/sandbox-examples-container/sandbox-examples-container';

export default {
  title: 'Components/DropDown',
};

export const Default = () => {
  const dropDownComponentRef = createComponentRef<TooltipComponentRef>();

  const handleLogout = () => {
    console.log('Logout');

    dropDownComponentRef.api()?.hide();
  };

  return (
    <SandboxExamplesContainer>
      <DropDown
        tooltipComponentRef={dropDownComponentRef}
        handleElement={<Icon icon="question-mark" isClickable />}
        contentElement="drop down content"
      />
    </SandboxExamplesContainer>
  );
};

export const UnstyledContent = () => {
  const dropDownComponentRef1 = createComponentRef<TooltipComponentRef>();
  const dropDownComponentRef2 = createComponentRef<TooltipComponentRef>();

  const handleLogout = () => {
    console.log('Logout');

    dropDownComponentRef1.api()?.hide();
    dropDownComponentRef2.api()?.hide();
  };

  return (
    <SandboxExamplesContainer>
      <DropDown
        tooltipComponentRef={dropDownComponentRef1}
        handleElement={<button type="button">should not be done, just for testing and demonstration purposes</button>}
        contentIsStyled={false}
        contentElement="drop down content"
      />
      <DropDown
        tooltipComponentRef={dropDownComponentRef2}
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
  const dropDownComponentRef = createComponentRef<TooltipComponentRef>();

  const handleLogout = () => {
    console.log('Logout');

    dropDownComponentRef.api()?.hide();
  };

  return (
    <DropDown.Menu
      tooltipComponentRef={dropDownComponentRef}
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
  const dropDownComponentRef = createComponentRef<TooltipComponentRef>();

  const handleLogout = () => {
    console.log('Logout');

    dropDownComponentRef.api()?.hide();
  };

  return (
    <DropDown.Menu
      tooltipComponentRef={dropDownComponentRef}
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

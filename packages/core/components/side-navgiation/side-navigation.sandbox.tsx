import { createSignal } from 'solid-js';
import SideNavigation from '$/core/components/side-navgiation';
import { toggleStoreUtils } from '$/core/stores/toggle.store';

export default {
  title: 'Components/SideNavigation',
};

export const Expanded = () => {
  const toggleStore = toggleStoreUtils.createStore({ defaultIsToggled: true });

  return (
    <div>
      <SideNavigation>
        <SideNavigation.Item childrenToggleStore={toggleStore} headerElement="Button">
          <SideNavigation.SubItem>DropDown</SideNavigation.SubItem>
          <SideNavigation.SubItem isActive>IconButton</SideNavigation.SubItem>
          <SideNavigation.SubItem>Loading</SideNavigation.SubItem>
          <SideNavigation.SubItem>Color</SideNavigation.SubItem>
          <SideNavigation.SubItem>Variant</SideNavigation.SubItem>
        </SideNavigation.Item>
      </SideNavigation>
    </div>
  );
};

export const Collapsed = () => {
  const toggleStore = toggleStoreUtils.createStore();

  return (
    <div>
      <SideNavigation>
        <SideNavigation.Item childrenToggleStore={toggleStore} headerElement="Button">
          <SideNavigation.SubItem>DropDown</SideNavigation.SubItem>
          <SideNavigation.SubItem isActive>IconButton</SideNavigation.SubItem>
          <SideNavigation.SubItem>Loading</SideNavigation.SubItem>
          <SideNavigation.SubItem>Color</SideNavigation.SubItem>
          <SideNavigation.SubItem>Variant</SideNavigation.SubItem>
        </SideNavigation.Item>
      </SideNavigation>
    </div>
  );
};

export const CustomIcon = () => {
  const toggleStore = toggleStoreUtils.createStore();

  return (
    <div>
      <SideNavigation>
        <SideNavigation.Item childrenToggleStore={toggleStore} headerElement="Button" iconName="text-align-justify">
          <SideNavigation.SubItem>DropDown</SideNavigation.SubItem>
          <SideNavigation.SubItem isActive>IconButton</SideNavigation.SubItem>
          <SideNavigation.SubItem>Loading</SideNavigation.SubItem>
          <SideNavigation.SubItem>Color</SideNavigation.SubItem>
          <SideNavigation.SubItem>Variant</SideNavigation.SubItem>
        </SideNavigation.Item>
      </SideNavigation>
    </div>
  );
};

export const NoChildren = () => {
  const [isActive, setIsActive] = createSignal(false);

  const handleClick = () => {
    setIsActive(!isActive());
  };

  return (
    <div>
      <SideNavigation>
        <SideNavigation.Item isActive={isActive()} onClick={handleClick} headerElement="Button" />
      </SideNavigation>
    </div>
  );
};

export const ListWithLinks = () => {
  const toggleStore1 = toggleStoreUtils.createStore();
  const toggleStore2 = toggleStoreUtils.createStore();

  return (
    <div>
      <SideNavigation>
        <SideNavigation.Item headerElement="Button1" href="#1" />
        <SideNavigation.Item headerElement="Button2" href="#2" />
        <SideNavigation.Item
          childrenToggleStore={toggleStore1}
          headerElement="Button3 (links)"
          iconName="text-align-justify"
        >
          <SideNavigation.SubItem href="#dropdowm">DropDown</SideNavigation.SubItem>
          <SideNavigation.SubItem href="#iconbutton" isActive>
            IconButton
          </SideNavigation.SubItem>
          <SideNavigation.SubItem href="#loading">Loading</SideNavigation.SubItem>
          <SideNavigation.SubItem href="#color">Color</SideNavigation.SubItem>
          <SideNavigation.SubItem href="#variant">Variant</SideNavigation.SubItem>
        </SideNavigation.Item>
        <SideNavigation.Item headerElement="Button4" href="#4" />
        <SideNavigation.Item childrenToggleStore={toggleStore2} headerElement="Button5" iconName="text-align-justify">
          <SideNavigation.SubItem>DropDown</SideNavigation.SubItem>
          <SideNavigation.SubItem isActive>IconButton</SideNavigation.SubItem>
          <SideNavigation.SubItem>Loading</SideNavigation.SubItem>
          <SideNavigation.SubItem>Color</SideNavigation.SubItem>
          <SideNavigation.SubItem>Variant</SideNavigation.SubItem>
        </SideNavigation.Item>
      </SideNavigation>
    </div>
  );
};

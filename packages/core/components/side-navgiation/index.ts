import SideNavigation, { type SideNavigationProps } from '$/core/components/side-navgiation/side-navigation';
import Item, { type SideNavigationItemProps } from '$/core/components/side-navgiation/side-navigation-item';
import SubItem, { type SideNavigationSubItemProps } from '$/core/components/side-navgiation/side-navigation-sub-item';

export type { SideNavigationItemProps, SideNavigationSubItemProps, SideNavigationProps };

export default Object.assign(SideNavigation, { SubItem, Item });

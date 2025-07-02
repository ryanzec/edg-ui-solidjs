import {
  default as BaseSideNavigation,
  type SideNavigationProps,
} from '$/core/components/side-navgiation/side-navigation';
import Item, { type SideNavigationItemProps } from '$/core/components/side-navgiation/side-navigation-item';
import SubItem, { type SideNavigationSubItemProps } from '$/core/components/side-navgiation/side-navigation-sub-item';

export type { SideNavigationItemProps, SideNavigationSubItemProps, SideNavigationProps };

export const SideNavigation = Object.assign(BaseSideNavigation, { SubItem, Item });

export default SideNavigation;

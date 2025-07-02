import Tab, { type TabProps } from '$/core/components/tabs/tab';
import { default as BaseTabs, TabOrientation, TabSize, TabVariant, type TabsProps } from '$/core/components/tabs/tabs';

export type { TabsProps, TabProps };

export { TabSize, TabOrientation, TabVariant };

export const Tabs = Object.assign(BaseTabs, { Tab });

export default Tabs;

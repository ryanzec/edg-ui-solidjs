import Tab, { type TabProps } from '$/core/components/tabs/tab';
import { default as BaseTabs, TabOrientation, TabSize, type TabsProps, TabVariant } from '$/core/components/tabs/tabs';

export type { TabsProps, TabProps };

export { TabSize, TabOrientation, TabVariant };

export const Tabs = Object.assign(BaseTabs, { Tab });

export default Tabs;

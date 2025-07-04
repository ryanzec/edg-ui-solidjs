import { tailwindUtils } from '$/core/utils/tailwind';
import { type JSX, splitProps } from 'solid-js';

import styles from '$/core/components/side-navgiation/side-navigation.module.css';

export type SideNavigationProps = JSX.HTMLAttributes<HTMLDivElement>;

const SideNavigation = (passedProps: SideNavigationProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['class']);

  return (
    <div data-id="side-navigation" {...restOfProps} class={tailwindUtils.merge(styles.sideNavigation, props.class)} />
  );
};

export default SideNavigation;

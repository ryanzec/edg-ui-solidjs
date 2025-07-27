import { createEffect, createSignal, type JSX } from 'solid-js';
import { Dynamic } from 'solid-js/web';

import styles from '$/core/components/side-navgiation/side-navigation.module.css';
import type { CommonDataAttributes } from '$/core/types/generic';
import { tailwindUtils } from '$/core/utils/tailwind';

export type SideNavigationSubItemProps = CommonDataAttributes & {
  children: JSX.Element;
  class?: string;
  isActive?: boolean;
  href?: string;
  onClick?: () => void;
};

const SideNavigationSubItem = (props: SideNavigationSubItemProps) => {
  const [component, setComponent] = createSignal<'button' | 'a'>(!props.href ? 'button' : 'a');
  const [componentProps, setComponentProps] = createSignal<
    JSX.HTMLAttributes<HTMLAnchorElement> | JSX.HTMLAttributes<HTMLButtonElement>
  >({});

  createEffect(function updateComponentData() {
    const cssClasses = tailwindUtils.merge(styles.subItem, props.class, {
      [styles.subItemActive]: props.isActive,
    });

    if (props.href) {
      setComponent('a');
      setComponentProps({
        href: props.href,
        class: cssClasses,
      } as JSX.HTMLAttributes<HTMLAnchorElement>);

      return;
    }

    setComponent('button');
    setComponentProps({
      type: 'button',
      class: cssClasses,
      onClick: props.onClick,
    } as JSX.HTMLAttributes<HTMLButtonElement>);
  });

  return (
    <Dynamic data-id="sub-item" component={component()} {...componentProps()}>
      {props.children}
    </Dynamic>
  );
};

export default SideNavigationSubItem;

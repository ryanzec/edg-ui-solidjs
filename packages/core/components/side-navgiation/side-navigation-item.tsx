import { tailwindUtils } from '$/core/utils/tailwind';
import { type JSX, children, createEffect, createSignal, mergeProps, splitProps } from 'solid-js';

import Icon, { IconColor, IconSize } from '$/core/components/icon';
import { type IconName, IconVariant } from '$/core/components/icon/utils';
import styles from '$/core/components/side-navgiation/side-navigation.module.css';
import { type ToggleStore, toggleStoreUtils } from '$/core/stores/toggle.store';
import { loggerUtils } from '$/core/utils/logger';
import { Dynamic } from 'solid-js/web';

export type SideNavigationItemProps = JSX.HTMLAttributes<HTMLDivElement> & {
  headerElement: JSX.Element;
  childrenToggleStore?: ToggleStore;
  onClick?: () => void;
  iconName?: IconName;
  iconVariant?: IconVariant;
  isActive?: boolean;
  href?: string;
};

// type is needed to avoid typescript errors when using the props
const defaultProps: { iconName: IconName; iconVariant: IconVariant } = {
  iconName: 'square',
  iconVariant: IconVariant.FILL,
};

const SideNavigationItem = (passedProps: SideNavigationItemProps) => {
  const [props, restOfProps] = splitProps(mergeProps(defaultProps, passedProps), [
    'children',
    'class',
    'headerElement',
    'childrenToggleStore',
    'iconName',
    'iconVariant',
    'isActive',
    'onClick',
    'href',
  ]);
  const solidChildren = children(() => props.children);

  const [component, setComponent] = createSignal<'button' | 'a'>(!props.href ? 'button' : 'a');
  const [componentProps, setComponentProps] = createSignal<
    JSX.HTMLAttributes<HTMLAnchorElement> | JSX.HTMLAttributes<HTMLButtonElement>
  >({});

  props.childrenToggleStore =
    !props.childrenToggleStore && !!solidChildren() ? toggleStoreUtils.createStore() : props.childrenToggleStore;

  const handleClick = () => {
    if (!solidChildren()) {
      if (!props.onClick) {
        loggerUtils.error('when a side navigation item has no children, an onClick handler or href must be provided');

        return;
      }

      props.onClick();

      return;
    }

    props.childrenToggleStore?.toggle();
  };

  createEffect(function updateComponentData() {
    if (props.href) {
      setComponent('a');
      setComponentProps({
        href: props.href,
        class: styles.header,
      } as JSX.HTMLAttributes<HTMLAnchorElement>);

      return;
    }

    setComponent('button');
    setComponentProps({
      type: 'button',
      class: styles.header,
      onClick: handleClick,
    } as JSX.HTMLAttributes<HTMLButtonElement>);
  });

  return (
    <div
      data-id="item"
      {...restOfProps}
      class={tailwindUtils.merge(styles.item, props.class, {
        [styles.isCollapsed]: !props.childrenToggleStore?.isToggled(),
      })}
    >
      <Dynamic data-id="item" component={component()} {...componentProps()}>
        <Icon
          class={styles.headerIndicatorIcon}
          icon={props.iconName}
          size={IconSize.LARGE}
          color={props.childrenToggleStore?.isToggled() || props.isActive ? IconColor.BRAND : IconColor.NEUTRAL}
          variant={props.iconVariant}
        />
        {props.headerElement}
      </Dynamic>
      <div class={styles.subItems}>{props.children}</div>
    </div>
  );
};

export default SideNavigationItem;

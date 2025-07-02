import { type JSX, Show, createSignal, mergeProps, splitProps, useContext } from 'solid-js';

import Icon, { type IconName } from '$/core/components/icon';
import Link from '$/core/components/link';
import { TabSize, TabVariant, TabsContext } from '$/core/components/tabs/tabs';
import type { CommonDataAttributes } from '$/core/types/generic';
import { loggerUtils } from '$/core/utils/logger';
import { tailwindUtils } from '$/core/utils/tailwind';

export type TabProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> &
  CommonDataAttributes & {
    isActive?: boolean;
    icon?: IconName;
    'data-value'?: string;
    onClose?: (value?: string) => void;
    hasUnsavedChanges?: boolean;
  };

const Tab = (passedProps: TabProps) => {
  const [props, restOfProps] = splitProps(mergeProps({ count: 0 }, passedProps), [
    'class',
    'isActive',
    'icon',
    'children',
    'onClose',
    'data-value',
    'hasUnsavedChanges',
  ]);

  const context = useContext(TabsContext);

  const [isHoveringIcon, setIsHoveringIcon] = createSignal(false);

  const handleOnClose = () => {
    if (!props['data-value']) {
      loggerUtils.warn('you must configure data-value for onClose to work properly');
    }

    props.onClose?.(props['data-value']);
  };

  return (
    <button
      data-id="tab"
      {...restOfProps}
      class={tailwindUtils.merge(
        'flex items-center gap-3xs px-2xs py-4xs font-medium border border-outline cursor-pointer text-nowrap',
        props.class,
        {
          'rounded-sm': context?.variant === TabVariant.DEFAULT,
          'text-text-inverse border-0': context?.onInverse,
          'text-sm leading-sm tracking-sm': context?.size === TabSize.SMALL,
          'bg-brand text-on-brand border-brand': props.isActive,
        },
      )}
    >
      <Show when={props.icon}>{(icon) => <Icon icon={icon()} />}</Show>
      {props.children}
      <Show when={props.onClose}>
        <Link onClick={handleOnClose} isUnstyled class="inline-flex">
          <Icon
            onMouseEnter={() => setIsHoveringIcon(true)}
            onMouseLeave={() => setIsHoveringIcon(false)}
            icon={!isHoveringIcon() && props.hasUnsavedChanges ? 'warning' : 'x'}
          />
        </Link>
      </Show>
    </button>
  );
};

export default Tab;

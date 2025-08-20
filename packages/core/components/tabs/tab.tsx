import { createSignal, type JSX, mergeProps, Show, splitProps, useContext } from 'solid-js';

import Icon, { type IconName, IconVariant } from '$/core/components/icon';
import Link from '$/core/components/link';
import { TabSize, TabsContext, TabVariant } from '$/core/components/tabs/tabs';
import type { CommonDataAttributes } from '$/core/types/generic';
import { loggerUtils } from '$/core/utils/logger';
import { tailwindUtils } from '$/core/utils/tailwind';
import Badge, { BadgeColor, BadgeSize, BadgeVariant } from '../badge';
import Typography, { TypographySize } from '../typography';

export type TabProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> &
  CommonDataAttributes & {
    isActive?: boolean;
    icon?: IconName;
    'data-value'?: string;
    onClose?: (value?: string) => void;
    hasUnsavedChanges?: boolean;
    disabled?: boolean;
    marker?: string;
    markerColor?: BadgeColor;
  };

const Tab = (passedProps: TabProps) => {
  const [props, restOfProps] = splitProps(mergeProps({ count: 0, markerColor: BadgeColor.WARNING }, passedProps), [
    'class',
    'isActive',
    'icon',
    'children',
    'onClose',
    'data-value',
    'hasUnsavedChanges',
    'disabled',
    'marker',
    'markerColor',
  ]);

  const context = useContext(TabsContext);

  const [isHoveringIcon, setIsHoveringIcon] = createSignal(false);

  const handleOnClose = () => {
    if (props.disabled) {
      return;
    }

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
        {
          'rounded-sm': context?.variant === TabVariant.DEFAULT,
          'text-text-inverse border-0': context?.onInverse,
          'text-sm leading-sm tracking-sm': context?.size === TabSize.SMALL,
          'bg-brand-strong text-brand-strong-text border-brand-strong': props.isActive,
          'opacity-disabled': props.disabled,
        },
        props.class,
      )}
      disabled={props.disabled}
    >
      <Show when={props.icon}>{(icon) => <Icon icon={icon()} />}</Show>
      {props.children}
      <Show when={props.marker}>
        <Badge color={props.markerColor} variant={BadgeVariant.STRONG} size={BadgeSize.SMALL}>
          <Typography size={TypographySize.EXTRA_SMALL}>{props.marker}</Typography>
        </Badge>
      </Show>
      <Show when={props.onClose}>
        <Link onClick={handleOnClose} isUnstyled class="inline-flex">
          <Icon
            onMouseEnter={() => setIsHoveringIcon(true)}
            onMouseLeave={() => setIsHoveringIcon(false)}
            variant={!isHoveringIcon() && props.hasUnsavedChanges ? IconVariant.BOLD : IconVariant.REGULAR}
            icon={!isHoveringIcon() && props.hasUnsavedChanges ? 'dot-outline' : 'x'}
          />
        </Link>
      </Show>
    </button>
  );
};

export default Tab;

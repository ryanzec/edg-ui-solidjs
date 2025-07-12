import { type OffsetOptions, type Placement, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
import { type JSX, createContext, createEffect, createSignal, mergeProps, onCleanup, splitProps } from 'solid-js';
import * as uuid from 'uuid';

import styles from '$/core/components/tooltip/tooltip.module.css';
import { type TooltipComponentRef, TooltipTriggerEvent } from '$/core/components/tooltip/utils';
import { clickOutsideDirective } from '$/core/directives/click-outside-directive';
import { clickOutsideDirectiveDataAttribute } from '$/core/directives/click-outside-directive/click-outside-directive';
import type { ComponentRef } from '$/core/stores/component-ref';
import type { CommonDataAttributes } from '$/core/types/generic';
import { loggerUtils } from '$/core/utils/logger';
import { tailwindUtils } from '$/core/utils/tailwind';

// this is needed to avoid this code being stripped in compilation because of the way directive work in SolidJS
clickOutsideDirective;

export const TooltipContext = createContext<TooltipComponentRef | undefined>(undefined);

export const TooltipDataAttributes = {
  TOOLTIP_ENABLED: 'data-tooltip-enabled',
} as const;

export type TooltipDataAttributes = (typeof TooltipDataAttributes)[keyof typeof TooltipDataAttributes];

export type TooltipProps = JSX.HTMLAttributes<HTMLDivElement> &
  CommonDataAttributes & {
    placement?: Placement;
    tooltipComponentRef: ComponentRef<TooltipComponentRef>;
    triggerEvent?: TooltipTriggerEvent;
    offset?: OffsetOptions;
    defaultOnlyIfScrollable?: boolean;
    id?: string;
  };

const defaultProps: Omit<TooltipProps, 'tooltipComponentRef'> = {
  placement: 'bottom-start',
  triggerEvent: TooltipTriggerEvent.HOVER,
  offset: 5,
  defaultOnlyIfScrollable: false,
};

const Tooltip = (passedProps: TooltipProps) => {
  const [props, restOfProps] = splitProps(mergeProps(defaultProps, passedProps), [
    'placement',
    'triggerEvent',
    'tooltipComponentRef',
    'children',
    'class',
    'offset',
    'defaultOnlyIfScrollable',
    'id',
  ]);

  const [containerElementRef, setContainerElementRef] = createSignal<HTMLDivElement>();
  const [isShowing, setIsShowing] = createSignal(false);
  const [isEnabled, internalSetIsEnabled] = createSignal(true);
  const [onlyIfScrollable] = createSignal(props.defaultOnlyIfScrollable ?? false);
  const [id] = createSignal<string>(props.id || uuid.v4());

  const toggle = () => {
    if (isEnabled() === false) {
      setIsShowing(false);

      return;
    }

    setIsShowing(!isShowing());
  };

  const show = () => {
    if (isEnabled() === false) {
      return;
    }

    setIsShowing(true);
  };

  const hide = () => {
    setIsShowing(false);
  };

  const setIsEnabled = (value: boolean) => {
    internalSetIsEnabled(value);

    if (value === false) {
      hide();
    }
  };

  const enabledTooltip = (event: Event) => {
    const toolipEnabled =
      ((event.currentTarget as HTMLElement) || null)?.getAttribute(TooltipDataAttributes.TOOLTIP_ENABLED) !== 'false';

    if (toolipEnabled === false) {
      return;
    }

    show();
  };

  const disableToolTip = (event?: Event) => {
    const toolipEnabled =
      !event ||
      ((event.currentTarget as HTMLElement) || null)?.getAttribute(TooltipDataAttributes.TOOLTIP_ENABLED) !== 'false';

    if (toolipEnabled === false) {
      return;
    }

    hide();
  };

  const toggleTooltip = (event: Event) => {
    const toolipEnabled =
      ((event.currentTarget as HTMLElement) || null)?.getAttribute(TooltipDataAttributes.TOOLTIP_ENABLED) !== 'false';

    if (toolipEnabled === false) {
      return;
    }

    toggle();
  };

  createEffect(function setupTooltipFloatingElementAndEvents() {
    const currentContainerElement = containerElementRef();

    if (!currentContainerElement) {
      return;
    }

    const currentId = id();
    const handleElement = document.body.querySelector(`[data-tooltip-handle="${currentId}"]`) as HTMLElement;
    const contentElement = document.body.querySelector(`[data-tooltip-content="${currentId}"]`) as HTMLElement;

    if (!handleElement || !contentElement) {
      loggerUtils.error('tooltip component must have 2 children to function properly', handleElement, contentElement);
      // @todo(log) add logging once we have a solution for that for frontend code

      return;
    }

    if (
      onlyIfScrollable() &&
      handleElement.scrollHeight <= handleElement.offsetHeight &&
      handleElement.scrollWidth <= handleElement.offsetWidth
    ) {
      return;
    }

    switch (props.triggerEvent) {
      case TooltipTriggerEvent.HOVER:
        handleElement.addEventListener('mouseover', enabledTooltip);
        handleElement.addEventListener('mouseout', disableToolTip);

        break;

      case TooltipTriggerEvent.STRICT_HOVER:
        // mouse enter / exit event only triggers on the specific element and not any children
        handleElement.addEventListener('mouseenter', enabledTooltip);
        handleElement.addEventListener('mouseexit', disableToolTip);

        break;

      default:
        contentElement.setAttribute(clickOutsideDirectiveDataAttribute.IGNORE_CLICK_OUTSIDE, currentId);
        handleElement.addEventListener('click', toggleTooltip);

        break;
    }

    const updatePosition = () => {
      computePosition(handleElement, contentElement, {
        placement: props.placement,
        // @todo(feature) should this be configurable?
        middleware: [flip(), shift(), offset(props.offset)],
      }).then(({ x, y }) => {
        contentElement.style.top = `${y}px`;
        contentElement.style.left = `${x}px`;
      });
    };

    const cleanupFloatingUi = autoUpdate(handleElement, contentElement, updatePosition);

    onCleanup(() => {
      contentElement.removeAttribute(clickOutsideDirectiveDataAttribute.IGNORE_CLICK_OUTSIDE);
      handleElement.removeEventListener('mouseover', enabledTooltip);
      handleElement.removeEventListener('mouseout', disableToolTip);
      handleElement.removeEventListener('mouseenter', enabledTooltip);
      handleElement.removeEventListener('mouseexit', disableToolTip);
      handleElement.removeEventListener('click', toggleTooltip);

      cleanupFloatingUi();
    });
  });

  const tooltipComponentRef: TooltipComponentRef = {
    isShowing,
    isEnabled,
    setIsEnabled,
    toggle,
    id,
    show,
    hide,
    onlyIfScrollable,
  };

  props.tooltipComponentRef?.onReady(tooltipComponentRef);

  onCleanup(() => {
    props.tooltipComponentRef?.onCleanup();
  });

  return (
    <TooltipContext.Provider value={tooltipComponentRef}>
      <div
        use:clickOutsideDirective={{
          callback: props.triggerEvent === TooltipTriggerEvent.CLICK ? () => disableToolTip() : undefined,
          id: id(),
        }}
        ref={setContainerElementRef}
        data-id="tooltip"
        class={tailwindUtils.merge(styles.tooltip, props.class)}
        {...restOfProps}
      >
        {props.children}
      </div>
    </TooltipContext.Provider>
  );
};

export default Tooltip;

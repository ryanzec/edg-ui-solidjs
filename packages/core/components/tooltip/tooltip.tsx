import { type OffsetOptions, type Placement, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
import { type JSX, createContext, createEffect, createSignal, mergeProps, onCleanup, splitProps } from 'solid-js';

import styles from '$/core/components/tooltip/tooltip.module.css';
import { type TooltipStore, TooltipTriggerEvent } from '$/core/components/tooltip/utils';
import { clickOutsideDirective } from '$/core/directives/click-outside-directive';
import { clickOutsideDirectiveDataAttribute } from '$/core/directives/click-outside-directive/click-outside-directive';
import type { CommonDataAttributes } from '$/core/types/generic';
import { loggerUtils } from '$/core/utils/logger';
import { tailwindUtils } from '$/core/utils/tailwind';

// this is needed to avoid this code being stripped in compilation because of the way directive work in SolidJS
clickOutsideDirective;

export const TooltipContext = createContext<TooltipStore | undefined>(undefined);

export const TooltipDataAttributes = {
  TOOLTIP_ENABLED: 'data-tooltip-enabled',
} as const;

export type TooltipDataAttributes = (typeof TooltipDataAttributes)[keyof typeof TooltipDataAttributes];

export type TooltipProps = JSX.HTMLAttributes<HTMLDivElement> &
  CommonDataAttributes & {
    placement?: Placement;
    store: TooltipStore;
    triggerEvent?: TooltipTriggerEvent;
    offset?: OffsetOptions;
  };

const defaultProps: Omit<TooltipProps, 'store'> = {
  placement: 'bottom-start',
  triggerEvent: TooltipTriggerEvent.HOVER,
  offset: 5,
};

const Tooltip = (passedProps: TooltipProps) => {
  const [props, restOfProps] = splitProps(mergeProps(defaultProps, passedProps), [
    'placement',
    'triggerEvent',
    'store',
    'children',
    'class',
    'offset',
  ]);

  const [containerElement, setContainerElement] = createSignal<HTMLDivElement>();

  const enabledTooltip = (event: Event) => {
    const toolipEnabled =
      ((event.currentTarget as HTMLElement) || null)?.getAttribute(TooltipDataAttributes.TOOLTIP_ENABLED) !== 'false';

    if (toolipEnabled === false) {
      return;
    }

    props.store.show();
  };

  const disableToolTip = (event?: Event) => {
    const toolipEnabled =
      !event ||
      ((event.currentTarget as HTMLElement) || null)?.getAttribute(TooltipDataAttributes.TOOLTIP_ENABLED) !== 'false';

    if (toolipEnabled === false) {
      return;
    }

    props.store.hide();
  };

  const toggleTooltip = (event: Event) => {
    const toolipEnabled =
      ((event.currentTarget as HTMLElement) || null)?.getAttribute(TooltipDataAttributes.TOOLTIP_ENABLED) !== 'false';

    if (toolipEnabled === false) {
      return;
    }

    props.store.toggle();
  };

  createEffect(function setupTooltipFloatingElementAndEvents() {
    const currentContainerElement = containerElement();

    if (!currentContainerElement) {
      return;
    }

    const id = props.store.id();
    const handleElement = document.body.querySelector(`[data-tooltip-handle="${id}"]`) as HTMLElement;
    const contentElement = document.body.querySelector(`[data-tooltip-content="${id}"]`) as HTMLElement;

    if (!handleElement || !contentElement) {
      loggerUtils.error('tooltip component must have 2 children to function properly', handleElement, contentElement);
      // @todo(log) add logging once we have a solution for that for frontend code

      return;
    }

    if (
      props.store.onlyIfScrollable() &&
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
        contentElement.setAttribute(clickOutsideDirectiveDataAttribute.IGNORE_CLICK_OUTSIDE, props.store.id());
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

  const containerRef = (element: HTMLDivElement) => {
    setContainerElement(element);
  };

  return (
    <TooltipContext.Provider value={props.store}>
      <div
        use:clickOutsideDirective={{
          callback: props.triggerEvent === TooltipTriggerEvent.CLICK ? () => disableToolTip() : undefined,
          id: props.store.id(),
        }}
        ref={containerRef}
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

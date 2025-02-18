import { type Placement, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
import { type JSX, createContext, createEffect, createSignal, mergeProps, onCleanup, splitProps } from 'solid-js';

import styles from '$/core/components/tooltip/tooltip.module.css';
import { type TooltipStore, TooltipTriggerEvent } from '$/core/components/tooltip/utils';
import { clickOutsideDirective } from '$/core/directives/click-outside-directive';
import type { CommonDataAttributes } from '$/core/types/generic';
import { loggerUtils } from '$/core/utils/logger';
import classnames from 'classnames';

// this is needed to avoid this code being stripped in compilation because of the way directive work in SolidJS
clickOutsideDirective;

export const TooltipContext = createContext<TooltipStore | undefined>(undefined);

export type TooltipProps = JSX.HTMLAttributes<HTMLDivElement> &
  CommonDataAttributes & {
    placement?: Placement;
    store: TooltipStore;
    triggerEvent?: TooltipTriggerEvent;
  };

const defaultProps: Omit<TooltipProps, 'store'> = {
  placement: 'bottom-start',
  triggerEvent: TooltipTriggerEvent.HOVER,
};

const Tooltip = (passedProps: TooltipProps) => {
  const [props, restOfProps] = splitProps(mergeProps(defaultProps, passedProps), [
    'placement',
    'triggerEvent',
    'store',
    'children',
    'class',
  ]);

  const [containerElement, setContainerElement] = createSignal<HTMLDivElement>();

  const enabledTooltip = () => {
    props.store.show();
  };

  const disableToolTip = () => {
    props.store.hide();
  };

  const toggleTooltip = () => {
    props.store.toggle();
  };

  createEffect(function hookupTooltipEvents() {
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

    // since the trigger event can change, we want to remove any existing event handlers to account for that
    handleElement.removeEventListener('mouseover', enabledTooltip);
    handleElement.removeEventListener('mouseout', disableToolTip);
    handleElement.removeEventListener('mouseenter', enabledTooltip);
    handleElement.removeEventListener('mouseexit', disableToolTip);
    handleElement.removeEventListener('click', toggleTooltip);

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
        handleElement.addEventListener('click', toggleTooltip);

        break;
    }

    const updatePosition = () => {
      computePosition(handleElement, contentElement, {
        placement: props.placement,
        // @todo(feature) should this be configurable?
        middleware: [flip(), shift(), offset(5)],
      }).then(({ x, y }) => {
        contentElement.style.top = `${y}px`;
        contentElement.style.left = `${x}px`;
      });
    };

    const cleanup = autoUpdate(handleElement, contentElement, updatePosition);

    onCleanup(() => {
      cleanup();
    });
  });

  const containerRef = (element: HTMLDivElement) => {
    setContainerElement(element);
  };

  return (
    <TooltipContext.Provider value={props.store}>
      <div
        use:clickOutsideDirective={{
          callback: props.triggerEvent === TooltipTriggerEvent.CLICK ? disableToolTip : undefined,
        }}
        ref={containerRef}
        data-id="tooltip"
        class={classnames(styles.tooltip, props.class)}
        {...restOfProps}
      >
        {props.children}
      </div>
    </TooltipContext.Provider>
  );
};

export default Tooltip;

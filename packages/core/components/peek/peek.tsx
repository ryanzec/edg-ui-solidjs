import { createEffect, createSignal, type JSX, mergeProps, onCleanup, Show, splitProps } from 'solid-js';
import { Portal } from 'solid-js/web';

import Overlay from '$/core/components/overlay';
import styles from '$/core/components/peek/peek.module.css';
import type { PeekComponentRef } from '$/core/components/peek/utils';
import type { ComponentRef } from '$/core/stores/component-ref';
import { sizerStoreUtils } from '$/core/stores/sizer.store';
import type { CommonDataAttributes } from '$/core/types/generic';
import { tailwindUtils } from '$/core/utils/tailwind';

export type PeekProps = JSX.HTMLAttributes<HTMLDivElement> &
  CommonDataAttributes & {
    peekComponentRef?: ComponentRef<PeekComponentRef>;
    hasOverlay?: boolean;
    closeOnClickOverlay?: boolean;
    closeOnEscape?: boolean;
    closeEnabled?: boolean;
    isResizable?: boolean;
    initialIsOpened?: boolean;
    onOpened?: () => void;
    onClosed?: () => void;
  };

const Peek = (passedProps: PeekProps) => {
  const [props, restOfProps] = splitProps(
    mergeProps(
      { hasOverlay: true, closeOnClickOverlay: false, closeOnEscape: true, isResizable: false, closeEnabled: true },
      passedProps,
    ),
    [
      'children',
      'class',
      'hasOverlay',
      'closeOnClickOverlay',
      'peekComponentRef',
      'isResizable',
      'closeOnEscape',
      'closeEnabled',
      'initialIsOpened',
      'onOpened',
      'onClosed',
    ],
  );

  const [isOpened, setIsOpened] = createSignal(props.initialIsOpened ?? false);

  const sizerStore = sizerStoreUtils.createStore();

  const toggle = (overrideIsEnabled?: boolean) => {
    if (overrideIsEnabled === true || overrideIsEnabled === false) {
      setIsOpened(overrideIsEnabled);
      return;
    }

    setIsOpened(!isOpened());
  };

  const open = () => {
    setIsOpened(true);
  };

  const close = () => {
    setIsOpened(false);
  };

  const handleClickOverlay = () => {
    if (props.closeEnabled === false || props.closeOnClickOverlay === false) {
      return;
    }

    close();
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    if (props.closeEnabled === false || props.closeOnEscape === false || event.key !== 'Escape') {
      return;
    }

    close();
  };

  const handlePeekClose = () => {
    if (props.closeEnabled === false) {
      return;
    }

    close();
  };

  const setupCloseEvents = (element: HTMLElement) => {
    const closeElements = element.querySelectorAll('[data-peek-close="true"]');

    for (const closeElement of closeElements) {
      closeElement.addEventListener('click', handlePeekClose);
    }
  };

  const setPeekElementRef = (element: HTMLDivElement) => {
    sizerStore.setElementRef(element);

    document.addEventListener('keydown', handleKeyUp);

    // microtask need to to make the the children content is available
    queueMicrotask(() => {
      setupCloseEvents(element);

      if (props.isResizable === true) {
        sizerStore.setupResizeEvents();
      }
    });

    onCleanup(() => {
      document.removeEventListener('keydown', handleKeyUp);
    });
  };

  const peekComponentRef: PeekComponentRef = {
    isOpened,
    toggle,
    open,
    close,
  };

  props.peekComponentRef?.onReady(peekComponentRef);

  createEffect(function openedStateUpdated() {
    const currentIsOpened = isOpened();

    if (currentIsOpened) {
      props.onOpened?.();

      return;
    }

    props.onClosed?.();
  });

  onCleanup(() => {
    props.peekComponentRef?.onCleanup();
  });

  return (
    <Show when={isOpened()}>
      <Portal>
        <div data-id="peek">
          <div
            ref={setPeekElementRef}
            {...restOfProps}
            class={tailwindUtils.merge(
              'transition-shadow duration-150 ease-in-out',
              styles.peek,
              {
                'shadow-[inset_4px_0_0_0_var(--color-warning-high-weak1)]': sizerStore.isInResizeArea(),
              },
              props.class,
            )}
          >
            {props.children}
          </div>
          <Show when={props.hasOverlay}>
            <Overlay onClick={handleClickOverlay} />
          </Show>
        </div>
      </Portal>
    </Show>
  );
};

export default Peek;

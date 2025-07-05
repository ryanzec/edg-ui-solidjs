import { tailwindUtils } from '$/core/utils/tailwind';
import { type JSX, Show, mergeProps, onCleanup, splitProps } from 'solid-js';

import Overlay from '$/core/components/overlay';
import styles from '$/core/components/peek/peek.module.css';
import type { PeekStore } from '$/core/components/peek/utils';
import { sizerStoreUtils } from '$/core/stores/sizer.store';
import type { CommonDataAttributes } from '$/core/types/generic';
import { Portal } from 'solid-js/web';

export type PeekProps = JSX.HTMLAttributes<HTMLDivElement> &
  CommonDataAttributes & {
    peekStore: PeekStore;
    hasOverlay?: boolean;
    closeOnClickOverlay?: boolean;
    closeOnEscape?: boolean;
    closeEnabled?: boolean;
    isResizable?: boolean;
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
      'peekStore',
      'isResizable',
      'closeOnEscape',
      'closeEnabled',
    ],
  );

  const sizerStore = sizerStoreUtils.createStore();

  const handleClickOverlay = () => {
    if (props.closeEnabled === false || props.closeOnClickOverlay === false) {
      return;
    }

    props.peekStore.close();
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    if (props.closeEnabled === false || props.closeOnEscape === false || event.key !== 'Escape') {
      return;
    }

    props.peekStore.close();
  };

  const handlePeekClose = () => {
    if (props.closeEnabled === false) {
      return;
    }

    props.peekStore.close();
  };

  const setupCloseEvents = (element: HTMLElement) => {
    const closeElements = element.querySelectorAll('[data-peek-close="true"]');

    for (const closeElement of closeElements) {
      closeElement.addEventListener('click', handlePeekClose);
    }
  };

  const peekRef = (element: HTMLDivElement) => {
    sizerStore.setElementRef(element);

    document.addEventListener('keydown', handleKeyUp);

    setupCloseEvents(element);

    if (props.isResizable === true) {
      sizerStore.setupResizeEvents();
    }

    onCleanup(() => {
      document.removeEventListener('keydown', handleKeyUp);
    });
  };

  return (
    <Show when={props.peekStore.isOpened()}>
      <Portal>
        <div data-id="peek">
          <div ref={peekRef} {...restOfProps} class={tailwindUtils.merge(styles.peek, props.class)}>
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

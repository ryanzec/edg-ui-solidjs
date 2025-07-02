import { domUtils } from '$/core/utils/dom';
import { type Accessor, onCleanup } from 'solid-js';
import * as uuid from 'uuid';

export const clickOutsideDirectiveDataAttribute = {
  IGNORE_CLICK_OUTSIDE: 'data-click-outside-ignore',
} as const;

const DEFAULT_EVENT_NAME = 'mousedown';

export type ClickOutsideDirectiveOptions = {
  callback: ((clickedElement: HTMLElement) => void) | undefined;
  eventName?: 'mousedown' | 'mouseup';

  // clicks inside elements with this as a data attribute will not be ignored for clicking outside triggering
  id?: string;
};

export default function clickOutsideDirective(
  element: HTMLElement,
  optionsAccessor: Accessor<ClickOutsideDirectiveOptions>,
) {
  const options = optionsAccessor();

  if (!options.callback) {
    return;
  }

  // since this can be updated when the element is update, making this its own variable makes it easier to work with
  const id = options.id || uuid.v1();

  const handleClick = (event: MouseEvent) => {
    const targetElement = event.target as HTMLElement;

    if (domUtils.isElementChildOf(targetElement, element)) {
      return;
    }

    const ignoreDataAttribute = clickOutsideDirectiveDataAttribute.IGNORE_CLICK_OUTSIDE;
    const hasIgnoreDataAttribute = !!targetElement.closest(
      `[${ignoreDataAttribute}="true"], [${ignoreDataAttribute}="${id}"]`,
    );

    if (hasIgnoreDataAttribute) {
      return;
    }

    options.callback?.(targetElement);
  };

  document.body.addEventListener(options.eventName || DEFAULT_EVENT_NAME, handleClick);

  onCleanup(() => document.body.removeEventListener(options.eventName || DEFAULT_EVENT_NAME, handleClick));
}

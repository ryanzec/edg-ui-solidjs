import { type Accessor, createSignal } from 'solid-js';
import * as uuid from 'uuid';

export const TooltipTriggerEvent = {
  CLICK: 'click',
  HOVER: 'hover',
  STRICT_HOVER: 'strict-hover',
} as const;

export type TooltipTriggerEvent = (typeof TooltipTriggerEvent)[keyof typeof TooltipTriggerEvent];

type CreateTooltipStoreOptions = {
  id?: string;
  defaultOnlyIfScrollable?: boolean;
};

export type TooltipStore = {
  id: Accessor<string>;
  onlyIfScrollable: Accessor<boolean>;
  isShowing: Accessor<boolean>;
  isEnabled: Accessor<boolean>;
  setIsEnabled: (value: boolean) => void;
  toggle: () => void;
  show: () => void;
  hide: () => void;
};

const createTooltipStore = (options: CreateTooltipStoreOptions = {}): TooltipStore => {
  const [isShowing, setIsShowing] = createSignal(false);
  const [isEnabled, internalSetIsEnabled] = createSignal(true);
  const [onlyIfScrollable] = createSignal(options.defaultOnlyIfScrollable ?? false);
  const [id] = createSignal<string>(options.id || uuid.v4());

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

  return {
    isShowing,
    isEnabled,
    setIsEnabled,
    toggle,
    id,
    show,
    hide,
    onlyIfScrollable,
  };
};

export const tooltipComponentUtils = {
  createStore: createTooltipStore,
};

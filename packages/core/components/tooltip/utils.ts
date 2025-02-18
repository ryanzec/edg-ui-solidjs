import { type Accessor, createSignal } from 'solid-js';
import * as uuid from 'uuid';

export const TooltipTriggerEvent = {
  CLICK: 'click',
  HOVER: 'hover',
  STRICT_HOVER: 'strict-hover',
} as const;

export type TooltipTriggerEvent = (typeof TooltipTriggerEvent)[keyof typeof TooltipTriggerEvent];

type CreateStoreParams = {
  defaultIsEnabled?: boolean;
  id?: string;
};

export type TooltipStore = {
  id: Accessor<string>;
  isEnabled: Accessor<boolean>;
  toggle: () => void;
  show: () => void;
  hide: () => void;
};

const createStore = (params: CreateStoreParams = {}): TooltipStore => {
  const [isEnabled, setIsEnabled] = createSignal(params.defaultIsEnabled ?? false);
  const [id] = createSignal<string>(params.id || uuid.v4());

  const toggle = () => {
    setIsEnabled(!isEnabled());
  };

  const show = () => {
    setIsEnabled(true);
  };

  const hide = () => {
    setIsEnabled(false);
  };

  return {
    isEnabled,
    toggle,
    id,
    show,
    hide,
  };
};

export const tooltipComponentUtils = {
  createStore,
};

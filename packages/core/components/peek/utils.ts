import { type Accessor, createSignal } from 'solid-js';

type CreateStoreParams = {
  defaultIsOpened?: boolean;
};

export type PeekStore = {
  isOpened: Accessor<boolean>;
  toggle: (overrideIsEnabled?: boolean) => void;
  open: () => void;
  close: () => void;
};

const createStore = (params: CreateStoreParams = {}): PeekStore => {
  const [isOpened, setIsOpened] = createSignal(params.defaultIsOpened ?? false);

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

  return {
    isOpened,
    toggle,
    open,
    close,
  };
};

export const peekComponentUtils = {
  createStore,
};

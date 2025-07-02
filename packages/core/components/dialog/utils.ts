import { createSignal } from 'solid-js';

export const DialogFooterAlignment = {
  LEFT: 'left',
  RIGHT: 'right',
} as const;

export type DialogFooterAlignment = (typeof DialogFooterAlignment)[keyof typeof DialogFooterAlignment];

export type DialogStore = {
  isOpened: () => boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

const createStore = (): DialogStore => {
  const [isOpened, setIsOpened] = createSignal<boolean>(false);

  const open = () => {
    setIsOpened(true);
  };

  const close = () => {
    setIsOpened(false);
  };

  const toggle = () => {
    setIsOpened(!isOpened());
  };

  return {
    isOpened,
    open,
    close,
    toggle,
  };
};

export const dialogComponentUtils = {
  createStore,
};

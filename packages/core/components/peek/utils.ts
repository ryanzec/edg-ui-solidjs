import type { Accessor } from 'solid-js';

export type PeekComponentRef = {
  isOpened: Accessor<boolean>;
  toggle: (overrideIsEnabled?: boolean) => void;
  open: () => void;
  close: () => void;
};

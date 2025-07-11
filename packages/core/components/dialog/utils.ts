export const DialogFooterAlignment = {
  LEFT: 'left',
  RIGHT: 'right',
} as const;

export type DialogFooterAlignment = (typeof DialogFooterAlignment)[keyof typeof DialogFooterAlignment];

export type DialogComponentRef = {
  isOpened: () => boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

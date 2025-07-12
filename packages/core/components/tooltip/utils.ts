export const TooltipTriggerEvent = {
  CLICK: 'click',
  HOVER: 'hover',
  STRICT_HOVER: 'strict-hover',
} as const;

export type TooltipTriggerEvent = (typeof TooltipTriggerEvent)[keyof typeof TooltipTriggerEvent];

export type TooltipComponentRef = {
  id: () => string;
  onlyIfScrollable: () => boolean;
  isShowing: () => boolean;
  isEnabled: () => boolean;
  setIsEnabled: (value: boolean) => void;
  toggle: () => void;
  show: () => void;
  hide: () => void;
};

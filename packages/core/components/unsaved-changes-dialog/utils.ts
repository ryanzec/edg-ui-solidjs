import type { Accessor } from 'solid-js';

export type UnsavedChangesDialogComponentRef = {
  redirectUrl: Accessor<string>;
  setRedirectUrl: (url: string) => void;
  allowLeave: Accessor<boolean>;
  setAllowLeave: (allowLeave: boolean) => void;
};

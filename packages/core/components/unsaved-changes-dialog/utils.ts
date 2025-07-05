import { type DialogStore, dialogComponentUtils } from '$/core/components/dialog';
import { loggerUtils } from '$/core/utils/logger';
import type { Navigator } from '@solidjs/router';
import { type Accessor, createSignal } from 'solid-js';

export type UnsavedChangesDialogStore = {
  redirectUrl: Accessor<string>;
  setRedirectUrl: (url: string) => void;
  allowLeave: Accessor<boolean>;
  setAllowLeave: (allowLeave: boolean) => void;
  dialogStore: DialogStore;
  handleUnsavedDialogLeave: () => void;
  handleUnsavedDialogStay: () => void;
};

export type CreateUnsavedChangesDialogOptions = {
  navigate: Navigator;
};

const createUnsavedChangesDialogStore = (options: CreateUnsavedChangesDialogOptions): UnsavedChangesDialogStore => {
  const [redirectUrl, setRedirectUrl] = createSignal<string>('');
  const [allowLeave, setAllowLeave] = createSignal<boolean>(false);
  const dialogStore = dialogComponentUtils.createStore();

  const handleUnsavedDialogLeave = () => {
    const currentLeaveUrl = redirectUrl();

    if (currentLeaveUrl === undefined) {
      loggerUtils.error('no attempted leave url found which should never happen');
      dialogStore.close();

      return;
    }

    setAllowLeave(true);
    options.navigate(currentLeaveUrl);
  };

  const handleUnsavedDialogStay = () => {
    dialogStore.close();
  };

  return {
    redirectUrl,
    setRedirectUrl,
    allowLeave,
    setAllowLeave,
    dialogStore,
    handleUnsavedDialogLeave,
    handleUnsavedDialogStay,
  };
};

export const unsavedChangesDialogComponentUtils = {
  createStore: createUnsavedChangesDialogStore,
};

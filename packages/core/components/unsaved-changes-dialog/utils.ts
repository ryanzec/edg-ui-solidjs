import type { DialogComponentRef, DialogProps } from '$/core/components/dialog';
import { createComponentRef } from '$/core/stores/component-ref';
import { loggerUtils } from '$/core/utils/logger';
import type { Navigator } from '@solidjs/router';
import { type Accessor, createSignal } from 'solid-js';

export type UnsavedChangesDialogStore = Pick<DialogProps, 'dialogComponentRef'> & {
  redirectUrl: Accessor<string>;
  setRedirectUrl: (url: string) => void;
  allowLeave: Accessor<boolean>;
  setAllowLeave: (allowLeave: boolean) => void;
  handleUnsavedDialogLeave: () => void;
  handleUnsavedDialogStay: () => void;
};

export type CreateUnsavedChangesDialogOptions = {
  navigate: Navigator;
};

const createUnsavedChangesDialogStore = (options: CreateUnsavedChangesDialogOptions): UnsavedChangesDialogStore => {
  const [redirectUrl, setRedirectUrl] = createSignal<string>('');
  const [allowLeave, setAllowLeave] = createSignal<boolean>(false);
  const dialogComponentRef = createComponentRef<DialogComponentRef>();

  const handleUnsavedDialogLeave = () => {
    const currentLeaveUrl = redirectUrl();

    if (currentLeaveUrl === undefined) {
      loggerUtils.error('no attempted leave url found which should never happen');
      dialogComponentRef.api()?.close();

      return;
    }

    setAllowLeave(true);
    options.navigate(currentLeaveUrl);
  };

  const handleUnsavedDialogStay = () => {
    dialogComponentRef.api()?.close();
  };

  return {
    redirectUrl,
    setRedirectUrl,
    allowLeave,
    setAllowLeave,
    handleUnsavedDialogLeave,
    handleUnsavedDialogStay,
    dialogComponentRef: dialogComponentRef,
  };
};

export const unsavedChangesDialogComponentUtils = {
  createStore: createUnsavedChangesDialogStore,
};

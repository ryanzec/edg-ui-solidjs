import type { DialogComponentApi, DialogProps } from '$/core/components/dialog';
import { componentApiStoreUtils } from '$/core/stores/component-api.store';
import { loggerUtils } from '$/core/utils/logger';
import type { Navigator } from '@solidjs/router';
import { type Accessor, createSignal } from 'solid-js';

export type UnsavedChangesDialogStore = Pick<DialogProps, 'onReady' | 'onCleanup'> & {
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
  const dialogComponentApiUtils = componentApiStoreUtils.createStore<DialogComponentApi>();

  const handleUnsavedDialogLeave = () => {
    const currentLeaveUrl = redirectUrl();

    if (currentLeaveUrl === undefined) {
      loggerUtils.error('no attempted leave url found which should never happen');
      dialogComponentApiUtils.api()?.close();

      return;
    }

    setAllowLeave(true);
    options.navigate(currentLeaveUrl);
  };

  const handleUnsavedDialogStay = () => {
    dialogComponentApiUtils.api()?.close();
  };

  return {
    redirectUrl,
    setRedirectUrl,
    allowLeave,
    setAllowLeave,
    handleUnsavedDialogLeave,
    handleUnsavedDialogStay,
  };
};

export const unsavedChangesDialogComponentUtils = {
  createStore: createUnsavedChangesDialogStore,
};

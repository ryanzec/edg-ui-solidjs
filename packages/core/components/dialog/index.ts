import { default as BaseDialog, type DialogProps } from '$/core/components/dialog/dialog';
import Confirmation, { type DialogConfirmationProps } from '$/core/components/dialog/dialog-confirmation';
import DeleteConfirmation, {
  type DialogDeleteConfirmationProps,
} from '$/core/components/dialog/dialog-delete-confirmation';

export type { DialogComponentRef } from '$/core/components/dialog/utils';
export type { DialogProps, DialogDeleteConfirmationProps, DialogConfirmationProps };

export const Dialog = Object.assign(BaseDialog, { DeleteConfirmation, Confirmation });

export default Dialog;

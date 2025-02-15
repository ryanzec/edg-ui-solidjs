import Dialog, { type DialogProps, defaultDialogProps } from '$/core/components/dialog/dialog';
import DeleteConfirmation, {
  type DialogDeleteConfirmationProps,
} from '$/core/components/dialog/dialog-delete-confirmation';

export { DialogFooterAlignment, dialogComponentUtils, type DialogStore } from '$/core/components/dialog/utils';

export type { DialogProps, DialogDeleteConfirmationProps };
export { defaultDialogProps };

export default Object.assign(Dialog, { DeleteConfirmation });

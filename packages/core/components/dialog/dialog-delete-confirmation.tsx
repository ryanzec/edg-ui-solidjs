import { ButtonColor } from '$/core/components/button';
import DialogConfirmation, { type DialogConfirmationProps } from '$/core/components/dialog/dialog-confirmation';
import { loggerUtils } from '$/core/utils/logger';
import { createSignal, splitProps } from 'solid-js';

export type DialogDeleteConfirmationProps<TItem> = Omit<
  DialogConfirmationProps,
  'footerElement' | 'closeOnEscape' | 'closeOnOverlayClick' | 'processConfirmation' | 'isProcessing'
> & {
  selectedItem: TItem;
  processDelete: (item: TItem) => Promise<boolean>;
};

const DialogDeleteConfirmation = <TItem,>(passedProps: DialogDeleteConfirmationProps<TItem>) => {
  const [props, restOfProps] = splitProps(passedProps, ['selectedItem', 'processDelete', 'dialogStore']);
  const [isProcessing, setIsProcessing] = createSignal(false);

  const processDelete = async () => {
    try {
      setIsProcessing(true);

      const result = await props.processDelete(props.selectedItem);

      setIsProcessing(false);

      if (result) {
        props.dialogStore.close();
      }
    } catch (error: unknown) {
      //@todo proper error handling
      loggerUtils.error(error);

      throw error;
    }
  };

  return (
    <DialogConfirmation
      {...restOfProps}
      dialogStore={props.dialogStore}
      processConfirmation={processDelete}
      isProcessing={isProcessing()}
      confirmationColor={ButtonColor.DANGER}
      confirmationText="Delete"
    />
  );
};

export default DialogDeleteConfirmation;

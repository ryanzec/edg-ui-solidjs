import { ButtonColor } from '$/core/components/button';
import DialogConfirmation, { type DialogConfirmationProps } from '$/core/components/dialog/dialog-confirmation';
import type { DialogComponentApi } from '$/core/components/dialog/utils';
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
  let dialogComponentApi: DialogComponentApi | undefined;

  const [props, restOfProps] = splitProps(passedProps, ['selectedItem', 'processDelete', 'onReady', 'onCleanup']);
  const [isProcessing, setIsProcessing] = createSignal(false);

  const handleReady = (componentApi: DialogComponentApi) => {
    dialogComponentApi = componentApi;
    props.onReady?.(componentApi);
  };

  const handleCleanup = () => {
    dialogComponentApi = undefined;
    props.onCleanup?.();
  };

  const processDelete = async () => {
    try {
      setIsProcessing(true);

      const result = await props.processDelete(props.selectedItem);

      setIsProcessing(false);

      if (result) {
        dialogComponentApi?.close();
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
      onReady={handleReady}
      onCleanup={handleCleanup}
      processConfirmation={processDelete}
      isProcessing={isProcessing()}
      confirmationColor={ButtonColor.DANGER}
      confirmationText="Delete"
    />
  );
};

export default DialogDeleteConfirmation;

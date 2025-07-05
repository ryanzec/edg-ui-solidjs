import { Icon } from '$/core/components/icon';
import Tooltip, { tooltipComponentUtils, type TooltipProps } from '$/core/components/tooltip';
import { clipboardUtils } from '$/core/utils/clipboard';
import { createEffect, createSignal, mergeProps, splitProps } from 'solid-js';

export type CopyTextProps = Omit<TooltipProps, 'tooltipStore'> & {
  text: string;
  copyLabel?: string;
};

const CopyText = (passedProps: CopyTextProps) => {
  const [props, restOfProps] = splitProps(mergeProps({ copyLabel: 'Click to copy' }, passedProps), [
    'text',
    'copyLabel',
  ]);
  const tooltipStore = tooltipComponentUtils.createStore();
  const [hasCopied, setHasCopied] = createSignal(false);

  const handleCopy = () => {
    clipboardUtils.copyToClipboard(props.text);
    setHasCopied(true);
  };

  createEffect(function updateHasCopied() {
    if (tooltipStore.isShowing()) {
      return;
    }

    setHasCopied(false);
  });

  return (
    <Tooltip data-id="copy-text" {...restOfProps} triggerEvent="hover" tooltipStore={tooltipStore} placement="bottom">
      <Tooltip.Handle data-id="handle">
        <Icon icon="copy" onClick={handleCopy} />
      </Tooltip.Handle>
      <Tooltip.Content data-id="content">{hasCopied() ? 'Copied!' : props.copyLabel}</Tooltip.Content>
    </Tooltip>
  );
};

export default CopyText;

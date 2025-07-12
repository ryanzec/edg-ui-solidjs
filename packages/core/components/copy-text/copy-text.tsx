import { Icon } from '$/core/components/icon';
import Tooltip, { type TooltipComponentRef, type TooltipProps } from '$/core/components/tooltip';
import { createComponentRef } from '$/core/stores/component-ref';
import { clipboardUtils } from '$/core/utils/clipboard';
import { createEffect, createSignal, mergeProps, splitProps } from 'solid-js';

export type CopyTextProps = Omit<TooltipProps, 'tooltipComponentRef'> & {
  text: string;
  copyLabel?: string;
};

const CopyText = (passedProps: CopyTextProps) => {
  const [props, restOfProps] = splitProps(mergeProps({ copyLabel: 'Click to copy' }, passedProps), [
    'text',
    'copyLabel',
  ]);
  const tooltipComponentRef = createComponentRef<TooltipComponentRef>();
  const [hasCopied, setHasCopied] = createSignal(false);

  const handleCopy = () => {
    clipboardUtils.copyToClipboard(props.text);
    setHasCopied(true);
  };

  createEffect(function updateHasCopied() {
    if (tooltipComponentRef.api()?.isShowing()) {
      return;
    }

    setHasCopied(false);
  });

  return (
    <Tooltip
      data-id="copy-text"
      {...restOfProps}
      triggerEvent="hover"
      tooltipComponentRef={tooltipComponentRef}
      placement="bottom"
    >
      <Tooltip.Handle data-id="handle">
        <Icon icon="copy" onClick={handleCopy} />
      </Tooltip.Handle>
      <Tooltip.Content data-id="content">{hasCopied() ? 'Copied!' : props.copyLabel}</Tooltip.Content>
    </Tooltip>
  );
};

export default CopyText;

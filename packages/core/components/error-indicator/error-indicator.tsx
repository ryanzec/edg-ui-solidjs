import { mergeProps, splitProps } from 'solid-js';
import Button, { ButtonVariant } from '$/core/components/button';
import Callout, { CalloutColor, type CalloutProps, CalloutVariant } from '$/core/components/callout';

export type ErrorIndicatorProps = CalloutProps & {
  label: string;
  actionLabel: string;
  onTriggerAction: () => void;
};

const EmptyIndicator = (passedProps: ErrorIndicatorProps) => {
  const [props, restOfProps] = splitProps(mergeProps({}, passedProps), [
    'label',
    'actionLabel',
    'onTriggerAction',
    'class',
  ]);

  return (
    <Callout {...restOfProps} variant={CalloutVariant.WEAK} color={CalloutColor.DANGER}>
      {props.label}&nbsp;
      <Button variant={ButtonVariant.GHOST} onClick={props.onTriggerAction}>
        {props.actionLabel}
      </Button>
    </Callout>
  );
};

export default EmptyIndicator;

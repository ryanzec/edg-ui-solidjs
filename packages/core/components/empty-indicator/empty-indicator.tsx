import { tailwindUtils } from '$/core/utils/tailwind';
import { type JSX, Show, splitProps } from 'solid-js';

import Button from '$/core/components/button';
import styles from '$/core/components/empty-indicator/empty-indicator.module.css';

export type EmptyIndicatorProps = JSX.HTMLAttributes<HTMLDivElement> & {
  label: string;
  actionLabel?: string;
  onTriggerAction?: () => void;
};

const EmptyIndicator = (passedProps: EmptyIndicatorProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['class', 'label', 'actionLabel', 'onTriggerAction']);

  return (
    <div data-id="empty-indicator" {...restOfProps} class={tailwindUtils.merge(styles.emptyIndicator, props.class)}>
      {props.label}
      <Show when={props.actionLabel && props.onTriggerAction}>
        <Button onClick={props.onTriggerAction}>{props.actionLabel}</Button>
      </Show>
    </div>
  );
};

export default EmptyIndicator;

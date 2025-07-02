import Button from '$/core/components/button';
import styles from '$/core/components/empty-indicator/empty-indicator.module.css';
import Typography, { TypographySize } from '$/core/components/typography';
import { tailwindUtils } from '$/core/utils/tailwind';
import { type JSX, Show, mergeProps, splitProps } from 'solid-js';

export type EmptyIndicatorProps = Omit<JSX.HTMLAttributes<HTMLDivElement>, 'class'> & {
  label: string;
  actionLabel?: string;
  onTriggerAction?: () => void;
  noBorder?: boolean;
};

const EmptyIndicator = (passedProps: EmptyIndicatorProps) => {
  const [props, restOfProps] = splitProps(mergeProps({}, passedProps), [
    'label',
    'actionLabel',
    'onTriggerAction',
    'noBorder',
  ]);

  return (
    <div
      data-id="empty-indicator"
      class={tailwindUtils.merge(styles.emptyIndicator, {
        [styles.noBorder]: props.noBorder,
      })}
      {...restOfProps}
    >
      <Typography size={TypographySize.EXTRA_LARGE}>{props.label}</Typography>
      <Show when={props.actionLabel && props.onTriggerAction}>
        <Button onClick={props.onTriggerAction}>{props.actionLabel}</Button>
      </Show>
    </div>
  );
};

export default EmptyIndicator;

import classnames from 'classnames';
import { type JSX, Show, splitProps } from 'solid-js';

import styles from '$/core/components/card/card.module.css';
import Typography, { TypographySize } from '$/core/components/typography';

export type CardHeaderProps = JSX.HTMLAttributes<HTMLDivElement> & {
  preItem?: JSX.Element;
  postItem?: JSX.Element;
  label?: string;
  subLabel?: JSX.Element;
};
const CardHeader = (passedProps: CardHeaderProps) => {
  const [props, restOfProps] = splitProps(passedProps, [
    'children',
    'class',
    'label',
    'preItem',
    'postItem',
    'subLabel',
  ]);

  return (
    <div data-id="header" class={classnames(styles.header, props.class)} {...restOfProps}>
      <Show when={props.preItem}>
        <div class={styles.headerPreItem}>{props.preItem}</div>
      </Show>
      <div>
        <Show when={props.label}>
          <Typography size={TypographySize.LARGE}>{props.label}</Typography>
        </Show>
        <Show when={props.subLabel}>
          <Typography>{props.subLabel}</Typography>
        </Show>
      </div>
      <Show when={props.postItem}>
        <div class={styles.headerPostItem}>{props.postItem}</div>
      </Show>
    </div>
  );
};

export default CardHeader;

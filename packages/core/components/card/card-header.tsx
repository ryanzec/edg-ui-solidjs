import { tailwindUtils } from '$/core/utils/tailwind';
import { type JSX, Show, splitProps } from 'solid-js';

import styles from '$/core/components/card/card.module.css';
import Typography, { TypographySize } from '$/core/components/typography';

export type CardHeaderProps = JSX.HTMLAttributes<HTMLDivElement> & {
  preElement?: JSX.Element;
  postElement?: JSX.Element;
  label?: string;
  subLabelElement?: JSX.Element;
};
const CardHeader = (passedProps: CardHeaderProps) => {
  const [props, restOfProps] = splitProps(passedProps, [
    'children',
    'class',
    'label',
    'preElement',
    'postElement',
    'subLabelElement',
  ]);

  return (
    <div data-id="header" class={tailwindUtils.merge(styles.header, props.class)} {...restOfProps}>
      <Show when={props.preElement}>
        <div class={styles.headerPreItem}>{props.preElement}</div>
      </Show>
      <div>
        <Show when={props.label}>
          <Typography size={TypographySize.LARGE}>{props.label}</Typography>
        </Show>
        <Show when={props.subLabelElement}>
          <Typography>{props.subLabelElement}</Typography>
        </Show>
      </div>
      <Show when={props.postElement}>
        <div class={styles.headerPostItem}>{props.postElement}</div>
      </Show>
    </div>
  );
};

export default CardHeader;

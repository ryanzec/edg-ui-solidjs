import { splitProps } from 'solid-js';
import Icon from '$/core/components/icon';
import styles from '$/core/components/peek/peek.module.css';
import Typography, { type TypographyProps, TypographySize } from '$/core/components/typography';
import type { CommonDataAttributes } from '$/core/types/generic';
import { tailwindUtils } from '$/core/utils/tailwind';

export type PeekHeaderProps = TypographyProps &
  CommonDataAttributes & {
    title: string;
  };

const PeekHeader = (passedProps: PeekHeaderProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['children', 'class', 'title']);

  return (
    <Typography
      size={TypographySize.EXTRA_LARGE}
      data-id="header"
      {...restOfProps}
      class={tailwindUtils.merge(styles.peekHeader, props.class)}
    >
      {props.title}
      <Icon data-peek-close icon="x" isClickable />
    </Typography>
  );
};

export default PeekHeader;

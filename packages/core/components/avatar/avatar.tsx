import classnames from 'classnames';
import { Show, mergeProps, splitProps } from 'solid-js';

import styles from '$/core/components/avatar/avatar.module.css';
import Typography, { TypographyColor, type TypographyProps } from '$/core/components/typography';

export type AvatarProps = TypographyProps & {
  src?: string;
  label?: string;
  count?: number;
  isClickable?: boolean;
};

const Avatar = (passedProps: AvatarProps) => {
  const [props, restOfProps] = splitProps(mergeProps({ count: 0 }, passedProps), [
    'src',
    'label',
    'count',
    'isClickable',
    'class',
  ]);

  const getLabel = () => {
    let label = props.label;

    if (props.count > 0) {
      label = `+${props.count > 99 ? '99' : props.count}`;
    }

    return label;
  };

  return (
    <Typography
      data-id="avatar"
      color={TypographyColor.NONE}
      {...restOfProps}
      class={classnames(styles.avatar, props.class, {
        [styles.clickable]: props.isClickable,
      })}
    >
      <Show when={props.src}>
        <img alt="avatar visual" src={props.src} />
      </Show>
      <Show when={!props.src}>{getLabel()}</Show>
    </Typography>
  );
};

export default Avatar;

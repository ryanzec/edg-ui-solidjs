import classnames from 'classnames';
import { type JSX, Show, mergeProps, splitProps } from 'solid-js';

import styles from '$/core/components/avatar/avatar.module.css';
import type { CommonDataAttributes } from '$/core/types/generic';

export type AvatarProps = JSX.HTMLAttributes<HTMLDivElement> &
  CommonDataAttributes & {
    src?: string;
    label?: string;
    count?: number;
  };

const Avatar = (passedProps: AvatarProps) => {
  const [props, restOfProps] = splitProps(mergeProps({ count: 0 }, passedProps), [
    'children',
    'class',
    'src',
    'label',
    'count',
  ]);

  const getLabel = () => {
    let label = props.label;

    if (props.count > 0) {
      label = `+${props.count > 99 ? '99' : props.count}`;
    }

    return label;
  };

  return (
    <div data-id="avatar" {...restOfProps} class={classnames(styles.avatar, props.class)}>
      <Show when={props.src}>
        <img alt="avatar inage" src={props.src} />
      </Show>
      <Show when={!props.src}>{getLabel()}</Show>
    </div>
  );
};

export default Avatar;

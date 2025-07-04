import { tailwindUtils } from '$/core/utils/tailwind';
import { type JSX, mergeProps, splitProps } from 'solid-js';

import Icon, { type IconProps, IconColor, IconSize } from '$/core/components/icon';
import styles from '$/core/components/loading/loading.module.css';

export type LoadingProps = JSX.HTMLAttributes<HTMLDivElement> & {
  iconSize?: IconProps['size'];
  iconColor?: IconProps['color'];
};

// @todo get a design for how the application should look while the application is doing the
// @todo initial load (for authentication data, feature flags, etc.) and implement it here
const Loading = (passedProps: LoadingProps) => {
  const [props, restOfProps] = splitProps(
    mergeProps({ iconSize: IconSize.BASE, iconColor: IconColor.INHERIT }, passedProps),
    ['class', 'iconSize', 'iconColor'],
  );

  return (
    <div data-id="loading" {...restOfProps} class={tailwindUtils.merge(props.class, styles.loading)}>
      <Icon icon="spinner" size={props.iconSize} class={styles.icon} color={props.iconColor} />
    </div>
  );
};

export default Loading;

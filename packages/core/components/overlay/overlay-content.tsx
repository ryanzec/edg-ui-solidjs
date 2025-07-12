import styles from '$/core/components/overlay/overlay.module.css';
import { tailwindUtils } from '$/core/utils/tailwind';
import { type JSX, splitProps } from 'solid-js';
import { Portal } from 'solid-js/web';

const OverlayContent = (passedProps: JSX.HTMLAttributes<HTMLDivElement>) => {
  const [props, restOfProps] = splitProps(passedProps, ['class']);

  return (
    <Portal>
      <div data-id="content" {...restOfProps} class={tailwindUtils.merge(styles.content, props.class)} />
    </Portal>
  );
};

export default OverlayContent;

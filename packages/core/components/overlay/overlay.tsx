import { mergeProps, splitProps } from 'solid-js';
import { Portal } from 'solid-js/web';
import styles from '$/core/components/overlay/overlay.module.css';
import { defaultOverlayProps, type OverlayProps, OverlayVariant } from '$/core/components/overlay/utils';
import { tailwindUtils } from '$/core/utils/tailwind';

const Overlay = (passedProps: OverlayProps) => {
  const [props, restOfProps] = splitProps(mergeProps(defaultOverlayProps, passedProps), ['class', 'variant']);

  return (
    <Portal>
      <button
        data-id="overlay"
        {...restOfProps}
        type="button"
        class={tailwindUtils.merge(styles.overlay, props.class, {
          [styles.strong]: props.variant === OverlayVariant.STRONG,
          [styles.weak]: props.variant === OverlayVariant.WEAK,
        })}
      />
    </Portal>
  );
};

export default Overlay;

import { mergeProps, splitProps } from 'solid-js';

import styles from '$/core/components/overlay/overlay.module.css';
import { type OverlayProps, OverlayVariant, defaultOverlayProps } from '$/core/components/overlay/utils';
import { tailwindUtils } from '$/core/utils/tailwind';

const OverlayLocal = (passedProps: OverlayProps) => {
  const [props, restOfProps] = splitProps(mergeProps(defaultOverlayProps, passedProps), ['class', 'variant']);

  return (
    <button
      data-id="overlay"
      {...restOfProps}
      type="button"
      class={tailwindUtils.merge(
        styles.overlay,
        styles.overlayLocal,
        {
          [styles.strong]: props.variant === OverlayVariant.STRONG,
          [styles.weak]: props.variant === OverlayVariant.WEAK,
        },
        props.class,
      )}
    />
  );
};

export default OverlayLocal;

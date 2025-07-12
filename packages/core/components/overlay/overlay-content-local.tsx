import { type JSX, splitProps } from 'solid-js';

import styles from '$/core/components/overlay/overlay.module.css';
import { tailwindUtils } from '$/core/utils/tailwind';

type OverlayContentLocalProps = JSX.HTMLAttributes<HTMLDivElement> & {
  class?: string;
};

const OverlayContentLocal = (passedProps: OverlayContentLocalProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['class']);

  return (
    <div
      data-id="content"
      {...restOfProps}
      class={tailwindUtils.merge(styles.content, styles.contentLocal, props.class)}
    />
  );
};

export default OverlayContentLocal;

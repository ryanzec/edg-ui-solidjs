import { type JSX, mergeProps, splitProps, useContext } from 'solid-js';

import { TooltipContext } from '$/core/components/tooltip/tooltip';
import styles from '$/core/components/tooltip/tooltip.module.css';
import { loggerUtils } from '$/core/utils/logger';
import { tailwindUtils } from '$/core/utils/tailwind';

export type TooltipHandleProps = JSX.HTMLAttributes<HTMLSpanElement> & {
  isStyled?: boolean;
};

const TooltipHandle = (passedProps: TooltipHandleProps) => {
  const [props, restOfProps] = splitProps(mergeProps({ isStyled: true }, passedProps), ['class', 'isStyled']);
  const context = useContext(TooltipContext);

  if (!context) {
    loggerUtils.error('tooltip content must be wrapper is a tooltip context');
    // @todo(log) log error to backend?

    return;
  }

  return (
    <span
      data-id="handle"
      data-tooltip-handle={context.id()}
      class={tailwindUtils.merge(
        {
          [styles.handle]: props.isStyled,
        },
        props.class,
      )}
      {...restOfProps}
    />
  );
};

export default TooltipHandle;

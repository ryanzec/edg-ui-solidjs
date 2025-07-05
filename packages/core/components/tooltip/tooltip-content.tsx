import { type JSX, mergeProps, splitProps, useContext } from 'solid-js';

import { TooltipContext } from '$/core/components/tooltip/tooltip';
import styles from '$/core/components/tooltip/tooltip.module.css';
import { loggerUtils } from '$/core/utils/logger';
import { tailwindUtils } from '$/core/utils/tailwind';
import { Portal } from 'solid-js/web';

export type TooltipContentProps = JSX.HTMLAttributes<HTMLDivElement> & {
  isStyled?: boolean;
};

const TooltipContent = (passedProps: TooltipContentProps) => {
  const [props, restOfProps] = splitProps(mergeProps({ isStyled: true }, passedProps), ['class', 'isStyled']);
  const context = useContext(TooltipContext);

  if (!context) {
    loggerUtils.error('tooltip content must be wrapper is a tooltip context');
    // @todo(log) log error to backend?

    return;
  }

  return (
    <Portal>
      <div
        data-id="tooltip-content"
        data-tooltip-content={context.id()}
        class={tailwindUtils.merge(styles.content, props.class, {
          [styles.contentIsEnabled]: context.isShowing(),
          [styles.contentStyled]: props.isStyled,
        })}
        {...restOfProps}
      />
    </Portal>
  );
};

export default TooltipContent;

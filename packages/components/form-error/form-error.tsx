import classnames from 'classnames';
import getScrollParent from 'scrollparent';
import { type JSX, createEffect, createSignal, mergeProps, splitProps } from 'solid-js';

import Callout, { CalloutColor, type CalloutProps, CalloutVariant } from '$/components/callout';
import styles from '$/components/form-error/form-error.module.css';

export type FormErrorProps = CalloutProps & {
  errorMessage?: string;
  offset?: number;
  behavior?: ScrollBehavior;
};

const FormError = (passedProps: FormErrorProps) => {
  let formErrorRef: HTMLDivElement | undefined;

  const [props, restOfProps] = splitProps(mergeProps({ offset: 10, behavior: 'auto' as ScrollBehavior }, passedProps), [
    'errorMessage',
    'offset',
    'behavior',
  ]);

  const [hasShownFormError, setHasShownFormError] = createSignal(false);

  // handles scrolling to the form error component when it is first displayed
  createEffect(() => {
    if (hasShownFormError() || !props.errorMessage || !formErrorRef) {
      // this will reset if we have shown the error once it is remove making sure if it is displayed again, we will
      // scroll to it again
      setHasShownFormError(!!props.errorMessage);

      return;
    }

    const scrollParentElement = getScrollParent(formErrorRef);

    if (!scrollParentElement) {
      return;
    }

    setHasShownFormError(true);

    const desiredY = formErrorRef.offsetTop + props.offset * -1;

    scrollParentElement.scrollTo({ top: desiredY, behavior: props.behavior });
  });

  return (
    <Callout
      ref={formErrorRef}
      data-id="form-error"
      {...restOfProps}
      // we use css to hide the element instead of <Show /> because we need the element to be present in the dom
      // for the ref to work properly
      class={classnames(styles.formError, {
        [styles.formErrorHidden]: !props.errorMessage,
      })}
      color={CalloutColor.DANGER}
    >
      {props.errorMessage}
    </Callout>
  );
};

export default FormError;

import { tailwindUtils } from '$/core/utils/tailwind';
import getScrollParent from 'scrollparent';
import { For, Show, createEffect, createSignal, mergeProps, splitProps } from 'solid-js';

import Callout, { CalloutColor, type CalloutProps } from '$/core/components/callout';
import styles from '$/core/components/form-error/form-error.module.css';

export type FormErrorProps = CalloutProps & {
  errorMessage?: string | string[];
  offset?: number;
  behavior?: ScrollBehavior;
};

const FormError = (passedProps: FormErrorProps) => {
  let formErrorElement: HTMLDivElement | undefined;

  const [props, restOfProps] = splitProps(mergeProps({ offset: 10, behavior: 'auto' as ScrollBehavior }, passedProps), [
    'errorMessage',
    'offset',
    'behavior',
  ]);

  const [hasShownFormError, setHasShownFormError] = createSignal(false);

  const errorMessages = () => {
    return Array.isArray(props.errorMessage) ? props.errorMessage : [props.errorMessage];
  };

  createEffect(function scrollToFormErrorOnFirstRender() {
    if (hasShownFormError() || !props.errorMessage || !formErrorElement) {
      // this will reset if we have shown the error once it is remove making sure if it is displayed again, we will
      // scroll to it again
      setHasShownFormError(!!props.errorMessage);

      return;
    }

    const scrollParentElement = getScrollParent(formErrorElement);

    if (!scrollParentElement) {
      return;
    }

    setHasShownFormError(true);

    const desiredY = formErrorElement.offsetTop + props.offset * -1;

    scrollParentElement.scrollTo({ top: desiredY, behavior: props.behavior });
  });

  return (
    <Show when={errorMessages().length > 0}>
      <Callout
        ref={formErrorElement}
        data-id="form-error"
        {...restOfProps}
        // we use css to hide the element instead of <Show /> because we need the element to be present in the dom
        // for the ref to work properly
        class={tailwindUtils.merge(styles.formError, {
          [styles.formErrorHidden]: !props.errorMessage,
        })}
        color={CalloutColor.DANGER}
      >
        <For each={errorMessages()}>{(errorMessage) => <div>{errorMessage}</div>}</For>
      </Callout>
    </Show>
  );
};

export default FormError;

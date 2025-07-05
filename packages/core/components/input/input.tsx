import { tailwindUtils } from '$/core/utils/tailwind';
import { type Accessor, type JSX, Show, createSignal, mergeProps, onMount, splitProps, useContext } from 'solid-js';

import { FormFieldContext } from '$/core/components/form-field';
import styles from '$/core/components/input/input.module.css';
import { type DefaultFormData, FormInputValidationState } from '$/core/stores/form.store';
import { loggerUtils } from '$/core/utils/logger';

export type InputProps<TFormData = DefaultFormData> = Omit<JSX.InputHTMLAttributes<HTMLInputElement>, 'name'> & {
  preElement?: JSX.Element;
  preItemIsInline?: boolean;
  postElement?: JSX.Element;
  inlineElement?: JSX.Element;
  postItemIsClickable?: boolean;
  inputContainerClass?: string;
  includeReadonlyStyles?: false;
  name?: keyof TFormData;
  selectAllOnFocus?: boolean;
  useTruePassword?: boolean;

  // while not directly used, used to infer the type for name to give properly type checking on that property
  formData?: Accessor<Partial<TFormData>>;
};

const Input = <TFormData = DefaultFormData>(passedProps: InputProps<TFormData>) => {
  const [props, restOfProps] = splitProps(
    mergeProps({ preItemIsInline: false, includeReadonlyStyles: true, selectAllOnFocus: false }, passedProps),
    [
      'class',
      'onFocus',
      'onBlur',
      'disabled',
      'readonly',
      'preElement',
      'preItemIsInline',
      'postElement',
      'inlineElement',
      'postItemIsClickable',
      'inputContainerClass',
      'includeReadonlyStyles',
      'formData',
      'name',
      'selectAllOnFocus',
      'type',
      'useTruePassword',

      // autofocus does not seem to work by default is some contexts (like is dialogs) so manually dealing with it
      'autofocus',
    ],
  );

  const [inputElementRef, setInputElementRef] = createSignal<HTMLInputElement>();
  const [isInputFocused, setIsInputFocused] = createSignal(false);

  const formFieldContext = useContext(FormFieldContext);

  if (!formFieldContext) {
    loggerUtils.log('input elements that are not wrapped in a form field will not have validation');
  }

  const handleFocus: JSX.EventHandlerUnion<HTMLInputElement, FocusEvent> = (event) => {
    setIsInputFocused(true);

    if (props.selectAllOnFocus) {
      inputElementRef()?.select();
    }

    if (props.onFocus) {
      const eventHandler = props.onFocus as JSX.EventHandler<HTMLInputElement, FocusEvent>;

      eventHandler(event);
    }
  };

  const handleBlur: JSX.EventHandlerUnion<HTMLInputElement, FocusEvent> = (event) => {
    setIsInputFocused(false);

    if (props.onBlur) {
      const eventHandler = props.onBlur as JSX.EventHandler<HTMLInputElement, FocusEvent>;

      eventHandler(event);
    }
  };

  const handleClickContainer = () => {
    inputElementRef()?.focus();
  };

  const isFocused = () => isInputFocused() && !props.disabled;

  onMount(() => {
    if (props.autofocus !== true) {
      return;
    }

    inputElementRef()?.focus();
  });

  return (
    <button
      type="button"
      class={tailwindUtils.merge(styles.container, {
        [styles.containerDisabled]: props.disabled,
        [styles.containerReadonly]: props.readonly && props.includeReadonlyStyles,
        [styles.containerFocus]: isFocused(),
        [styles.containerInvalid]: formFieldContext?.validationState() === FormInputValidationState.INVALID,
        [styles.containerWithPreItem]: !!props.preElement,
        [styles.containerWithInlinePreItem]: props.preItemIsInline,
        [styles.containerWithPostItem]: !!props.postElement,
      })}
      onClick={handleClickContainer}
      tabindex="-1"
    >
      <div class={tailwindUtils.merge(styles.inputContainer, props.inputContainerClass)}>
        <Show when={props.preElement}>
          <div
            class={tailwindUtils.merge(styles.preItem, {
              [styles.preItemInline]: props.preItemIsInline,
            })}
          >
            {props.preElement}
          </div>
        </Show>
        <div class={styles.inputInnerContainer}>
          <Show when={!!props.inlineElement}>{props.inlineElement}</Show>
          <input
            data-id="input"
            ref={setInputElementRef}
            {...restOfProps}
            type={props.type !== 'password' || props.useTruePassword ? props.type : 'text'}
            name={props.name as string}
            class={tailwindUtils.merge(styles.input, props.class, {
              [styles.password]: props.type === 'password',
            })}
            disabled={props.disabled}
            readonly={props.readonly}
            onFocus={handleFocus}
            onBlur={handleBlur}
            autocomplete="off"
          />
        </div>
        <Show when={props.postElement}>
          <div
            class={tailwindUtils.merge(styles.postItem, {
              [styles.postItemIsClickable]: !!props.postItemIsClickable,
            })}
          >
            {props.postElement}
          </div>
        </Show>
      </div>
    </button>
  );
};

export default Input;

import classnames from 'classnames';
import { type Accessor, type JSX, Show, createSignal, mergeProps, onMount, splitProps, useContext } from 'solid-js';

import { FormFieldContext } from '$/core/components/form-field';
import styles from '$/core/components/input/input.module.css';
import { type DefaultFormData, FormInputValidationState } from '$/core/stores/form.store';
import { loggerUtils } from '$/core/utils/logger';

export type InputProps<TFormData = DefaultFormData> = Omit<JSX.InputHTMLAttributes<HTMLInputElement>, 'name'> & {
  preItem?: JSX.Element;
  preItemIsInline?: boolean;
  postItem?: JSX.Element;
  inlineItem?: JSX.Element;
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
      'preItem',
      'preItemIsInline',
      'postItem',
      'inlineItem',
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

  const [inputElement, setInputElement] = createSignal<HTMLInputElement>();
  const [isInputFocused, setIsInputFocused] = createSignal(false);

  const inputRef = (element: HTMLInputElement) => {
    setInputElement(element);
  };

  const formFieldContext = useContext(FormFieldContext);

  if (!formFieldContext) {
    loggerUtils.log('input elements that are not wrapped in a form field will not have validation');
  }

  const handleFocus: JSX.EventHandlerUnion<HTMLInputElement, FocusEvent> = (event) => {
    setIsInputFocused(true);

    if (props.selectAllOnFocus) {
      inputElement()?.select();
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
    inputElement()?.focus();
  };

  const isFocused = () => isInputFocused() && !props.disabled;

  onMount(() => {
    if (props.autofocus !== true) {
      return;
    }

    inputElement()?.focus();
  });

  return (
    <button
      type="button"
      class={classnames(styles.container, {
        [styles.containerDisabled]: props.disabled,
        [styles.containerReadonly]: props.readonly && props.includeReadonlyStyles,
        [styles.containerFocus]: isFocused(),
        [styles.containerInvalid]: formFieldContext?.validationState() === FormInputValidationState.INVALID,
        [styles.containerWithPreItem]: !!props.preItem,
        [styles.containerWithInlinePreItem]: props.preItemIsInline,
        [styles.containerWithPostItem]: !!props.postItem,
      })}
      onClick={handleClickContainer}
      tabindex="-1"
    >
      <div class={classnames(styles.inputContainer, props.inputContainerClass)}>
        <Show when={props.preItem}>
          <div
            class={classnames(styles.preItem, {
              [styles.preItemInline]: props.preItemIsInline,
            })}
          >
            {props.preItem}
          </div>
        </Show>
        <div class={styles.inputInnerContainer}>
          <Show when={!!props.inlineItem}>{props.inlineItem}</Show>
          <input
            data-id="input"
            ref={inputRef}
            {...restOfProps}
            type={props.type !== 'password' || props.useTruePassword ? props.type : 'text'}
            name={props.name as string}
            class={classnames(styles.input, props.class, {
              [styles.password]: props.type === 'password',
            })}
            disabled={props.disabled}
            readonly={props.readonly}
            onFocus={handleFocus}
            onBlur={handleBlur}
            autocomplete="off"
          />
        </div>
        <Show when={props.postItem}>
          <div
            class={classnames(styles.postItem, {
              [styles.postItemIsClickable]: !!props.postItemIsClickable,
            })}
          >
            {props.postItem}
          </div>
        </Show>
      </div>
    </button>
  );
};

export default Input;

import { type Accessor, createSignal, type JSX, mergeProps, onMount, splitProps, useContext } from 'solid-js';
import { FormFieldContext } from '$/core/components/form-field';
import styles from '$/core/components/textarea/textarea.module.css';
import { type DefaultFormData, FormInputValidationState } from '$/core/stores/form.store';
import { loggerUtils } from '$/core/utils/logger';
import { tailwindUtils } from '$/core/utils/tailwind';

export type TextareaProps<TFormData = DefaultFormData> = Omit<
  JSX.TextareaHTMLAttributes<HTMLTextAreaElement>,
  'name'
> & {
  name?: keyof TFormData;
  selectAllOnFocus?: boolean;
  submitOnEnter?: boolean;

  // while not directly used, used to infer the type for name to give properly type checking on that property
  formData?: Accessor<Partial<TFormData>>;
};

const Textarea = <TFormData = DefaultFormData>(passedProps: TextareaProps<TFormData>) => {
  const [props, restOfProps] = splitProps(mergeProps({ selectAllOnFocus: false, submitOnEnter: false }, passedProps), [
    'class',
    'name',
    'formData',
    'selectAllOnFocus',
    'submitOnEnter',
    'onFocus',
    'onKeyDown',

    // autofocus does not seem to work by default is some contexts (like is dialogs) so manually dealing with it
    'autofocus',
  ]);

  const formFieldContext = useContext(FormFieldContext);

  if (!formFieldContext) {
    loggerUtils.log('input elements that are not wrapped in a form field will not have validation');
  }

  const [textareaElementRef, setTextareaElementRef] = createSignal<HTMLTextAreaElement>();

  const handleFocus: JSX.EventHandlerUnion<HTMLTextAreaElement, FocusEvent> = (event) => {
    if (props.selectAllOnFocus) {
      textareaElementRef()?.select();
    }

    if (props.onFocus) {
      const eventHandler = props.onFocus as JSX.EventHandler<HTMLTextAreaElement, FocusEvent>;

      eventHandler(event);
    }
  };

  const handleKeyDown: JSX.EventHandlerUnion<HTMLTextAreaElement, KeyboardEvent> = (event) => {
    if (props.submitOnEnter && event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();

      const form = textareaElementRef()?.closest('form');
      if (form) {
        form.requestSubmit();
      }
    }

    if (props.onKeyDown) {
      const eventHandler = props.onKeyDown as JSX.EventHandler<HTMLTextAreaElement, KeyboardEvent>;
      eventHandler(event);
    }
  };

  onMount(() => {
    if (props.autofocus !== true) {
      return;
    }

    textareaElementRef()?.focus();
  });

  return (
    <textarea
      data-id="textarea"
      ref={setTextareaElementRef}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      {...restOfProps}
      name={props.name as string}
      class={tailwindUtils.merge(styles.textarea, props.class, {
        [styles.invalid]: formFieldContext?.validationState() === FormInputValidationState.INVALID,
      })}
    />
  );
};

export default Textarea;

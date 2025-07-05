import { tailwindUtils } from '$/core/utils/tailwind';
import { type Accessor, type JSX, createSignal, mergeProps, onMount, splitProps, useContext } from 'solid-js';

import { FormFieldContext } from '$/core/components/form-field';
import styles from '$/core/components/textarea/textarea.module.css';
import { type DefaultFormData, FormInputValidationState } from '$/core/stores/form.store';
import { loggerUtils } from '$/core/utils/logger';

export type TextareaProps<TFormData = DefaultFormData> = Omit<
  JSX.TextareaHTMLAttributes<HTMLTextAreaElement>,
  'name'
> & {
  name?: keyof TFormData;
  selectAllOnFocus?: boolean;

  // while not directly used, used to infer the type for name to give properly type checking on that property
  formData?: Accessor<Partial<TFormData>>;
};

const Textarea = <TFormData = DefaultFormData>(passedProps: TextareaProps<TFormData>) => {
  const [props, restOfProps] = splitProps(mergeProps({ selectAllOnFocus: false }, passedProps), [
    'class',
    'name',
    'formData',
    'selectAllOnFocus',
    'selectAllOnFocus',
    'onFocus',

    // autofocus does not seem to work by default is some contexts (like is dialogs) so manually dealing with it
    'autofocus',
  ]);

  const formFieldContext = useContext(FormFieldContext);

  if (!formFieldContext) {
    loggerUtils.log('input elements that are not wrapped in a form field will not have validation');
  }

  const [textareaElement, setTextareaElement] = createSignal<HTMLTextAreaElement>();

  const textareaRef = (element: HTMLTextAreaElement) => {
    setTextareaElement(element);
  };

  const handleFocus: JSX.EventHandlerUnion<HTMLTextAreaElement, FocusEvent> = (event) => {
    if (props.selectAllOnFocus) {
      textareaElement()?.select();
    }

    if (props.onFocus) {
      const eventHandler = props.onFocus as JSX.EventHandler<HTMLTextAreaElement, FocusEvent>;

      eventHandler(event);
    }
  };

  onMount(() => {
    if (props.autofocus !== true) {
      return;
    }

    textareaElement()?.focus();
  });

  return (
    <textarea
      data-id="textarea"
      ref={textareaRef}
      onFocus={handleFocus}
      {...restOfProps}
      name={props.name as string}
      class={tailwindUtils.merge(styles.textarea, props.class, {
        [styles.invalid]: formFieldContext?.validationState() === FormInputValidationState.INVALID,
      })}
    />
  );
};

export default Textarea;

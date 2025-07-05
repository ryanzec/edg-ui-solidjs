import { type Accessor, type JSX, Show, createSignal, splitProps, useContext } from 'solid-js';

import styles from '$/core/components/checkbox/checkbox.module.css';
import { type DefaultFormData, formDataAttribute } from '$/core/stores/form.store';
import { loggerUtils } from '$/core/utils/logger';
import { tailwindUtils } from '$/core/utils/tailwind';
import { FormFieldContext } from '../form-field';

export type CheckboxToggleProps<TFormData = DefaultFormData> = Omit<
  JSX.InputHTMLAttributes<HTMLInputElement>,
  'name'
> & {
  labelElement: JSX.Element;
  alignEnd?: boolean;
  alternateValue?: string;
  alternateLabelElement?: JSX.Element;
  inputRef?: (element: HTMLInputElement) => void;
  name?: keyof TFormData;

  // while not directly used, used to infer the type for name to give properly type checking on that property
  formData?: Accessor<Partial<TFormData>>;
};

// we exposed a plain input in the off chance we need an input not hooked up to react-hook-form directly (like the
// auto complete component)
const CheckboxToggle = <TFormData = DefaultFormData>(passedProps: CheckboxToggleProps<TFormData>) => {
  const [props, restOfProps] = splitProps(passedProps, [
    'class',
    'labelElement',
    'alignEnd',
    'alternateValue',
    'alternateLabelElement',
    'inputRef',
    'name',
    'formData',
  ]);

  const [inputElementRef, setInputElementRef] = createSignal<HTMLInputElement>();

  const formFieldContext = useContext(FormFieldContext);

  if (!formFieldContext) {
    loggerUtils.log('input elements that are not wrapped in a form field will not have validation');
  }

  const getDynamicAttributes = () => {
    const dynamicAttributes: Record<string, string> = {};

    if (props.alternateValue) {
      dynamicAttributes[formDataAttribute.ALTERNATE_VALUE] = props.alternateValue.toString();
    }

    return dynamicAttributes;
  };

  const internalSetInputElementRef = (element: HTMLInputElement) => {
    setInputElementRef(element);
    passedProps.inputRef?.(element);
  };

  return (
    <label class={tailwindUtils.merge(styles.toggleContainer)}>
      <Show when={props.alternateValue}>{props.alternateLabelElement}</Show>
      <input
        data-id="checkbox-toggle"
        {...restOfProps}
        {...getDynamicAttributes()}
        ref={internalSetInputElementRef}
        type="checkbox"
        class={tailwindUtils.merge(
          styles.toggle,
          {
            [styles.hasAlternateValue]: props.alternateLabelElement !== undefined,
          },
          props.class,
        )}
        name={props.name as string}
      />
      {props.labelElement}
    </label>
  );
};

// by default, we should be using the input the auto hooks with react-hook-form
export default CheckboxToggle;

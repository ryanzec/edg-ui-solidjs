import { tailwindUtils } from '$/core/utils/tailwind';
import { type Accessor, type JSX, Show, createEffect, createSignal, splitProps, useContext } from 'solid-js';

import styles from '$/core/components/checkbox/checkbox.module.css';
import { FormFieldContext } from '$/core/components/form-field';
import Icon from '$/core/components/icon';
import type { IconName } from '$/core/components/icon/utils';
import type { DefaultFormData } from '$/core/stores/form.store';
import { loggerUtils } from '$/core/utils/logger';

export type CheckboxProps<TFormData = DefaultFormData> = Omit<JSX.InputHTMLAttributes<HTMLInputElement>, 'name'> & {
  labelElement?: JSX.Element;
  alignEnd?: boolean;
  name?: keyof TFormData;
  notInForm?: boolean;
  inputRef?: (element: HTMLInputElement) => void;

  // while not directly used, used to infer the type for name to give properly type checking on that property
  formData?: Accessor<Partial<TFormData>>;
};

const CheckedState = {
  UNCHECKED: 'unchecked',
  CHECKED: 'checked',
  INDETERMINATE: 'indeterminate',
} as const;

type CheckedState = (typeof CheckedState)[keyof typeof CheckedState];

// we exposed a plain input in the off chance we need an input not hooked up to react-hook-form directly (like the
// auto complete component)
const Checkbox = <TFormData = DefaultFormData>(passedProps: CheckboxProps<TFormData>) => {
  const [props, restOfProps] = splitProps(passedProps, [
    'class',
    'labelElement',
    'alignEnd',
    'onChange',
    'name',
    'formData',
  ]);

  // we need to manually track the checked state of the input in order to make sure the toggle slider properly
  // reacts when the checked state of the input changes
  const [checkedState, setCheckedState] = createSignal<CheckedState>(CheckedState.UNCHECKED);
  const [inputElement, setInputElement] = createSignal<HTMLInputElement>();

  const formFieldContext = useContext(FormFieldContext);

  if (!formFieldContext) {
    loggerUtils.log('input elements that are not wrapped in a form field will not have validation');
  }

  const handleInputRef = (element: HTMLInputElement) => {
    setInputElement(element);
    passedProps.inputRef?.(element);
  };

  const getCheckedStateIcon = (): IconName => {
    const isChecked = checkedState() === CheckedState.CHECKED;

    if (checkedState() === CheckedState.INDETERMINATE) {
      return 'minus-square';
    }

    if (isChecked) {
      return 'check-square';
    }

    return 'square';
  };

  const handleChange: JSX.EventHandlerUnion<HTMLInputElement, Event> = (event) => {
    const target = event.target as HTMLInputElement;
    const checked = target.checked;
    const checkedState = checked ? CheckedState.CHECKED : CheckedState.UNCHECKED;

    setCheckedState(target.indeterminate ? CheckedState.INDETERMINATE : checkedState);

    if (props.onChange) {
      const eventHandler = props.onChange as JSX.EventHandler<HTMLInputElement, Event>;

      eventHandler(event);
    }
  };

  createEffect(function updateInternalCheckState() {
    if (inputElement()?.indeterminate) {
      setCheckedState(CheckedState.INDETERMINATE);

      return;
    }

    setCheckedState(inputElement()?.checked ? CheckedState.CHECKED : CheckedState.UNCHECKED);
  });

  return (
    <span
      class={tailwindUtils.merge(styles.checkbox, props.class, {
        [styles.alignEnd]: props.alignEnd,
      })}
    >
      <label>
        <input
          data-id="checkbox"
          {...restOfProps}
          ref={handleInputRef}
          type="checkbox"
          name={props.name as string}
          onChange={handleChange}
        />
        <Icon class={tailwindUtils.merge(styles.icon)} icon={getCheckedStateIcon()} />
        <Show when={props.labelElement}>
          <span class={styles.label}>{props.labelElement}</span>
        </Show>
      </label>
    </span>
  );
};

// by default, we should be using the input the auto hooks with react-hook-form
export default Checkbox;

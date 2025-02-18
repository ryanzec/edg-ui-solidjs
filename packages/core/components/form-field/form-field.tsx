import classnames from 'classnames';
import {
  type Accessor,
  type JSX,
  Show,
  createContext,
  createEffect,
  createSignal,
  mergeProps,
  splitProps,
} from 'solid-js';

import styles from '$/core/components/form-field/form-field.module.css';
import SupportingText, { SupportingTextColor } from '$/core/components/supporting-text';
import { FormInputValidationState } from '$/core/stores/form.store';
import type { CommonDataAttributes } from '$/core/types/generic';

export type FormFieldProps = JSX.HTMLAttributes<HTMLDivElement> &
  CommonDataAttributes & {
    errors?: string[];
    showErrors?: boolean;
  };

export type FormFieldContextData = {
  errors: Accessor<string[] | undefined>;
  validationState: Accessor<FormInputValidationState>;
};

export const FormFieldContext = createContext<FormFieldContextData>();

const FormField = (passedProps: FormFieldProps) => {
  const [props, restOfProps] = splitProps(mergeProps({ showErrors: true }, passedProps), [
    'class',
    'children',
    'errors',
    'showErrors',
  ]);

  const [contextErrors, setContextErrors] = createSignal<string[] | undefined>(props.errors);
  const [validationState, setValidationState] = createSignal<FormInputValidationState>(
    FormInputValidationState.NEUTRAL,
  );

  createEffect(function updateContext() {
    setContextErrors(props.errors);
    setValidationState(
      props.errors && props.errors.length > 0 ? FormInputValidationState.INVALID : FormInputValidationState.VALID,
    );
  });

  return (
    <FormFieldContext.Provider
      value={{
        errors: contextErrors,
        validationState: validationState,
      }}
    >
      <div data-id="form-field" {...restOfProps} class={classnames(props.class, styles.formField)}>
        {props.children}
        <Show when={props.showErrors && (props.errors || []).length > 0}>
          <SupportingText
            data-id="validation-message"
            supportingText={props.errors}
            color={SupportingTextColor.DANGER}
          />
        </Show>
      </div>
    </FormFieldContext.Provider>
  );
};

export default FormField;

import { tailwindUtils } from '$/core/utils/tailwind';
import {
  type Accessor,
  For,
  type JSX,
  Show,
  createContext,
  createEffect,
  createSignal,
  mergeProps,
  splitProps,
} from 'solid-js';

import styles from '$/core/components/form-field/form-field.module.css';
import { Typography, TypographyColor, TypographySize } from '$/core/components/typography';
import { FormInputValidationState } from '$/core/stores/form.store';
import type { CommonDataAttributes } from '$/core/types/generic';
export type FormFieldProps = JSX.HTMLAttributes<HTMLDivElement> &
  CommonDataAttributes & {
    errors?: string[];
    showErrors?: boolean;
  };

type FormFieldContextData = {
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
  const [contextValidationState, setContextValidationState] = createSignal<FormInputValidationState>(
    FormInputValidationState.NEUTRAL,
  );

  createEffect(function updateContext() {
    setContextErrors(props.errors);
    setContextValidationState(
      props.errors && props.errors.length > 0 ? FormInputValidationState.INVALID : FormInputValidationState.VALID,
    );
  });

  return (
    <FormFieldContext.Provider
      value={{
        errors: contextErrors,
        validationState: contextValidationState,
      }}
    >
      <div data-id="form-field" {...restOfProps} class={tailwindUtils.merge(props.class, styles.formField)}>
        {props.children}
        <Show when={props.showErrors && (props.errors || []).length > 0}>
          <Typography data-id="validation-message" color={TypographyColor.DANGER} size={TypographySize.SMALL}>
            <For each={props.errors}>
              {(error) => {
                return <div>{error}</div>;
              }}
            </For>
          </Typography>
        </Show>
      </div>
    </FormFieldContext.Provider>
  );
};

export default FormField;

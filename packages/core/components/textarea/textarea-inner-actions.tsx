import { For, type JSX, splitProps } from 'solid-js';

import Button, { ButtonState } from '$/core/components/button';
import { FormField, type FormFieldProps } from '$/core/components/form-field';
import Textarea, { type TextareaProps } from '$/core/components/textarea/textarea';
import type { DefaultFormData } from '$/core/stores/form.store';

export type TextareaInnerActionsProps<TFormData = DefaultFormData> = Omit<
  TextareaProps<TFormData>,
  'selectAllOnFocus'
> &
  Pick<FormFieldProps, 'errors'> & {
    isProcessing: boolean;
    mainButtonElement: JSX.Element;
    extraButtonElements?: JSX.Element[];
  };

export const TextareaInnerActions = <TFormData = DefaultFormData>(
  passedProps: TextareaInnerActionsProps<TFormData>,
) => {
  const [props, resetOfProps] = splitProps(passedProps, [
    'isProcessing',
    'mainButtonElement',
    'errors',
    'extraButtonElements',
  ]);

  return (
    <>
      <FormField errors={props.errors}>
        <div class="relative">
          <Textarea {...resetOfProps} />
          <Button.Group class="absolute bottom-2xs w-[calc(100%-2*var(--spacing-2xs))] mx-2xs">
            <For each={props.extraButtonElements}>
              {(buttonElement) => {
                return buttonElement;
              }}
            </For>
            <Button
              type="submit"
              state={props.isProcessing ? ButtonState.IS_LOADING : undefined}
              class="shrink-0 !ml-auto"
            >
              {props.mainButtonElement}
            </Button>
          </Button.Group>
        </div>
      </FormField>
    </>
  );
};

export default TextareaInnerActions;

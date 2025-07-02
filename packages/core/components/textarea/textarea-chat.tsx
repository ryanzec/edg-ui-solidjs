import { type JSX, splitProps } from 'solid-js';

import Button, { ButtonState } from '$/core/components/button';
import { FormField, type FormFieldProps } from '$/core/components/form-field';
import Textarea, { type TextareaProps } from '$/core/components/textarea/textarea';
import type { DefaultFormData } from '$/core/stores/form.store';

export type TextareaChatProps<TFormData = DefaultFormData> = Omit<TextareaProps<TFormData>, 'selectAllOnFocus'> &
  Pick<FormFieldProps, 'errors'> & {
    isProcessing: boolean;
    buttonContentElement: JSX.Element;
    extraButtonElements?: JSX.Element;
  };

export const TextareaChat = <TFormData = DefaultFormData>(passedProps: TextareaChatProps<TFormData>) => {
  const [props, resetOfProps] = splitProps(passedProps, [
    'isProcessing',
    'buttonContentElement',
    'errors',
    'extraButtonElements',
  ]);

  return (
    <>
      <FormField errors={props.errors}>
        <div class="relative">
          <Textarea {...resetOfProps} />
          <Button.Group class="absolute bottom-2xs w-[calc(100%-2*var(--spacing-2xs))] mx-2xs">
            {props.extraButtonElements}
            <Button
              type="submit"
              state={props.isProcessing ? ButtonState.IS_LOADING : undefined}
              class="shrink-0 !ml-auto"
            >
              {props.buttonContentElement}
            </Button>
          </Button.Group>
        </div>
      </FormField>
    </>
  );
};

export default TextareaChat;

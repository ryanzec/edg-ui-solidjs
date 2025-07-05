import { default as BaseTextarea, type TextareaProps } from '$/core/components/textarea/textarea';
import InnerActions, { type TextareaInnerActionsProps } from '$/core/components/textarea/textarea-inner-actions';

export type { TextareaProps, TextareaInnerActionsProps as TextareaChatProps };

const Textarea = Object.assign(BaseTextarea, {
  InnerActions,
});

export default Textarea;

import { default as BaseTextarea, type TextareaProps } from '$/core/components/textarea/textarea';
import InnerActions, { type TextareaInnerActionsProps } from '$/core/components/textarea/textarea-inner-actions';

export type { TextareaProps, TextareaInnerActionsProps };

const Textarea = Object.assign(BaseTextarea, {
  InnerActions,
});

export { Textarea };

export default Textarea;

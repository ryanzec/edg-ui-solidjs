import { default as BaseTextarea, type TextareaProps } from '$/core/components/textarea/textarea';
import Chat, { type TextareaChatProps } from '$/core/components/textarea/textarea-chat';

export type { TextareaProps, TextareaChatProps };

const Textarea = Object.assign(BaseTextarea, {
  Chat: Chat,
});

export default Textarea;

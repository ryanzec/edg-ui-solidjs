import Message, {
  type ChatMessageProps,
  ChatMessageSource,
  type ChatMessageData,
} from '$/core/components/chat/chat-message';
import Messages, { type ChatMessagesProps } from '$/core/components/chat/chat-messages';

export type { ChatMessageProps, ChatMessageData, ChatMessagesProps };

export { ChatMessageSource };

export const Chat = Object.assign({}, { Message, Messages });

export default Chat;

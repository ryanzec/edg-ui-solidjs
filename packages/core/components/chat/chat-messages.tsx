import type { JSX } from 'solid-js';

export type ChatMessagesProps = JSX.HTMLAttributes<HTMLDivElement>;

const ChatMessages = (props: ChatMessagesProps) => {
  return <div class="flex flex-col gap-xs" {...props} />;
};

export default ChatMessages;

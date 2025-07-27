import { type JSX, Show } from 'solid-js';

import { Avatar } from '$/core/components/avatar';
import Icon from '$/core/components/icon';
import { tailwindUtils } from '$/core/utils/tailwind';
import { Typography, TypographyColor } from '../typography';

export const ChatMessageSource = {
  USER: 'user',
  AI: 'ai',
  SYSTEM: 'system',
} as const;

export type ChatMessageSource = (typeof ChatMessageSource)[keyof typeof ChatMessageSource];

export type ChatMessageData = {
  source: ChatMessageSource;
  messageElement: JSX.Element;
  isLoading?: boolean;
  preserveMessageFormatting?: boolean;
};

export type ChatMessageProps = {
  class?: string;
  source: ChatMessageSource;
  messageData: ChatMessageData;
};

const ChatMessage = (props: ChatMessageProps) => {
  return (
    <div
      class={tailwindUtils.merge(
        'flex items-center gap-sm p-2xs wrap-anywhere',
        {
          'ml-6xl bg-neutral-subtle2': props.source === ChatMessageSource.USER,
          'mr-6xl bg-brand-subtle2': props.source === ChatMessageSource.AI,
          'border border-outline rounded-sm': props.source !== ChatMessageSource.SYSTEM,
          'p-2xs font-semibold': props.source === ChatMessageSource.SYSTEM,
          'whitespace-pre-wrap': props.messageData.preserveMessageFormatting ?? true,
        },
        props.class,
      )}
    >
      <Show when={props.source !== ChatMessageSource.SYSTEM}>
        <Avatar label={props.source === ChatMessageSource.USER ? 'U' : 'AI'} class="shrink-0 self-start" />
      </Show>
      <Show
        when={props.messageData.isLoading !== true}
        fallback={
          <span class="flex items-center gap-4xs">
            <Icon icon="spinner" class="animate-spin" />
            <Typography color={TypographyColor.NEUTRAL}>Processing your request...</Typography>
          </span>
        }
      >
        <div class="w-full">{props.messageData.messageElement}</div>
      </Show>
    </div>
  );
};

export default ChatMessage;

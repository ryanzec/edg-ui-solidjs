import Button from '$/core/components/button';
import Chat, { ChatMessageSource, type ChatMessageData } from '$/core/components/chat';
import CodeBlock from '$/core/components/code-block';
import Markdown from '$/core/components/markdown';
import ScrollArea from '$/core/components/scroll-area';
import { asyncUtils } from '$/core/utils/async';
import SandboxExamplesContainer from '$sandbox/components/sandbox-examples-container/sandbox-examples-container';
import { For, createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';

export default {
  title: 'Components/Chat',
};

const sampleMessages: ChatMessageData[] = [
  {
    source: ChatMessageSource.SYSTEM,
    messageElement: 'Welcome to the chat system. How can I help you today?',
  },
  {
    source: ChatMessageSource.USER,
    messageElement: 'Hello! I need help with my account settings.',
  },
  {
    source: ChatMessageSource.AI,
    messageElement:
      "I'd be happy to help you with your account settings. What specific aspect would you like to modify?",
  },
  {
    source: ChatMessageSource.USER,
    messageElement: 'I want to update my email address and change my password.',
  },
  {
    source: ChatMessageSource.AI,
    messageElement:
      'I can guide you through both of those changes. Let\'s start with updating your email address:\n\n1. Go to Account Settings\n2. Click on "Email & Password"\n3. Enter your new email address\n4. Click "Update Email"\n\nFor your password, you\'ll find the option right below the email field.',
  },
];

const longMessage =
  'This is a very long message that demonstrates how the chat component handles lengthy content. It includes multiple sentences and should wrap properly within the chat bubble. The message continues with more text to show the wrapping behavior and how the component maintains readability even with extensive content. This helps test the layout and styling of longer conversations that might occur in real-world usage scenarios.';

export const Basic = () => {
  return (
    <SandboxExamplesContainer>
      <Chat.Messages>
        <For each={sampleMessages}>{(message) => <Chat.Message source={message.source} messageData={message} />}</For>
      </Chat.Messages>
    </SandboxExamplesContainer>
  );
};

export const Loading = () => {
  return (
    <SandboxExamplesContainer>
      <Chat.Messages>
        <Chat.Message
          source={ChatMessageSource.USER}
          messageData={{
            source: ChatMessageSource.USER,
            messageElement: 'Can you help me with a complex calculation?',
          }}
        />
        <Chat.Message
          source={ChatMessageSource.AI}
          messageData={{ source: ChatMessageSource.AI, messageElement: 'Processing...', isLoading: true }}
        />
      </Chat.Messages>
    </SandboxExamplesContainer>
  );
};

export const MessageTypes = () => {
  return (
    <SandboxExamplesContainer>
      <Chat.Messages>
        <Chat.Message
          source={ChatMessageSource.USER}
          messageData={{ source: ChatMessageSource.USER, messageElement: 'This is a user message' }}
        />
        <Chat.Message
          source={ChatMessageSource.AI}
          messageData={{ source: ChatMessageSource.AI, messageElement: 'This is an AI response message' }}
        />
        <Chat.Message
          source={ChatMessageSource.SYSTEM}
          messageData={{ source: ChatMessageSource.SYSTEM, messageElement: 'System message: Connection restored' }}
        />
      </Chat.Messages>
    </SandboxExamplesContainer>
  );
};

export const LongMessages = () => {
  return (
    <SandboxExamplesContainer>
      <Chat.Messages>
        <Chat.Message
          source={ChatMessageSource.USER}
          messageData={{ source: ChatMessageSource.USER, messageElement: longMessage }}
        />
        <Chat.Message
          source={ChatMessageSource.AI}
          messageData={{
            source: ChatMessageSource.AI,
            messageElement:
              "I understand you've shared a lengthy message. Long messages like this are handled well by the chat component, which automatically wraps the text and maintains proper spacing and readability. The styling ensures that even extensive content remains clear and accessible to users.",
          }}
        />
      </Chat.Messages>
    </SandboxExamplesContainer>
  );
};

export const InteractiveChat = () => {
  const [messages, setMessages] = createStore<ChatMessageData[]>([
    {
      source: ChatMessageSource.SYSTEM,
      messageElement: 'Welcome! Type a message to get started.',
    },
  ]);
  const [inputValue, setInputValue] = createSignal('');

  const addMessage = (message: ChatMessageData) => {
    setMessages([...messages, message]);
  };

  const updateMessage = (index: number, updateData: Partial<ChatMessageData>) => {
    setMessages(messages.map((message, i) => (i === index ? { ...message, ...updateData } : message)));
  };

  const sendMessage = async () => {
    const userMessage = inputValue().trim();

    if (!userMessage) {
      return;
    }

    addMessage({ source: ChatMessageSource.USER, messageElement: userMessage });
    addMessage({ source: ChatMessageSource.AI, messageElement: '', isLoading: true });
    setInputValue('');

    await asyncUtils.sleep(1500);

    updateMessage(messages.length - 1, {
      messageElement: `I received your message: "${userMessage}". This is a simulated response to demonstrate the interactive chat functionality.`,
      isLoading: false,
    });
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <SandboxExamplesContainer>
      <div class="flex flex-col gap-sm max-w-[500px]">
        <ScrollArea class="h-96 border border-outline rounded-sm p-xs">
          <Chat.Messages>
            <For each={messages}>{(message) => <Chat.Message source={message.source} messageData={message} />}</For>
          </Chat.Messages>
        </ScrollArea>
        <div class="flex gap-xs">
          <textarea
            class="flex-1 p-xs border border-outline rounded-sm resize-none"
            placeholder="Type your message..."
            value={inputValue()}
            onInput={(e) => setInputValue(e.currentTarget.value)}
            onKeyPress={handleKeyPress}
            rows={2}
          />
          <Button onClick={sendMessage}>Send</Button>
        </div>
      </div>
    </SandboxExamplesContainer>
  );
};

export const CustomStyling = () => {
  return (
    <SandboxExamplesContainer>
      <Chat.Messages>
        <Chat.Message
          source={ChatMessageSource.USER}
          messageData={{
            source: ChatMessageSource.USER,
            messageElement: 'This user message has custom border styling',
          }}
          class="border-2 border-brand-primary"
        />
        <Chat.Message
          source={ChatMessageSource.AI}
          messageData={{
            source: ChatMessageSource.AI,
            messageElement: 'This AI message has custom background and border colors',
          }}
          class="bg-success-subtle2 border-success-primary"
        />
        <Chat.Message
          source={ChatMessageSource.SYSTEM}
          messageData={{
            source: ChatMessageSource.SYSTEM,
            messageElement: 'This system message has custom text color and weight',
          }}
          class="text-warning-primary font-bold"
        />
      </Chat.Messages>
    </SandboxExamplesContainer>
  );
};

export const WhitespaceHandling = () => {
  const messages: ChatMessageData[] = [
    {
      source: ChatMessageSource.USER,
      messageElement: `This is a user message with 2 line breaks, one natural and the other with a \\n in it\n
      
      This is a second line with space in front of it`,
    },
    {
      source: ChatMessageSource.AI,
      messageElement: `This is an AI message with 2 line breaks, one natural and the other with a \\n in it\n
      
      This is a second line with space in front of it`,
    },
  ];

  return (
    <SandboxExamplesContainer>
      <Chat.Messages>
        <For each={messages}>{(message) => <Chat.Message source={message.source} messageData={message} />}</For>
      </Chat.Messages>
    </SandboxExamplesContainer>
  );
};

export const ComplexMessage = () => {
  const markdown = `
# This is a markdown message
This is a paragraph
This is a list
- Item 1
- Item 2
- Item 3
  `;
  const messages: ChatMessageData[] = [
    {
      source: ChatMessageSource.USER,
      // since the first message is a real element, we don't want to preserve whitespace
      preserveMessageFormatting: false,
      messageElement: (
        <span>
          This is a user message with 2 line breaks using html &lt;br /&gt; tags
          <br />
          <br />
          This is a second line with space in front of it
          <CodeBlock
            code={`
          This is a code block
        `}
          />
          <Markdown markdown={markdown} />
        </span>
      ),
    },
    {
      source: ChatMessageSource.AI,
      messageElement: `This is an AI message with 2 line breaks, one natural and the other with a \\n in it\n
      
      This is a second line with space in front of it`,
    },
  ];

  return (
    <SandboxExamplesContainer>
      <Chat.Messages>
        <For each={messages}>{(message, index) => <Chat.Message source={message.source} messageData={message} />}</For>
      </Chat.Messages>
    </SandboxExamplesContainer>
  );
};

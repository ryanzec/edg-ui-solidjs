import Button from '$/core/components/button';
import Peek from '$/core/components/peek';
import type { PeekComponentRef } from '$/core/components/peek/utils';
import { componentRefUtils } from '$/core/stores/component-ref';

export default {
  title: 'Components/Peek',
};

export const Default = () => {
  const peekComponentRef = componentRefUtils.createRef<PeekComponentRef>();

  return (
    <>
      <Button onClick={() => peekComponentRef.api()?.open()}>open peek</Button>
      <Peek peekComponentRef={peekComponentRef}>
        <Peek.Header title="Peek Header" />
        <Peek.Content>Content</Peek.Content>
        <Peek.Footer>
          <Button.Group>
            <Peek.CloseButton />
            <Button>Process</Button>
          </Button.Group>
        </Peek.Footer>
      </Peek>
    </>
  );
};

export const Events = () => {
  const peekComponentRef = componentRefUtils.createRef<PeekComponentRef>();

  const handleOpened = () => {
    console.log('opened');
  };

  const handleClosed = () => {
    console.log('closed');
  };

  return (
    <>
      <Button onClick={() => peekComponentRef.api()?.open()}>open peek</Button>
      <Peek peekComponentRef={peekComponentRef} onOpened={handleOpened} onClosed={handleClosed}>
        <Peek.Header title="Peek Header" />
        <Peek.Content>Content</Peek.Content>
        <Peek.Footer>
          <Button.Group>
            <Peek.CloseButton />
            <Button>Process</Button>
          </Button.Group>
        </Peek.Footer>
      </Peek>
    </>
  );
};

export const Resizeable = () => {
  const peekComponentRef = componentRefUtils.createRef<PeekComponentRef>();

  return (
    <>
      <Button onClick={() => peekComponentRef.api()?.open()}>open peek</Button>
      <Peek peekComponentRef={peekComponentRef} isResizable>
        <Peek.Header title="Peek Header" />
        <Peek.Content>Content</Peek.Content>
        <Peek.Footer>
          <Button.Group>
            <Peek.CloseButton />
            <Button>Process</Button>
          </Button.Group>
        </Peek.Footer>
      </Peek>
    </>
  );
};

export const Scrollable = () => {
  const peekComponentRef = componentRefUtils.createRef<PeekComponentRef>();

  return (
    <>
      <Button onClick={() => peekComponentRef.api()?.open()}>open peek</Button>
      <Peek peekComponentRef={peekComponentRef} isResizable>
        <Peek.Header title="Peek Header" />
        <Peek.Content>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
        </Peek.Content>
        <Peek.Footer>
          <Button.Group>
            <Peek.CloseButton />
            <Button>Process</Button>
          </Button.Group>
        </Peek.Footer>
      </Peek>
    </>
  );
};

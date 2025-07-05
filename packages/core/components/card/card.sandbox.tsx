import Button from '$/core/components/button';
import Card from '$/core/components/card';
import SandboxExamplesContainer from '$sandbox/components/sandbox-examples-container/sandbox-examples-container';

export default {
  title: 'Components/Card',
};

export const Default = () => {
  return (
    <SandboxExamplesContainer>
      <Card>
        <Card.Header label="Header" />
        <Card.Content>Content</Card.Content>
        <Card.Footer>
          <Button>Footer Action</Button>
        </Card.Footer>
      </Card>
    </SandboxExamplesContainer>
  );
};

export const Closable = () => {
  return (
    <SandboxExamplesContainer>
      <Card onClose={() => console.log('onClose')}>
        <Card.Header label="Header" />
        <Card.Content>Content</Card.Content>
        <Card.Footer>
          <Button>Footer Action</Button>
        </Card.Footer>
      </Card>
    </SandboxExamplesContainer>
  );
};

export const SubHeader = () => {
  return (
    <SandboxExamplesContainer>
      <Card>
        <Card.Header label="Header" subLabelElement="Sub Header" />
        <Card.Content>Content</Card.Content>
        <Card.Footer>
          <Button>Footer Action</Button>
        </Card.Footer>
      </Card>
    </SandboxExamplesContainer>
  );
};

export const PreItem = () => {
  return (
    <SandboxExamplesContainer>
      <Card>
        <Card.Header label="Header" subLabelElement="Sub Header" preElement={<Button>Action</Button>} />
        <Card.Content>Content</Card.Content>
        <Card.Footer>
          <Button>Footer Action</Button>
        </Card.Footer>
      </Card>
    </SandboxExamplesContainer>
  );
};

export const PostItem = () => {
  return (
    <SandboxExamplesContainer>
      <Card>
        <Card.Header label="Header" subLabelElement="Sub Header" postElement={<Button>Action</Button>} />
        <Card.Content>Content</Card.Content>
        <Card.Footer>
          <Button>Footer Action</Button>
        </Card.Footer>
      </Card>
    </SandboxExamplesContainer>
  );
};

export const PreAndPostItem = () => {
  return (
    <SandboxExamplesContainer>
      <Card>
        <Card.Header
          label="Header"
          subLabelElement="Sub Header"
          preElement={<Button>Action</Button>}
          postElement={<Button>Action</Button>}
        />
        <Card.Content>Content</Card.Content>
        <Card.Footer>
          <Button>Footer Action</Button>
        </Card.Footer>
      </Card>
    </SandboxExamplesContainer>
  );
};

export const Links = () => {
  return (
    <SandboxExamplesContainer>
      <Card link="https://google.com">
        <Card.Header label="Header" />
        <Card.Content>Internal Link</Card.Content>
      </Card>
      <Card link="https://google.com" linkIsExternal>
        <Card.Header label="Header" />
        <Card.Content>External Link</Card.Content>
      </Card>
    </SandboxExamplesContainer>
  );
};

export const Nested = () => {
  return (
    <SandboxExamplesContainer>
      <Card>
        <Card.Header label="Header" />
        <Card.NestedContainer>
          <Card>
            <Card.Header label="Header" />
            <Card.Content>Content</Card.Content>
            <Card.Footer>
              <Button>Footer Action</Button>
            </Card.Footer>
          </Card>
          <Card link="https://google.com" linkIsExternal>
            <Card.Header label="Header" />
            <Card.Content>Content</Card.Content>
            <Card.Footer>
              <Button>Footer Action</Button>
            </Card.Footer>
          </Card>
          <Card>
            <Card.Header label="Header" subLabelElement="Sub Header" />
            <Card.Content>Content</Card.Content>
            <Card.Footer>
              <Button>Footer Action</Button>
            </Card.Footer>
          </Card>
        </Card.NestedContainer>
      </Card>
    </SandboxExamplesContainer>
  );
};

export const NestedWrapper = () => {
  return (
    <SandboxExamplesContainer>
      <Card>
        <Card.Header label="Header" />
        <Card.NestedContainer>
          <Card>
            <Card.Header label="Header" />
            <Card.Content>Content</Card.Content>
            <Card.Footer>
              <Button>Footer Action</Button>
            </Card.Footer>
          </Card>
          <Card link="https://google.com" linkIsExternal>
            <Card.Header label="Header" />
            <Card.Content>Content</Card.Content>
            <Card.Footer>
              <Button>Footer Action</Button>
            </Card.Footer>
          </Card>
          <Card>
            <Card.Header label="Header" subLabelElement="Sub Header" />
            <Card.Content>Content</Card.Content>
            <Card.Footer>
              <Button>Footer Action</Button>
            </Card.Footer>
          </Card>
        </Card.NestedContainer>
      </Card>
    </SandboxExamplesContainer>
  );
};

export const Clickable = () => {
  const handleClick = (event: MouseEvent) => {
    const openInNewTab = event.metaKey || event.ctrlKey;

    console.log('clicked');
    console.log('open in new tab', openInNewTab);
  };

  return (
    <SandboxExamplesContainer>
      <Card onClick={handleClick}>
        <Card.Header label="Header" />
        <Card.Content>Content</Card.Content>
      </Card>
    </SandboxExamplesContainer>
  );
};

export const AsPageSection = () => {
  return (
    <SandboxExamplesContainer>
      <Card asPageSection>
        <Card.Header label="Header" />
        <Card.Content>Content</Card.Content>
      </Card>
    </SandboxExamplesContainer>
  );
};

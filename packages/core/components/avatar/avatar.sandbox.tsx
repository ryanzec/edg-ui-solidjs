import Avatar from '$/core/components/avatar';
import SandboxExamplesContainer from '$sandbox/components/sandbox-examples-container/sandbox-examples-container';

export default {
  title: 'Components/Avatar',
};

export const Default = () => {
  return (
    <SandboxExamplesContainer>
      <Avatar label="SJ" />
      <Avatar src="https://avatars.githubusercontent.com/u/444206?v=4">SJ</Avatar>
    </SandboxExamplesContainer>
  );
};

export const Count = () => {
  return (
    <SandboxExamplesContainer>
      <Avatar count={12} />
      <Avatar count={123} />
    </SandboxExamplesContainer>
  );
};

export const Stack = () => {
  return (
    <Avatar.Stack>
      <Avatar count={123} />
      <Avatar label="SJ" />
      <Avatar src="https://avatars.githubusercontent.com/u/444206?v=4">SJ</Avatar>
      <Avatar label="SJ" />
      <Avatar count={12} />
    </Avatar.Stack>
  );
};

export const User = () => {
  return (
    <SandboxExamplesContainer>
      <Avatar.User name="John Doe" email="ryan@example.com" />
      <Avatar.User name="John Doe" email="ryan+1@example.com" extraText="Owner" />
    </SandboxExamplesContainer>
  );
};

export const Ellipsis = () => {
  return (
    <SandboxExamplesContainer class="max-w-[200px]">
      <Avatar.User name="John Doe John Doe John Doe John Doe John Doe" email="ryan@example.com" />
      <Avatar.User name="John Doe John Doe John Doe John Doe John Doe" email="ryan+1@example.com" extraText="Owner" />
    </SandboxExamplesContainer>
  );
};

export const UserHideName = () => {
  return (
    <SandboxExamplesContainer>
      <Avatar.User name="John Doe" email="ryan@example.com" showName={false} />
      <Avatar.User name="John Doe" email="ryan+1@example.com" extraText="Owner" showName={false} />
    </SandboxExamplesContainer>
  );
};

export const Clickable = () => {
  return (
    <SandboxExamplesContainer>
      <Avatar.User name="John Doe" email="ryan@example.com" showName={false} isClickable />
      <Avatar label="SJ" isClickable />
    </SandboxExamplesContainer>
  );
};

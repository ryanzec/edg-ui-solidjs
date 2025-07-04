import Avatar from '$/core/components/avatar';
import { AvatarSize } from '$/core/components/avatar';
import SandboxExamplesContainer from '$sandbox/components/sandbox-examples-container/sandbox-examples-container';

export default {
  title: 'Components/Avatar',
};

export const Count = () => {
  return (
    <SandboxExamplesContainer>
      <div>Small</div>
      <Avatar count={1} avatarSize={AvatarSize.SMALL} />
      <Avatar count={12} avatarSize={AvatarSize.SMALL} />
      <div>Base</div>
      <Avatar count={12} avatarSize={AvatarSize.BASE} />
      <Avatar count={123} avatarSize={AvatarSize.BASE} />
    </SandboxExamplesContainer>
  );
};

export const Stack = () => {
  return (
    <SandboxExamplesContainer>
      <div>Small</div>
      <Avatar.Stack avatarSize={AvatarSize.SMALL}>
        <Avatar count={123} />
        <Avatar label="SJ" />
        <Avatar src="https://avatars.githubusercontent.com/u/444206?v=4">SJ</Avatar>
        <Avatar label="SJ" />
        <Avatar count={12} />
      </Avatar.Stack>
      <div>Base</div>
      <Avatar.Stack>
        <Avatar count={123} />
        <Avatar label="SJ" />
        <Avatar src="https://avatars.githubusercontent.com/u/444206?v=4">SJ</Avatar>
        <Avatar label="SJ" />
        <Avatar count={12} />
      </Avatar.Stack>
    </SandboxExamplesContainer>
  );
};

export const User = () => {
  return (
    <SandboxExamplesContainer>
      <div>Small</div>
      <Avatar.User name="John Doe" email="ryan@example.com" avatarSize={AvatarSize.SMALL} />
      <Avatar.User name="John Doe" email="ryan+1@example.com" extraText="Owner" avatarSize={AvatarSize.SMALL} />
      <div>Base</div>
      <Avatar.User name="John Doe" email="ryan@example.com" avatarSize={AvatarSize.BASE} />
      <Avatar.User name="John Doe" email="ryan+1@example.com" extraText="Owner" avatarSize={AvatarSize.BASE} />
    </SandboxExamplesContainer>
  );
};

export const Ellipsis = () => {
  return (
    <SandboxExamplesContainer class="max-w-[200px]">
      <div>Small</div>
      <Avatar.User
        name="John Doe John Doe John Doe John Doe John Doe"
        email="ryan@example.com"
        avatarSize={AvatarSize.SMALL}
      />
      <Avatar.User
        name="John Doe John Doe John Doe John Doe John Doe"
        email="ryan+1@example.com"
        extraText="Owner"
        avatarSize={AvatarSize.SMALL}
      />
      <div>Base</div>
      <Avatar.User
        name="John Doe John Doe John Doe John Doe John Doe"
        email="ryan@example.com"
        avatarSize={AvatarSize.BASE}
      />
      <Avatar.User
        name="John Doe John Doe John Doe John Doe John Doe"
        email="ryan+1@example.com"
        extraText="Owner"
        avatarSize={AvatarSize.BASE}
      />
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

export const Sizes = () => {
  return (
    <SandboxExamplesContainer>
      <div>Small</div>
      <Avatar avatarSize={AvatarSize.SMALL} label="SJ" />
      <Avatar avatarSize={AvatarSize.SMALL} src="https://avatars.githubusercontent.com/u/444206?v=4">
        SJ
      </Avatar>
      <div>Base</div>
      <Avatar avatarSize={AvatarSize.BASE} label="SJ" />
      <Avatar avatarSize={AvatarSize.BASE} src="https://avatars.githubusercontent.com/u/444206?v=4">
        SJ
      </Avatar>
    </SandboxExamplesContainer>
  );
};

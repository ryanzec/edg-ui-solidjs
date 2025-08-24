import { createResource, mergeProps, splitProps } from 'solid-js';
import AvatarWithText from '$/core/components/avatar/avatar-with-text';
import { type AvatarProps, AvatarSize } from '$/core/components/avatar/utils';
import { cryptoUtils } from '$/core/utils/crypto';
import { imageUtils } from '$/core/utils/image';

export type AvatarUserProps = AvatarProps & {
  name: string;
  email?: string;
  extraText?: string;
  showName?: boolean;
};

const getGravatarImage = async (email: string): Promise<string | undefined> => {
  const hash = await cryptoUtils.sha256(email.trim().toLowerCase());
  const gravatarUrl = `https://www.gravatar.com/avatar/${hash}?d=404`;
  const validatedUrl = await imageUtils.validateImageUrl(gravatarUrl);

  if (!validatedUrl) {
    return;
  }

  return gravatarUrl as string;
};

const AvatarUser = (passedProps: AvatarUserProps) => {
  const [props, restOfProps] = splitProps(mergeProps({ showName: true, avatarSize: AvatarSize.BASE }, passedProps), [
    'name',
    'email',
    'extraText',
    'showName',
  ]);

  const [imageUrl] = createResource(1, async () => {
    return await getGravatarImage(props.email || '');
  });

  return (
    <AvatarWithText
      src={imageUrl()}
      label={props.name}
      subLabel={props.extraText}
      showLabel={props.showName}
      {...restOfProps}
    />
  );
};

export default AvatarUser;

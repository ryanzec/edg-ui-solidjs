import { createResource, mergeProps, Show, splitProps } from 'solid-js';
import Avatar from '$/core/components/avatar/avatar';
import { type AvatarProps, AvatarSize } from '$/core/components/avatar/utils';
import EllipsisText from '$/core/components/ellipsis-text';
import Typography, { TypographySize } from '$/core/components/typography';
import { cryptoUtils } from '$/core/utils/crypto';
import { imageUtils } from '$/core/utils/image';
import { stringUtils } from '$/core/utils/string';
import { tailwindUtils } from '$/core/utils/tailwind';

export type AvatarUserProps = Omit<AvatarProps, 'class'> & {
  name: string;
  email?: string;
  extraText?: string;
  showName?: boolean;
  isClickable?: boolean;
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
    'isClickable',
  ]);

  const [imageUrl] = createResource(1, async () => {
    return await getGravatarImage(props.email || '');
  });

  return (
    <div
      data-id="avatar-user"
      class={tailwindUtils.merge('flex items-center', {
        'gap-4xs': restOfProps.avatarSize === AvatarSize.SMALL,
        'gap-2xs': restOfProps.avatarSize === AvatarSize.BASE,
      })}
    >
      <Avatar
        src={imageUrl()}
        label={stringUtils.toInitialism(props.name, { limit: 2 })}
        isClickable={props.isClickable}
        class="shrink-0"
        {...restOfProps}
      />
      <Show when={props.showName}>
        <div class="min-w-[1px]">
          <Show when={restOfProps.avatarSize !== AvatarSize.SMALL && props.extraText}>
            <Typography size={TypographySize.SMALL} data-id="extra-text">
              {props.extraText}
            </Typography>
          </Show>
          <Typography
            data-id="name"
            size={restOfProps.avatarSize === AvatarSize.SMALL ? TypographySize.SMALL : TypographySize.BASE}
          >
            <EllipsisText class="line-clamp-1" text={props.name} />
          </Typography>
        </div>
      </Show>
    </div>
  );
};

export default AvatarUser;

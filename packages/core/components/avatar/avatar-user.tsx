import Avatar from '$/core/components/avatar/avatar';
import styles from '$/core/components/avatar/avatar.module.css';
import EllipsisText from '$/core/components/ellipsis-text';
import Typography, { TypographySize } from '$/core/components/typography';
import { cryptoUtils } from '$/core/utils/crypto';
import { imageUtils } from '$/core/utils/image';
import { stringUtils } from '$/core/utils/string';
import { Show, createResource, mergeProps, splitProps } from 'solid-js';

export type AvatarUserProps = {
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
  const [props, _rest] = splitProps(mergeProps({ showName: true }, passedProps), [
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
    <div data-id="avatar-user" class={styles.user}>
      <Avatar
        {...props}
        src={imageUrl()}
        label={stringUtils.toInitialism(props.name, { limit: 2 })}
        isClickable={props.isClickable}
        class="shrink-0"
      />
      <Show when={props.showName}>
        <div class="min-w-[1px]">
          <Show when={props.extraText}>
            <Typography size={TypographySize.SMALL} data-id="extra-text">
              {props.extraText}
            </Typography>
          </Show>
          <Typography data-id="name">
            <EllipsisText class="line-clamp-1" text={props.name} />
          </Typography>
        </div>
      </Show>
    </div>
  );
};

export default AvatarUser;

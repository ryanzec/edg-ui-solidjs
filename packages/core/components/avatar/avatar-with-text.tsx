import { mergeProps, Show, splitProps } from 'solid-js';
import Avatar from '$/core/components/avatar/avatar';
import { type AvatarProps, AvatarSize } from '$/core/components/avatar/utils';
import EllipsisText from '$/core/components/ellipsis-text';
import Typography, { TypographySize } from '$/core/components/typography';
import { stringUtils } from '$/core/utils/string';
import { tailwindUtils } from '$/core/utils/tailwind';

export type AvatarWithTextProps = Omit<AvatarProps, 'class'> & {
  label: string;
  subLabel?: string;
  isClickable?: boolean;
  showLabel?: boolean;
};

const AvatarWithText = (passedProps: AvatarWithTextProps) => {
  const [props, restOfProps] = splitProps(mergeProps({ showLabel: true, avatarSize: AvatarSize.BASE }, passedProps), [
    'label',
    'subLabel',
    'showLabel',
    'isClickable',
  ]);

  return (
    <div
      data-id="avatar-text"
      class={tailwindUtils.merge('flex items-center', {
        'gap-4xs': restOfProps.avatarSize === AvatarSize.SMALL,
        'gap-2xs': restOfProps.avatarSize === AvatarSize.BASE,
      })}
    >
      <Avatar
        label={stringUtils.toInitialism(props.label, { limit: 2 })}
        isClickable={props.isClickable}
        class="shrink-0"
        {...restOfProps}
      />
      <Show when={props.showLabel}>
        <div class="min-w-[1px]">
          <Show when={restOfProps.avatarSize !== AvatarSize.SMALL && props.subLabel}>
            <Typography size={TypographySize.SMALL} data-id="extra-text">
              {props.subLabel}
            </Typography>
          </Show>
          <Typography
            data-id="name"
            size={restOfProps.avatarSize === AvatarSize.SMALL ? TypographySize.SMALL : TypographySize.BASE}
          >
            <EllipsisText class="line-clamp-1" text={props.label} />
          </Typography>
        </div>
      </Show>
    </div>
  );
};

export default AvatarWithText;

import { tailwindUtils } from '$/core/utils/tailwind';
import { Show, mergeProps, splitProps, useContext } from 'solid-js';

import { type AvatarProps, AvatarSize, AvatarStackContext } from '$/core/components/avatar/utils';
import Typography, { TypographyColor, TypographySize } from '$/core/components/typography';

const Avatar = (passedProps: AvatarProps) => {
  const [props, restOfProps] = splitProps(mergeProps({ count: 0, avatarSize: AvatarSize.BASE }, passedProps), [
    'src',
    'label',
    'count',
    'isClickable',
    'class',
    'avatarSize',
  ]);
  const avatarStackContext = useContext(AvatarStackContext);

  const avatarSize = () => avatarStackContext?.avatarSize || props.avatarSize;

  const getLabel = () => {
    if (avatarSize() === AvatarSize.SMALL && props.count > 0) {
      return `${props.count > 9 ? '9+' : props.count}`;
    }

    if (props.count > 0) {
      return `${props.count > 99 ? '99+' : props.count}`;
    }

    return props.label;
  };

  return (
    <Typography
      data-id="avatar"
      color={TypographyColor.NONE}
      {...restOfProps}
      class={tailwindUtils.merge(
        'flex items-center justify-center rounded-full bg-brand text-on-brand font-medium',
        {
          'cursor-pointer': props.isClickable,
          'h-base w-base': avatarSize() === AvatarSize.SMALL,
          'h-3xl w-3xl': avatarSize() === AvatarSize.BASE,
        },
        props.class,
      )}
      size={avatarSize() === AvatarSize.SMALL ? TypographySize.EXTRA_SMALL : TypographySize.BASE}
    >
      <Show when={props.src}>
        <img class="h-full w-full rounded-full" alt="avatar visual" src={props.src} />
      </Show>
      <Show when={!props.src}>{getLabel()}</Show>
    </Typography>
  );
};

export default Avatar;

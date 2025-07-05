import { tailwindUtils } from '$/core/utils/tailwind';
import { type JSX, mergeProps, splitProps } from 'solid-js';

import { AvatarSize, AvatarStackContext, type AvatarStackContextData } from '$/core/components/avatar/utils';
import type { CommonDataAttributes } from '$/core/types/generic';

export type AvatarStackProps = JSX.HTMLAttributes<HTMLDivElement> & CommonDataAttributes & AvatarStackContextData;

const AvatarStack = (passedProps: AvatarStackProps) => {
  const [props, remainingProps] = splitProps(passedProps, ['children', 'class']);
  const [contextData, restOfProps] = splitProps(mergeProps({ avatarSize: AvatarSize.BASE }, remainingProps), [
    'avatarSize',
  ]);

  return (
    <AvatarStackContext.Provider value={contextData}>
      <div
        data-id="avatar-stack"
        {...restOfProps}
        class={tailwindUtils.merge(
          'flex flex-row-reverse justify-end [&>*]:border-1',
          {
            '[&>*:not(:last-child)]:-ml-2xs': contextData?.avatarSize === AvatarSize.SMALL,
            '[&>*:not(:last-child)]:-ml-base': contextData?.avatarSize === AvatarSize.BASE,
          },
          props.class,
        )}
      >
        {props.children}
      </div>
    </AvatarStackContext.Provider>
  );
};

export default AvatarStack;

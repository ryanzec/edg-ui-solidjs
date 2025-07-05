import { tailwindUtils } from '$/core/utils/tailwind';
import { type JSX, mergeProps, splitProps } from 'solid-js';

export type LinkProps = JSX.AnchorHTMLAttributes<HTMLAnchorElement> & {
  isUnstyled?: boolean;
};

const Link = (passedProps: LinkProps) => {
  const [props, restOfProps] = splitProps(mergeProps({ isUnstyled: false }, passedProps), ['isUnstyled', 'class']);

  return (
    <a
      class={tailwindUtils.merge(
        {
          'text-[#0000ee] visited:text-[#551a8b]': !props.isUnstyled,
        },
        props.class,
      )}
      {...restOfProps}
    />
  );
};

export default Link;

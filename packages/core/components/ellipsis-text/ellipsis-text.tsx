import { tailwindUtils } from '$/core/utils/tailwind';

export type EllipsisTextProps = {
  text: string;
  class?: string;
};

const EllipsisText = (props: EllipsisTextProps) => {
  const isSingleLine = () => props.class?.includes('line-clamp-1');

  return (
    // w-full makes sure the element does not overflow the parent container
    <span
      class={tailwindUtils.merge('text-ellipsis overflow-hidden w-full', props.class, {
        '!inline-block': isSingleLine(),
        'whitespace-nowrap': isSingleLine(),
      })}
    >
      {props.text}
    </span>
  );
};

export default EllipsisText;

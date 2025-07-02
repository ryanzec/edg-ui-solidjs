import { tailwindUtils } from '$/core/utils/tailwind';
import { type JSX, splitProps } from 'solid-js';

export type GridTableFooterProps = JSX.HTMLAttributes<HTMLDivElement>;

const GridTableFooter = (passedProps: GridTableFooterProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['class']);

  return (
    <div class={tailwindUtils.merge('px-lg py-base flex justify-end min-w-[1px]', props.class)} {...restOfProps} />
  );
};

export default GridTableFooter;

import { type JSX, splitProps } from 'solid-js';
import { tailwindUtils } from '$/core/utils/tailwind';

const GridTableContainer = (passedProps: JSX.HTMLAttributes<HTMLDivElement>) => {
  const [props, restOfProps] = splitProps(passedProps, ['class']);

  return <div {...restOfProps} class={tailwindUtils.merge('flex flex-col gap-sm min-h-[0]', props.class)} />;
};

export default GridTableContainer;

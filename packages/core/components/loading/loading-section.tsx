import { type JSX, mergeProps, splitProps } from 'solid-js';

import Callout, { type CalloutProps, CalloutColor } from '$/core/components/callout';
import { IconColor, IconSize } from '$/core/components/icon';
import Loading from '$/core/components/loading/loading';
import Overlay from '$/core/components/overlay';
import { tailwindUtils } from '$/core/utils/tailwind';

export type LoadingSectionProps = Omit<CalloutProps, 'color' | 'variant' | 'preItem'> & {
  coverPage?: boolean;
  extraContentElement?: JSX.Element;
};

const LoadingSection = (passedProps: LoadingSectionProps) => {
  const [props, restOfProps] = splitProps(mergeProps({ coverPage: false }, passedProps), [
    'children',
    'coverPage',
    'extraContentElement',
  ]);

  return (
    <div data-id="loading-section">
      <Overlay.Local
        class={tailwindUtils.merge({
          fixed: props.coverPage,
        })}
      />
      <Overlay.ContentLocal
        class={tailwindUtils.merge({
          fixed: props.coverPage,
        })}
      >
        <Callout {...restOfProps} color={CalloutColor.BRAND} extraContentElement={props.extraContentElement}>
          <div class="flex items-center gap-3xs">
            <Loading iconSize={IconSize.BASE} iconColor={IconColor.INHERIT} /> {props.children}
          </div>
        </Callout>
      </Overlay.ContentLocal>
    </div>
  );
};

export default LoadingSection;

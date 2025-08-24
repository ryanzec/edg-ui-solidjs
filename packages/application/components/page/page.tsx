import { type JSX, mergeProps, Show, splitProps } from 'solid-js';
import Button, { ButtonVariant } from '$/core/components/button';
import Icon from '$/core/components/icon/icon';
import type { CommonDataAttributes } from '$/core/types/generic';
import { tailwindUtils } from '$/core/utils/tailwind';

export const PageLayout = {
  DEFAULT: 'default',
  CENTERED: 'centered',
};

export type PageLayout = (typeof PageLayout)[keyof typeof PageLayout];

export type PageProps = JSX.HTMLAttributes<HTMLDivElement> &
  CommonDataAttributes & {
    layout?: PageLayout;
    forceFullHeight?: boolean;
    onClickBackLink?: () => void;
    backLinkLabel?: string;
  };

const Page = (passedProps: PageProps) => {
  const [props, restOfProps] = splitProps(
    mergeProps({ layout: PageLayout.DEFAULT, backLinkLabel: 'Back' }, passedProps),
    ['class', 'layout', 'forceFullHeight', 'onClickBackLink', 'backLinkLabel'],
  );

  return (
    <div
      data-id="page"
      class={tailwindUtils.merge('flex flex-col gap-sm min-w-[1024px] max-w-[1920px]', {
        'justify-center items-center': props.layout === PageLayout.CENTERED,
        'min-h-[0]': props.forceFullHeight,
      })}
    >
      <Show when={props.onClickBackLink}>
        <Button
          class="self-start"
          onClick={props.onClickBackLink}
          variant={ButtonVariant.GHOST}
          preElement={<Icon icon="arrow-left" />}
        >
          {props.backLinkLabel}
        </Button>
      </Show>
      <div
        class={tailwindUtils.merge('flex flex-col h-full gap-sm min-h-[1px] flex-1', props.class, {
          'justify-center items-center': props.layout === PageLayout.CENTERED,
        })}
        {...restOfProps}
      />
    </div>
  );
};

export default Page;

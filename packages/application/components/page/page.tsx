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
    onClickBackLink?: () => void;
    backLinkLabel?: string;
  };

const Page = (passedProps: PageProps) => {
  const [props, restOfProps] = splitProps(
    mergeProps({ layout: PageLayout.DEFAULT, backLinkLabel: 'Back' }, passedProps),
    ['class', 'layout', 'onClickBackLink', 'backLinkLabel'],
  );

  return (
    <div
      data-id="page"
      class={tailwindUtils.merge('flex h-full flex-col gap-sm flex-1', {
        'justify-center items-center': props.layout === PageLayout.CENTERED,
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
        class={tailwindUtils.merge('flex flex-col h-full gap-sm min-h-[1px]', props.class, {
          'justify-center items-center': props.layout === PageLayout.CENTERED,
        })}
        {...restOfProps}
      />
    </div>
  );
};

export default Page;

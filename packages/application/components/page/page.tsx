import styles from '$/application/components/page/page.module.css';
import Button, { ButtonVariant } from '$/core/components/button';
import Icon from '$/core/components/icon/icon';
import type { CommonDataAttributes } from '$/core/types/generic';
import classnames from 'classnames';
import { type JSX, Show, mergeProps, splitProps } from 'solid-js';

export const PageLayout = {
  DEFAULT: 'default',
  CENTERED: 'centered',
};

export type PageLayout = (typeof PageLayout)[keyof typeof PageLayout];

export type PageProps = JSX.HTMLAttributes<HTMLDivElement> &
  CommonDataAttributes & {
    layout?: PageLayout;
    isFullWidth?: boolean;
    onClickBackLink?: () => void;
    backLinkLabel?: string;
  };

const Page = (passedProps: PageProps) => {
  const [props, restOfProps] = splitProps(
    mergeProps({ layout: PageLayout.DEFAULT, isFullWidth: false, backLinkLabel: 'Back' }, passedProps),
    ['class', 'layout', 'isFullWidth', 'onClickBackLink', 'backLinkLabel'],
  );

  return (
    <div
      data-id="page"
      class={classnames(styles.outerContainer, {
        [styles.restrictWidth]: props.isFullWidth === false,
        [styles.centered]: props.layout === PageLayout.CENTERED,
      })}
    >
      <Show when={props.onClickBackLink}>
        <Button
          class={styles.backLink}
          onClick={props.onClickBackLink}
          variant={ButtonVariant.GHOST}
          preItem={<Icon icon="arrow-left" />}
        >
          {props.backLinkLabel}
        </Button>
      </Show>
      <div
        class={classnames(styles.container, props.class, {
          [styles.centered]: props.layout === PageLayout.CENTERED,
        })}
        {...restOfProps}
      />
    </div>
  );
};

export default Page;

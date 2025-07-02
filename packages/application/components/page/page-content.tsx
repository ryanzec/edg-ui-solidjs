import styles from '$/application/components/page/page.module.css';
import type { CommonDataAttributes } from '$/core/types/generic';
import classnames from 'classnames';
import { type JSX, mergeProps, splitProps } from 'solid-js';

export type PageContentProps = JSX.HTMLAttributes<HTMLDivElement> & CommonDataAttributes;

const PageContent = (passedProps: PageContentProps) => {
  const [props, restOfProps] = splitProps(mergeProps({}, passedProps), ['class']);

  return <div data-id="content" class={classnames(styles.content, props.class)} {...restOfProps} />;
};

export default PageContent;

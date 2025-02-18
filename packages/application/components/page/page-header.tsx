import styles from '$/application/components/page/page.module.css';
import type { CommonDataAttributes } from '$/core/types/generic';
import classnames from 'classnames';
import { type JSX, mergeProps, splitProps } from 'solid-js';

export type PageHeaderProps = JSX.HTMLAttributes<HTMLDivElement> & CommonDataAttributes;

const PageHeader = (passedProps: PageHeaderProps) => {
  const [props, resetOfProps] = splitProps(mergeProps({}, passedProps), ['class']);

  return <div data-id="header" class={classnames(styles.header, props.class)} {...resetOfProps} />;
};

export default PageHeader;

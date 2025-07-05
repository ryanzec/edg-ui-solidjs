import styles from '$/core/components/badge/badge.module.css';
import { tailwindUtils } from '$/core/utils/tailwind';
import type { JSX } from 'solid-js';

export type BadgeGroupProps = {
  children: JSX.Element;
  class?: string;
};

const BadgeGroup = (props: BadgeGroupProps) => {
  return <div class={tailwindUtils.merge(styles.group, props.class)}>{props.children}</div>;
};

export default BadgeGroup;

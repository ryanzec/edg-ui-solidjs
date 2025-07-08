import type { ParentProps } from 'solid-js';

export type NoWrapperProps = ParentProps;

// this is mainly used for passing to Dynamic when you do want an extra element
const NoWrapper = (props: NoWrapperProps) => props.children;

export default NoWrapper;

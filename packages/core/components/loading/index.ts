import { default as BaseLoading, type LoadingProps } from '$/core/components/loading/loading';
import Section, { type LoadingSectionProps } from '$/core/components/loading/loading-section';

export type { LoadingProps, LoadingSectionProps };

export const Loading = Object.assign(BaseLoading, { Section });

export default Loading;

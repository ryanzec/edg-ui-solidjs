import { default as BasePeek, type PeekProps } from '$/core/components/peek/peek';
import CloseButton from '$/core/components/peek/peek-close-button';
import Content, { type PeekContentProps } from '$/core/components/peek/peek-content';
import Footer, { type PeekFooterProps } from '$/core/components/peek/peek-footer';
import Header, { type PeekHeaderProps } from '$/core/components/peek/peek-header';

export type { PeekComponentRef } from '$/core/components/peek/utils';

export type { PeekProps, PeekHeaderProps, PeekContentProps, PeekFooterProps };

export const Peek = Object.assign(BasePeek, { Content, Footer, CloseButton, Header });

export default Peek;

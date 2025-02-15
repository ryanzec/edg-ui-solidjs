import Peek, { type PeekProps } from '$/core/components/peek/peek';
import CloseButton from '$/core/components/peek/peek-close-button';
import Content, { type PeekContentProps } from '$/core/components/peek/peek-content';
import Footer, { type PeekFooterProps } from '$/core/components/peek/peek-footer';
import Header, { type PeekHeaderProps } from '$/core/components/peek/peek-header';

export { peekComponentUtils, type PeekStore } from '$/core/components/peek/utils';
export type { PeekProps, PeekHeaderProps, PeekContentProps, PeekFooterProps };

export default Object.assign(Peek, { Header, Content, Footer, CloseButton });

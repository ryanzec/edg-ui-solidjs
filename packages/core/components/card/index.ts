import { default as BaseCard, type CardProps } from '$/core/components/card/card';
import Content, { type CardContentProps } from '$/core/components/card/card-content';
import Footer, { type CardFooterProps } from '$/core/components/card/card-footer';
import Header, { type CardHeaderProps } from '$/core/components/card/card-header';
import NestedContainer, { type CardNestedContainerProps } from '$/core/components/card/card-nested-container';
import Image, { type ImageCardProps } from '$/core/components/card/image-card';

export { CardFooterAlignment } from '$/core/components/card/utils';
export type { CardProps, CardContentProps, CardFooterProps, CardHeaderProps, CardNestedContainerProps, ImageCardProps };

export const Card = Object.assign(BaseCard, { Content, Footer, Header, NestedContainer, Image });

export default Card;

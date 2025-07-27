import { type JSX, Show, splitProps } from 'solid-js';
import Card, { type CardProps } from '$/core/components/card/card';
import styles from '$/core/components/card/card.module.css';
import { tailwindUtils } from '$/core/utils/tailwind';

export type ImageCardProps = CardProps & {
  imageSrc?: string;
  imageAlt?: string;
  children: JSX.Element;
};

const ImageCard = (passedProps: ImageCardProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['imageSrc', 'imageAlt', 'class', 'children']);

  return (
    <Card data-id="image-card" {...restOfProps} class={tailwindUtils.merge(styles.imageCard, props.class)}>
      <Show when={props.imageSrc}>
        <div class={styles.imageContainer}>
          <img src={props.imageSrc} alt={props.imageAlt} class={styles.image} />
        </div>
      </Show>
      <div class={styles.imageContent}>{props.children}</div>
    </Card>
  );
};

export default ImageCard;

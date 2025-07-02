import Icon from '$/core/components/icon';
import { IconVariant } from '$/core/components/icon';
import styles from '$/core/components/thumbs-rating/thumbs-rating.module.css';
import classnames from 'classnames';
import { mergeProps } from 'solid-js';

export type ThumbsRatingProps = {
  onRate: (rating: number) => void;
  currentRating?: number;
};

const ThumbsRating = (passedProps: ThumbsRatingProps) => {
  const props = mergeProps({ currentRating: 0 }, passedProps);

  const handleRateUp = () => {
    props.onRate(1);
  };

  const handleRateDown = () => {
    props.onRate(-1);
  };

  return (
    <div class={styles.thumbsRating}>
      <Icon
        class={classnames({
          [styles.disabled]: props.currentRating === -1,
        })}
        icon="thumbs-up"
        variant={props.currentRating === 1 ? IconVariant.FILL : IconVariant.REGULAR}
        onClick={props.currentRating === 0 ? handleRateUp : undefined}
      />
      <Icon
        class={classnames(styles.thumbsDown, {
          [styles.disabled]: props.currentRating === 1,
        })}
        icon="thumbs-down"
        variant={props.currentRating === -1 ? IconVariant.FILL : IconVariant.REGULAR}
        onClick={props.currentRating === 0 ? handleRateDown : undefined}
      />
    </div>
  );
};

export default ThumbsRating;

import { mergeProps } from 'solid-js';
import Icon, { IconSize, IconVariant } from '$/core/components/icon';
import styles from '$/core/components/thumbs-rating/thumbs-rating.module.css';
import { tailwindUtils } from '$/core/utils/tailwind';
import Loading from '../loading';

export type ThumbsRatingProps = {
  onRate: (rating: number) => void;
  currentRating?: number;
  canChange?: boolean;
  isProcessing?: boolean;
};

const ThumbsRating = (passedProps: ThumbsRatingProps) => {
  const props = mergeProps({ currentRating: 0, canChange: false, isProcessing: false }, passedProps);

  const canChangeTo = (changeToRating: number) => {
    return (
      props.isProcessing === false ||
      props.currentRating === 0 ||
      (props.currentRating !== changeToRating && props.canChange)
    );
  };

  const handleRateUp = () => {
    props.onRate(1);
  };

  const handleRateDown = () => {
    props.onRate(-1);
  };

  return (
    // this extra div make sure the processing indicator is on top of the thumbs rating by making sure the width of
    // the thumbs rating only what is needed based on the content
    <div class="inline-flex">
      <div class={styles.thumbsRating}>
        <Icon
          class={tailwindUtils.merge({
            [styles.disabled]: props.isProcessing || (props.currentRating === -1 && props.canChange === false),
          })}
          icon="thumbs-up"
          variant={props.currentRating === 1 ? IconVariant.FILL : IconVariant.REGULAR}
          onClick={canChangeTo(1) ? handleRateUp : undefined}
        />
        <Icon
          class={tailwindUtils.merge(styles.thumbsDown, {
            [styles.disabled]: props.isProcessing || (props.currentRating === 1 && props.canChange === false),
          })}
          icon="thumbs-down"
          variant={props.currentRating === -1 ? IconVariant.FILL : IconVariant.REGULAR}
          onClick={canChangeTo(-1) ? handleRateDown : undefined}
        />
        <Loading class={styles.processingIndicator} iconSize={IconSize.LARGE} />
      </div>
    </div>
  );
};

export default ThumbsRating;

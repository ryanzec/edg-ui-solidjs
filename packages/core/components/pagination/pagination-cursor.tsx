import classnames from 'classnames';
import { splitProps } from 'solid-js';

import Button, { ButtonVariant } from '$/core/components/button';
import Icon from '$/core/components/icon';
import styles from '$/core/components/pagination/pagination.module.css';
import type { PaginationCursorStore } from '$/core/stores/pagination.store';
import type { CommonDataAttributes } from '$/core/types/generic';

type PageChangeReturn = {
  newPreviousCursor: string | undefined;
  newNextCursor: string | undefined;
};

type PageChangeDirection = 'previous' | 'next';

export type PaginationCursorProps = CommonDataAttributes & {
  store: PaginationCursorStore;
  onPageChange?: (
    cursorToLoad: string | undefined,
    direction: PageChangeDirection,
  ) => Promise<PageChangeReturn | false>;
  class?: string;
};

const PaginationCursor = (passedProps: PaginationCursorProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['onPageChange', 'class', 'store']);

  const handlePageChange = async (cursorToLoad: string | undefined, direction: PageChangeDirection) => {
    if (!cursorToLoad) {
      return;
    }

    const cursorResult = (await props.onPageChange?.(cursorToLoad, direction)) ?? false;

    if (cursorResult === false) {
      return;
    }

    props.store.setPreviousCursor(cursorResult.newPreviousCursor);
    props.store.setNextCursor(cursorResult.newNextCursor);
  };

  return (
    <div class={classnames(styles.pagination, props.class)} data-id="pagination-cursor" {...restOfProps}>
      <div class={styles.paginationContent}>
        <div class={styles.paginationActions}>
          <Button
            variant={ButtonVariant.GHOST}
            onClick={() => handlePageChange(props.store.previousCursor(), 'previous')}
            disabled={!props.store.previousCursor() || props.store.isLoading()}
            preItem={<Icon icon="arrow-left" />}
          >
            Previous
          </Button>
          <Button
            variant={ButtonVariant.GHOST}
            onClick={() => handlePageChange(props.store.nextCursor(), 'next')}
            disabled={!props.store.nextCursor() || props.store.isLoading()}
            postItem={<Icon icon="arrow-right" />}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaginationCursor;

import { tailwindUtils } from '$/core/utils/tailwind';
import { splitProps } from 'solid-js';

import Button, { ButtonVariant } from '$/core/components/button';
import Icon from '$/core/components/icon';
import styles from '$/core/components/pagination/pagination.module.css';
import type { CursorPaginationStore } from '$/core/stores/pagination.store';
import type { CommonDataAttributes } from '$/core/types/generic';

type PageChangeReturn = {
  newPreviousCursor: string | undefined;
  newNextCursor: string | undefined;
};

type PageChangeDirection = 'previous' | 'next';

export type PaginationCursorProps = CommonDataAttributes & {
  cursorPaginationStore: CursorPaginationStore;
  onPageChange?: (
    cursorToLoad: string | undefined,
    direction: PageChangeDirection,
  ) => Promise<PageChangeReturn | false>;
  class?: string;
};

const PaginationCursor = (passedProps: PaginationCursorProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['onPageChange', 'class', 'cursorPaginationStore']);

  const handlePageChange = async (cursorToLoad: string | undefined, direction: PageChangeDirection) => {
    if (!cursorToLoad) {
      return;
    }

    const cursorResult = (await props.onPageChange?.(cursorToLoad, direction)) ?? false;

    if (cursorResult === false) {
      return;
    }

    props.cursorPaginationStore.setPreviousCursor(cursorResult.newPreviousCursor);
    props.cursorPaginationStore.setNextCursor(cursorResult.newNextCursor);
  };

  return (
    <div class={tailwindUtils.merge(styles.pagination, props.class)} data-id="pagination-cursor" {...restOfProps}>
      <div class={styles.paginationContent}>
        <div class={styles.paginationActions}>
          <Button
            variant={ButtonVariant.GHOST}
            onClick={() => handlePageChange(props.cursorPaginationStore.previousCursor(), 'previous')}
            disabled={!props.cursorPaginationStore.previousCursor() || props.cursorPaginationStore.isLoading()}
            preElement={<Icon icon="arrow-left" />}
          >
            Previous
          </Button>
          <Button
            variant={ButtonVariant.GHOST}
            onClick={() => handlePageChange(props.cursorPaginationStore.nextCursor(), 'next')}
            disabled={!props.cursorPaginationStore.nextCursor() || props.cursorPaginationStore.isLoading()}
            postElement={<Icon icon="arrow-right" />}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaginationCursor;

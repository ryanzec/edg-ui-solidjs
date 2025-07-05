import { tailwindUtils } from '$/core/utils/tailwind';
import { For, Show, splitProps } from 'solid-js';

import Button, { ButtonVariant } from '$/core/components/button';
import Icon from '$/core/components/icon';
import styles from '$/core/components/pagination/pagination.module.css';
import type { PaginationStore } from '$/core/stores/pagination.store';
import type { CommonDataAttributes } from '$/core/types/generic';

export type PaginationProps = CommonDataAttributes & {
  store: PaginationStore;
  onPageChange?: (previousPage: number, newPage: number, itemsPerPage: number) => Promise<boolean>;
  class?: string;
  showNumbers?: boolean;
};

const Pagination = (passedProps: PaginationProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['onPageChange', 'class', 'store', 'showNumbers']);

  const handlePageChange = async (newPage: number) => {
    if (newPage === props.store.currentPage() || newPage < 1 || newPage > props.store.totalPages()) {
      return;
    }

    const previousPage = props.store.currentPage();
    const success = (await props.onPageChange?.(previousPage, newPage, props.store.itemsPerPage())) ?? false;

    if (success === false) {
      return;
    }

    props.store.setCurrentPage(newPage);
  };

  return (
    <div class={tailwindUtils.merge(styles.pagination, props.class)} data-id="pagination" {...restOfProps}>
      <div class={styles.paginationContent}>
        <Show when={props.showNumbers}>
          <div class={styles.paginationNumbers}>
            <For each={props.store.visiblePageNumbers()}>
              {(page) => (
                <Show when={typeof page === 'number'} fallback={<span class={styles.paginationEllipsis}>{page}</span>}>
                  <Button
                    variant={ButtonVariant.GHOST}
                    class={tailwindUtils.merge(styles.paginationNumber, {
                      [styles.paginationNumberActive]: page === props.store.currentPage(),
                    })}
                    onClick={() => handlePageChange(page as number)}
                    disabled={props.store.isLoading()}
                  >
                    {page}
                  </Button>
                </Show>
              )}
            </For>
          </div>
        </Show>
        <div class={styles.paginationActions}>
          <Button
            variant={ButtonVariant.GHOST}
            onClick={() => handlePageChange(props.store.currentPage() - 1)}
            disabled={props.store.currentPage() === 1 || props.store.totalPages() <= 1 || props.store.isLoading()}
            preElement={<Icon icon="arrow-left" />}
          >
            Previous
          </Button>
          <Button
            variant={ButtonVariant.GHOST}
            onClick={() => handlePageChange(props.store.currentPage() + 1)}
            disabled={
              props.store.currentPage() === props.store.totalPages() ||
              props.store.totalPages() <= 1 ||
              props.store.isLoading()
            }
            postElement={<Icon icon="arrow-right" />}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;

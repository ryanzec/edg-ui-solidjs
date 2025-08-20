import { createEffect, createMemo, For, Show, splitProps } from 'solid-js';
import Button, { ButtonVariant } from '$/core/components/button';
import Combobox, {
  type ComboboxExtraData,
  type ComboboxOption,
  comboboxComponentUtils,
} from '$/core/components/combobox';
import FormField from '$/core/components/form-field';
import Icon from '$/core/components/icon';
import styles from '$/core/components/pagination/pagination.module.css';
import type { PaginationStore } from '$/core/stores/pagination.store';
import type { CommonDataAttributes } from '$/core/types/generic';
import { loggerUtils } from '$/core/utils/logger';
import { tailwindUtils } from '$/core/utils/tailwind';

export type PaginationProps = CommonDataAttributes & {
  paginationStore: PaginationStore;
  onPageChange?: (previousPage: number, newPage: number, itemsPerPage: number) => Promise<boolean>;
  pageSizeOptions?: number[];
  defaultPageSize?: number;
  onPageSizeChange?: (itemsPerPage: number) => void;
  class?: string;
  showNumbers?: boolean;
};

const Pagination = (passedProps: PaginationProps) => {
  const [props, restOfProps] = splitProps(passedProps, [
    'onPageChange',
    'class',
    'paginationStore',
    'showNumbers',
    'pageSizeOptions',
    'defaultPageSize',
    'onPageSizeChange',
  ]);

  const pageSizeComboboxOptions = createMemo(() => {
    return props.pageSizeOptions
      ? props.pageSizeOptions.map((pageSize) => ({
          label: pageSize.toString(),
          value: pageSize.toString(),
        }))
      : [];
  });

  const defaultPageSizeIndex = props.pageSizeOptions?.findIndex((pageSize) => pageSize === props.defaultPageSize);
  const comboboxValueStore = comboboxComponentUtils.createValueStore<ComboboxExtraData>({
    defaultValue:
      pageSizeComboboxOptions().length > 0
        ? [pageSizeComboboxOptions()[defaultPageSizeIndex && defaultPageSizeIndex >= 0 ? defaultPageSizeIndex : 0]]
        : [],
  });

  const handlePageChange = async (newPage: number) => {
    if (
      newPage === props.paginationStore.currentPage() ||
      newPage < 1 ||
      newPage > props.paginationStore.totalPages()
    ) {
      return;
    }

    const previousPage = props.paginationStore.currentPage();
    const success = (await props.onPageChange?.(previousPage, newPage, props.paginationStore.itemsPerPage())) ?? false;

    if (success === false) {
      return;
    }

    props.paginationStore.setCurrentPage(newPage);
  };

  const handlePageSizeChange = (options: ComboboxOption[]) => {
    const selectedOption = options[0];

    if (!selectedOption) {
      loggerUtils.error({
        type: 'pagination-no-page-size-selected',
      });

      comboboxValueStore.setSelected([]);

      return;
    }

    comboboxValueStore.setSelected(options);
    props.onPageSizeChange?.(Number(selectedOption.value));
  };

  return (
    <div class={tailwindUtils.merge(styles.pagination, props.class)} data-id="pagination" {...restOfProps}>
      <div class={styles.paginationContent}>
        <Show when={props.showNumbers}>
          <div class={styles.paginationNumbers}>
            <For each={props.paginationStore.visiblePageNumbers()}>
              {(page) => (
                <Show when={typeof page === 'number'} fallback={<span class={styles.paginationEllipsis}>{page}</span>}>
                  <Button
                    variant={ButtonVariant.GHOST}
                    class={tailwindUtils.merge(styles.paginationNumber, {
                      [styles.paginationNumberActive]: page === props.paginationStore.currentPage(),
                    })}
                    onClick={() => handlePageChange(page as number)}
                    disabled={props.paginationStore.isLoading()}
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
            onClick={() => handlePageChange(props.paginationStore.currentPage() - 1)}
            disabled={
              props.paginationStore.currentPage() === 1 ||
              props.paginationStore.totalPages() <= 1 ||
              props.paginationStore.isLoading()
            }
            preElement={<Icon icon="arrow-left" />}
          >
            Previous
          </Button>
          <Button
            variant={ButtonVariant.GHOST}
            onClick={() => handlePageChange(props.paginationStore.currentPage() + 1)}
            disabled={
              props.paginationStore.currentPage() === props.paginationStore.totalPages() ||
              props.paginationStore.totalPages() <= 1 ||
              props.paginationStore.isLoading()
            }
            postElement={<Icon icon="arrow-right" />}
          >
            Next
          </Button>
        </div>
        <Show when={props.pageSizeOptions?.length && props.pageSizeOptions.length > 1}>
          <div class={styles.paginationPageSize}>
            <FormField>
              <Combobox
                class="w-[70px]"
                forceSelection
                autoShowOptions
                options={pageSizeComboboxOptions()}
                setSelected={handlePageSizeChange}
                selected={comboboxValueStore.selected()}
                name="pageSize"
                selectableComponent={Combobox.SelectableOption}
                showClearIcon={false}
              />
            </FormField>
          </div>
        </Show>
      </div>
    </div>
  );
};

export default Pagination;

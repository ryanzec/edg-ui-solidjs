import { createSignal } from 'solid-js';
import Pagination, { paginationComponentUtils } from '$/core/components/pagination';
import { paginationStoreUtils } from '$/core/stores/pagination.store';
import SandboxExamplesContainer from '$sandbox/components/sandbox-examples-container/sandbox-examples-container';

export default {
  title: 'Components/Pagination',
};

export const Default = () => {
  const [queryString, setQueryString] = createSignal({
    offset: 0,
    itemsPerPage: 10,
  });

  const paginationStore = paginationStoreUtils.createStore({
    totalItems: 100,
  });

  const handlePageSizeChange = (itemsPerPage: number) => {
    setQueryString({
      ...queryString(),
      itemsPerPage,
    });
  };

  const handlePageChange = paginationComponentUtils.buildHandlePageChange({
    paginationStore,
    refetch: async () => {
      return {
        itemsPerPage: 10,
        totalItems: 100,
      };
    },
    queryString,
    setQueryString,
  });

  return (
    <>
      <SandboxExamplesContainer isFull={false}>
        <Pagination
          paginationStore={paginationStore}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      </SandboxExamplesContainer>
      <pre>query string: {JSON.stringify(queryString(), null, 2)}</pre>
    </>
  );
};

export const PageSizeOptions = () => {
  const [queryString, setQueryString] = createSignal({
    offset: 0,
    itemsPerPage: 10,
  });

  const paginationStore = paginationStoreUtils.createStore({
    totalItems: 100,
  });

  const handlePageSizeChange = (itemsPerPage: number) => {
    setQueryString({
      ...queryString(),
      offset: 0,
      itemsPerPage,
    });
    paginationStore.setItemsPerPage(itemsPerPage);
    paginationStore.setCurrentPage(1);
  };

  const handlePageChange = paginationComponentUtils.buildHandlePageChange({
    paginationStore,
    refetch: async () => {
      return {
        itemsPerPage: queryString().itemsPerPage,
        totalItems: 100,
      };
    },
    queryString,
    setQueryString,
  });

  return (
    <>
      <SandboxExamplesContainer isFull={false}>
        <Pagination
          paginationStore={paginationStore}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          pageSizeOptions={[10, 20, 50, 100]}
          showNumbers
        />
      </SandboxExamplesContainer>
      <pre>query string: {JSON.stringify(queryString(), null, 2)}</pre>
    </>
  );
};

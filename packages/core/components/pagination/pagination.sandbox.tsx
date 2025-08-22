import { createSignal } from 'solid-js';
import Pagination from '$/core/components/pagination';
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
    managedData: queryString,
    setManagedData: setQueryString,
    getAsyncUpdate: () => ({
      isFetching: false,
      isError: false,
      totalItems: 100,
      itemsPerPage: 10,
      currentPage: 1,
    }),
  });

  return (
    <>
      <SandboxExamplesContainer isFull={false}>
        <Pagination paginationStore={paginationStore} />
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
    managedData: queryString,
    setManagedData: setQueryString,
    getAsyncUpdate: () => ({
      isFetching: false,
      isError: false,
      totalItems: 100,
      itemsPerPage: 10,
      currentPage: 1,
    }),
  });

  return (
    <>
      <SandboxExamplesContainer isFull={false}>
        <Pagination paginationStore={paginationStore} pageSizeOptions={[10, 20, 50, 100]} showNumbers />
      </SandboxExamplesContainer>
      <pre>query string: {JSON.stringify(queryString(), null, 2)}</pre>
    </>
  );
};

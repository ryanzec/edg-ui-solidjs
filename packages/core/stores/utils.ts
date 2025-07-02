import { type Accessor, createEffect } from 'solid-js';
import { createStore, reconcile } from 'solid-js/store';

// biome-ignore lint/suspicious/noExplicitAny: since this is a generic function, we need to use any
const createFineGrainedObjectStore = <T extends Record<string, any>>(objectAccessor: Accessor<T | undefined>) => {
  const [store, setStore] = createStore<T>({} as T);

  createEffect(function updateStore() {
    const data = objectAccessor();

    if (data) {
      setStore(reconcile(data));
    }
  });

  return store;
};

export const storeUtils = {
  createFineGrainedObjectStore,
};

import { type Accessor, createSignal } from 'solid-js';

export type ComponentApiStore<TComponentApi> = {
  api: Accessor<TComponentApi | undefined>;
  onReady: (componentApi: TComponentApi) => void;
  onCleanup: () => void;
};

export type CreateComponentApiStoreOptions<TComponentApi> = {
  onReady?: (componentApi: TComponentApi) => void;
  onCleanup?: () => void;
};

const createComponentApiStore = <TComponentApi>(
  options: CreateComponentApiStoreOptions<TComponentApi> = {},
): ComponentApiStore<TComponentApi> => {
  const [componentApi, setComponentApi] = createSignal<TComponentApi>();

  const onReady = (componentApi: TComponentApi) => {
    options.onReady?.(componentApi);
    setComponentApi(() => componentApi);
  };

  const onCleanup = () => {
    options.onCleanup?.();
    setComponentApi(undefined);
  };

  return {
    api: componentApi,
    onReady,
    onCleanup,
  };
};

export const componentApiStoreUtils = {
  createStore: createComponentApiStore,
};

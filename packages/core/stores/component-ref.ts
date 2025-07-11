import { type Accessor, createSignal } from 'solid-js';

export type ComponentRef<TComponentRef> = {
  api: Accessor<TComponentRef | undefined>;
  onReady: (componentApi: TComponentRef) => void;
  onCleanup: () => void;
};

export type CreateComponentRefOptions<TComponentRef> = {
  onReady?: (componentApi: TComponentRef) => void;
  onCleanup?: () => void;
};

export const createComponentRef = <TComponentRef>(
  options: CreateComponentRefOptions<TComponentRef> = {},
): ComponentRef<TComponentRef> => {
  const [componentRef, setComponentRef] = createSignal<TComponentRef>();

  const onReady = (componentApi: TComponentRef) => {
    options.onReady?.(componentApi);
    setComponentRef(() => componentApi);
  };

  const onCleanup = () => {
    options.onCleanup?.();
    setComponentRef(undefined);
  };

  return {
    api: componentRef,
    onReady,
    onCleanup,
  };
};

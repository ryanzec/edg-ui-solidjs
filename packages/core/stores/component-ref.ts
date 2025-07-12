import { type Accessor, createSignal } from 'solid-js';

export type ComponentRef<TComponentRef> = {
  api: Accessor<TComponentRef | undefined>;
  onReady: (componentRef: TComponentRef) => void;
  onCleanup: () => void;
};

export type CreateComponentRefOptions<TComponentRef> = {
  onReady?: (componentRef: TComponentRef) => void;
  onCleanup?: () => void;
};

const createComponentRef = <TComponentRef>(
  options: CreateComponentRefOptions<TComponentRef> = {},
): ComponentRef<TComponentRef> => {
  const [componentRef, setComponentRef] = createSignal<TComponentRef>();

  const onReady = (componentRef: TComponentRef) => {
    options.onReady?.(componentRef);
    setComponentRef(() => componentRef);
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

// this does not follow the naming convention as this is a specific type of store
export const componentRefUtils = {
  createRef: createComponentRef,
};
